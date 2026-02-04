import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const user = await User.findById(id).select('-password');
        if (!user) return Response.json({ error: 'User not found' }, { status: 404 });
        return Response.json(user);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        return Response.json(updatedUser);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
