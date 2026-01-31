import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import User from '@/models/User';
import Notification from '@/models/Notification';
import { sendNewProjectNotification } from '@/lib/emailService';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const clientId = searchParams.get('clientId');
        const assignedTo = searchParams.get('assignedTo');
        const status = searchParams.get('status');

        let query = {};
        if (clientId) query.clientId = clientId;
        if (assignedTo) query.assignedTo = assignedTo;
        if (status) query.status = status;

        const projects = await Project.find(query).sort({ createdAt: -1 });
        return Response.json(projects);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const projectData = await req.json();

        const project = await Project.create({
            ...projectData,
            status: 'open',
            escrowAmount: 0,
        });

        // Get all freelancers (for email notification)
        const allFreelancers = await User.find({ role: 'freelancer' });

        // Notify matching freelancers (in-app notification)
        const matchingFreelancers = await User.find({
            role: 'freelancer',
            skills: { $in: projectData.skills }
        });

        const notifications = matchingFreelancers.map(f => ({
            userId: f._id,
            type: 'project',
            title: 'New Project Posted',
            message: `A new project matching your skills: "${projectData.title}"`,
        }));

        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
        }

        // Send email notification to ALL freelancers
        try {
            const emailResult = await sendNewProjectNotification(project, allFreelancers);
            if (emailResult.success) {
                console.log(`Email notification sent to ${emailResult.sent} freelancers`);
            } else {
                console.error(`Failed to send project notifications: ${emailResult.error}`);
            }
        } catch (emailError) {
            // Log error but don't fail the request
            console.error('Failed to send email notifications:', emailError);
        }

        return Response.json(project);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
