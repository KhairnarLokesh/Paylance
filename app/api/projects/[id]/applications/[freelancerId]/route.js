import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Notification from '@/models/Notification';

export async function PATCH(req, { params }) {
    try {
        await dbConnect();

        // Next.js 15+ needs await params
        const { id, freelancerId } = await params;
        const { decision } = await req.json(); // 'approved' or 'rejected'

        console.log(`Reviewing App - Project: ${id}, Freelancer: ${freelancerId}, Decision: ${decision}`);

        const project = await Project.findById(id);
        if (!project) {
            console.error('Project not found');
            return Response.json({ error: 'Project not found' }, { status: 404 });
        }

        // Find the specific application subdocument
        // Use toString() to ensure safe comparison between ObjectId and parameters
        const application = project.applications.find(
            app => app.freelancerId.toString() === freelancerId
        );

        if (!application) {
            console.error('Application not found for freelancer:', freelancerId);
            return Response.json({ error: 'Application not found' }, { status: 404 });
        }

        // Update the status of the specific application
        application.status = decision;

        if (decision === 'approved') {
            project.assignedTo = freelancerId;
            project.status = 'in_progress';

            // Reject other pending applications
            project.applications.forEach(app => {
                if (app.freelancerId.toString() !== freelancerId && app.status === 'pending') {
                    app.status = 'rejected';
                }
            });
        }

        // If un-approving (approving -> rejected), handle cleanup? 
        // Typically decision is final, but handling the 'rejected' case where we might need to unassign
        else if (decision === 'rejected') {
            if (project.assignedTo && project.assignedTo.toString() === freelancerId) {
                project.assignedTo = null;
                project.status = 'open';
            }
        }

        await project.save();

        // Notify freelancer
        try {
            await Notification.create({
                userId: freelancerId,
                type: 'application',
                title: `Application ${decision === 'approved' ? 'Approved' : 'Rejected'}`,
                message: `Your application for "${project.title}" has been ${decision}`,
            });
        } catch (notifError) {
            console.error('Notification error:', notifError);
            // Continue even if notification fails
        }

        return Response.json(project);
    } catch (error) {
        console.error('API Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
