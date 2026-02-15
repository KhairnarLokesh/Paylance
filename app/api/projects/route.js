import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import User from '@/models/User';
import Notification from '@/models/Notification';
import { sendNewProjectNotification } from '@/lib/emailService';
export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);

        // Filtering Params
        const clientId = searchParams.get('clientId');
        const assignedTo = searchParams.get('assignedTo');
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const minBudget = searchParams.get('minBudget');
        const maxBudget = searchParams.get('maxBudget');
        const search = searchParams.get('search');

        // Pagination Params
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 0; // 0 = no limit (backward compatibility)
        const skip = (page - 1) * limit;

        let query = {};

        // Exact Match Filters
        if (clientId) query.clientId = clientId;
        if (assignedTo) query.assignedTo = assignedTo;
        if (status) query.status = status;
        if (category && category !== 'all') query.category = category;

        // Range Filters
        if (minBudget || maxBudget) {
            query.budget = {};
            if (minBudget) query.budget.$gte = Number(minBudget);
            if (maxBudget) query.budget.$lte = Number(maxBudget);
        }

        // Text Search (Regex for simplicity, consider Text Index for prod)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Execute Query
        let projectsQuery = Project.find(query).sort({ createdAt: -1 });

        // Apply Pagination if limit is set
        if (limit > 0) {
            projectsQuery = projectsQuery.skip(skip).limit(limit);
        }

        const projects = await projectsQuery.populate('clientId', 'name email'); // Populate client details

        // Return matching count for pagination UI
        const total = await Project.countDocuments(query);

        return Response.json({
            projects,
            pagination: {
                total,
                page,
                limit,
                pages: limit > 0 ? Math.ceil(total / limit) : 1
            }
        });
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        await dbConnect();
        const projectData = await req.json();
        const project = await Project.create({
            ...projectData,
            status: 'open',
            escrowAmount: 0,
        });
        // Get all freelancers (for email notification)
        const allFreelancers = await User.find({ role: 'freelancer' });
        // Notify matching freelancers (in-app notification)
        const matchingFreelancers = await User.find({
            role: 'freelancer',
            skills: { $in: projectData.skills }
        });
        const notifications = matchingFreelancers.map(f => ({
            userId: f._id,
            type: 'project',
            title: 'New Project Posted',
            message: `A new project matching your skills: "${projectData.title}"`,
        }));
        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
        }
        // Send email notification to ALL freelancers
        try {
            const emailResult = await sendNewProjectNotification(project, allFreelancers);
            if (emailResult.success) {
                console.log(`Email notification sent to ${emailResult.sent} freelancers`);
            }
            else {
                console.error(`Failed to send project notifications: ${emailResult.error}`);
            }
        }
        catch (emailError) {
            // Log error but don't fail the request
            console.error('Failed to send email notifications:', emailError);
        }
        return Response.json(project);
    }
    catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
