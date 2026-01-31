import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';

export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get('projectId');

        let query = {};
        if (projectId) query.projectId = projectId;

        const messages = await Message.find(query).sort({ timestamp: 1 });
        return Response.json(messages);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();
        const messageData = await req.json();
        const message = await Message.create(messageData);
        return Response.json(message);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
