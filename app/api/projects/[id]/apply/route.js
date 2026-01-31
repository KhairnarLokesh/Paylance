import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import User from '@/models/User';
import Notification from '@/models/Notification';
import { sendNewApplicationNotification } from '@/lib/emailService';

export async function POST(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params; // Await params
        const { freelancerId, demoUrl, coverLetter, freelancerName } = await req.json();

        const project = await Project.findById(id);
        if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });

        // Create application object
        const application = {
            freelancerId,
            demoUrl,
            coverLetter,
            status: 'pending'
        };

        project.applications.push(application);
        await project.save();

        // Notify client (in-app notification)
        await Notification.create({
            userId: project.clientId,
            type: 'application',
            title: 'New Application',
            message: `${freelancerName} applied for "${project.title}"`,
        });

        // Send email notification to client
        try {
            // Get client and freelancer details
            const client = await User.findById(project.clientId);
            const freelancer = await User.findById(freelancerId);

            if (client && freelancer) {
                const result = await sendNewApplicationNotification(
                    project,
                    client,
                    freelancer,
                    { demoUrl, coverLetter }
                );
                if (result.success) {
                    console.log(`Email notification sent to client: ${client.email}`);
                } else {
                    console.error(`Failed to send email to client: ${result.error}`);
                }
            }
        } catch (emailError) {
            // Log error but don't fail the request
            console.error('Failed to send email notification to client:', emailError);
        }

        return Response.json(project);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
