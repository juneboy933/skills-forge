import User from "../models/userModel.js";

// Get tasks for a project for the logged in user
export const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const {projectId} = req.params;
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

        return res.status(200).json({
            success: true,
            data: project.tasks
        });
    } catch (error) {
        console.error('Error fetching project tasks:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Add new task to a project for the logged in user
export const addTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId } = req.params;
        const { title, description } = req.body;

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

        const newTask = {
            title,
            description
        };
        project.tasks.push(newTask);
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'Task added successfully',
            data: newTask
        })
    } catch (error) {
        console.error('Error adding a new task for the project:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Update task to a project for the logged in user
export const updateTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId, taskId } = req.params;
        const { title, description, status } = req.body;

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
        const task = project.tasks.id(taskId);
        if(!task){
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        if(title !== undefined) task.title = title;
        if(description !== undefined) task.description = description;
        if(status !== undefined) task.status = status;

        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task
        });
    } catch (error) {
        console.error('Error updating task for the project:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Delete task from a project for the logged in user
export const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { projectId, taskId } = req.params;
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
        const task = project.tasks.id(taskId);
        if(!task){
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        task.deleteOne();
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: task
        })
    } catch (error) {
       console.error('Error deleting task from the project:', error.message);
       return res.status(500).json({
        success: false,
        message: 'Server Error'
       }); 
    }
}