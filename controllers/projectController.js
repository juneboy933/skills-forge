import User from "../models/userModel.js";

// Get all projects for a user
export const getProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('profile.projects');

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            projects: user.profile.projects || []
        })
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Add a new project 
export const addProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title } = req.body;

        if(!title){
            return res.status(400).json({
                success: false,
                message: 'Project title is required'
            });
        }

        const user = await User.findById(userId).select('profile.projects');

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const newProject = {
            title: title.trim()
        }

        user.profile.projects.push(newProject);
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'Project added successfully',
            project: newProject
        });

    } catch (error) {
        console.error('Error adding project:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Update a project
export const updateProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;
        const { title, description, link, skills } = req.body;

        const user = await User.findById(userId).select('profile.projects');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const project = user.profile.projects.id(projectId);
        if(!project){
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        if(title !== undefined) project.title = title;
        if(description !== undefined) project.description = description;
        if(link !== undefined) project.link = link;

        if (skills !== undefined) {
            let incomingSkills = [];

            if (Array.isArray(skills)) {
                incomingSkills = skills;
            } else if (typeof skills === 'string') {
                incomingSkills = [skills];
            }
            project.skills = [...new Set([...project.skills, ...incomingSkills])];
        }

        project.updatedAt = Date.now();

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            project: project,
        });
    } catch (error) {
        console.error('Error updating project:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Delete a project 
export const deleteProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;

        const user = await User.findById(userId).select('profile.projects');
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const project = user.profile.projects.id(projectId);
        if(!project){
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        project.deleteOne();
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            projects: user.profile.projects,
        });
    } catch (error) {
        console.error('Error deleting project:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}