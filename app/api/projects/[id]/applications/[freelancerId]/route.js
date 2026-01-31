import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Notification from '@/models/Notification';

export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id, freelancerId } = params;
        const { decision } = await req.json(); // 'approved' or 'rejected'

        const project = await Project.findById(id);
        if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });

        project.applications = project.applications.map(app => {
            if (app.freelancerId.toString() === freelancerId) {
                return { ...app, status: decision };
            }
            if (decision === 'approved') {
                return { ...app, status: app.status === 'approved' ? 'approved' : 'rejected' };
            }
            return app;
        });

        if (decision === 'approved') {
            project.assignedTo = freelancerId;
            project.status = 'in_progress';
        }

        await project.save();

        // Notify freelancer
        await Notification.create({
            userId: freelancerId,
            type: 'application',
            title: `Application ${decision === 'approved' ? 'Approved' : 'Rejected'}`,
            message: `Your application for "${project.title}" has been ${decision}`,
        });

        return Response.json(project);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
