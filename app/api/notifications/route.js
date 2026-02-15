import dbConnect from '@/lib/mongodb';
import Notification from '@/models/Notification';
export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId)
            return Response.json({ error: 'UserId required' }, { status: 400 });
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        return Response.json(notifications);
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
export async function PATCH(req) {
    try {
        await dbConnect();
        const { notifId } = await req.json();
        const notification = await Notification.findByIdAndUpdate(notifId, { read: true }, { new: true });
        return Response.json(notification);
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
