import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await dbConnect();
        const { name, email, password, role, skills } = await req.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return Response.json({ success: false, error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            skills: skills || [],
            walletBalance: 0,
        });

        const userResponse = {
            _id: user._id,
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            skills: user.skills,
            walletBalance: user.walletBalance,
        };

        return Response.json({ success: true, user: userResponse });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
