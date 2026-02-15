import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import User from '@/models/User';
export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId)
            return Response.json({ error: 'UserId required' }, { status: 400 });
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
        return Response.json(transactions);
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        await dbConnect();
        const { userId, type, amount, description, projectId } = await req.json();
        const user = await User.findById(userId);
        if (!user)
            return Response.json({ error: 'User not found' }, { status: 404 });
        if (type === 'deposit') {
            user.walletBalance += amount;
        }
        else if (type === 'withdrawal') {
            if (user.walletBalance < amount)
                return Response.json({ error: 'Insufficient funds' }, { status: 400 });
            user.walletBalance -= amount;
        }
        else if (type === 'escrow_deposit') {
            if (user.walletBalance < amount)
                return Response.json({ error: 'Insufficient funds' }, { status: 400 });
            user.walletBalance -= amount;
        }
        await user.save();
        const transaction = await Transaction.create({
            userId,
            type,
            amount,
            description,
            projectId
        });
        return Response.json({ success: true, walletBalance: user.walletBalance, transaction });
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
