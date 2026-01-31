import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'freelancer'], required: true },
    avatar: { type: String, default: null },
    walletBalance: { type: Number, default: 0 },
    skills: [{ type: String }],
    rating: { type: Number, default: 0 },
    completedProjects: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
