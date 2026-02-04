import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return Response.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        const { password: _, ...userResponse } = user._doc || user;
        userResponse.id = user._id;
        userResponse._id = user._id;

        return Response.json({ success: true, user: userResponse });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
