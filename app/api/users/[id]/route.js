import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const user = await User.findById(params.id).select('-password');
        if (!user) return Response.json({ error: 'User not found' }, { status: 404 });
        return Response.json(user);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
