import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const project = await Project.findById(params.id);
        if (!project) return Response.json({ error: 'Project not found' }, { status: 404 });
        return Response.json(project);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const project = await Project.findByIdAndUpdate(params.id, data, { new: true });
        return Response.json(project);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
