import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const resolvedParams = params instanceof Promise ? await params : params;
        const { id } = resolvedParams;
        const user = await User.findById(id).select('-password');
        if (!user)
            return Response.json({ error: 'User not found' }, { status: 404 });
        return Response.json(user);
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        // Handle both Next.js 14 (sync) and 15+ (async) params
        const resolvedParams = params instanceof Promise ? await params : params;
        const { id } = resolvedParams;
        const body = await req.json();
        // Prevent accidental immutable field updates
        const { _id, id: _, email, ...updateData } = body;
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).select('-password');
        if (!updatedUser) {
            console.error(`User not found with ID: ${id}`);
            return Response.json({ error: 'User not found' }, { status: 404 });
        }
        return Response.json(updatedUser);
    }
    catch (error) {
        console.error("PATCH /api/users/[id] error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
