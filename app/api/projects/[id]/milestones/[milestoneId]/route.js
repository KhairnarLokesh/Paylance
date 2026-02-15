import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import Notification from '@/models/Notification';
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id, milestoneId } = await params;
        const { action, submission } = await req.json(); // 'submit' or 'approve'
        const project = await Project.findById(id);
        if (!project)
            return Response.json({ error: 'Project not found' }, { status: 404 });
        const milestone = project.milestones.id(milestoneId);
        if (!milestone)
            return Response.json({ error: 'Milestone not found' }, { status: 404 });
        if (action === 'submit') {
            milestone.status = 'submitted';
            milestone.submission = submission;
            // Notify client
            await Notification.create({
                userId: project.clientId,
                type: 'milestone',
                title: 'Milestone Submitted',
                message: `A milestone has been submitted for review on "${project.title}"`,
            });
        }
        else if (action === 'approve') {
            milestone.status = 'approved';
            // Release payment
            const amount = milestone.amount;
            project.escrowAmount -= amount;
            // Update freelancer wallet
            const freelancer = await User.findById(project.assignedTo);
            freelancer.walletBalance += amount;
            await freelancer.save();
            // Create transactions
            await Transaction.create({
                userId: project.clientId,
                type: 'milestone_release',
                amount,
                projectId: project._id,
                description: `Payment released for ${milestone.title}`,
            });
            await Transaction.create({
                userId: project.assignedTo,
                type: 'earning',
                amount,
                projectId: project._id,
                description: `Received payment for ${milestone.title}`,
            });
            // Notify freelancer
            await Notification.create({
                userId: project.assignedTo,
                type: 'payment',
                title: 'Payment Received',
                message: `You received $${amount} for "${milestone.title}"`,
            });
            // Check if project complete
            const allApproved = project.milestones.every(m => m.status === 'approved');
            if (allApproved)
                project.status = 'completed';
        }
        await project.save();
        return Response.json(project);
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
