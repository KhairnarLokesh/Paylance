import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'submitted', 'approved'], default: 'pending' },
    deadline: { type: String },
    submission: { type: String, default: null },
});

const ApplicationSchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    demoUrl: { type: String },
    coverLetter: { type: String },
    appliedAt: { type: Date, default: Date.now },
});

const ProjectSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    skills: [{ type: String }],
    budget: { type: Number, required: true },
    status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    milestones: [MilestoneSchema],
    escrowAmount: { type: Number, default: 0 },
    applications: [ApplicationSchema],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
