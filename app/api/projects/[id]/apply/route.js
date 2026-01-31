import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Notification from '@/models/Notification';

export async function POST(req, { params }) {
    try {
        await dbConnect();
        const { freelancerId, demoUrl, coverLetter, freelancerName } = await req.json();

        const project = await Project.findById(params.id);
        if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });

        project.applications.push({
            freelancerId,
            demoUrl,
            coverLetter,
            status: 'pending'
        });

        await project.save();

        // Notify client
        await Notification.create({
            userId: project.clientId,
            type: 'application',
            title: 'New Application',
            message: `${freelancerName} applied for "${project.title}"`,
        });

        return Response.json(project);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
