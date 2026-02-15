import mongoose from 'mongoose';
const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['escrow_deposit', 'milestone_release', 'earning', 'deposit', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
