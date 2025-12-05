import User from "../models/userModel.js";

// Get all skills for a logged in user
export const getSkills = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('profile.skills');
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            skills: user.profile.skills,
        })
    } catch (error) {
        console.error('Error fetching skills:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Add a new skill for a logged in user
export const addSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        if(!name){
            return res.status(400).json({
                success: false,
                message: 'Skill name is required'
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if(!user.profile) user.profile = {};
        if(!user.profile.skills) user.profile.skills = [];
        if (user.profile.skills.some(skill => skill.name.toLowerCase() === name.toLowerCase())) {
            return res.status(400).json({ success: false, message: 'Skill already exists' });
        }

        user.profile.skills.push({ name: name, level: 'beginner' });
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'Skill added successfully',
            skills: user.profile.skills,
        });

    } catch (error) {
        console.error('Error adding skill:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Update a skill for a logged in user
export const updateSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { skillId } = req.params;
        const { name, level } = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const skill = user.profile.skills.id(skillId);
        if(!skill){
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }
        if(name !== undefined) skill.name = name;
        if(level !== undefined) skill.level = level;
        skill.updatedAt = Date.now();

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Skill updated successfully',
            skills: user.profile.skills,
        });
    } catch (error) {
        console.error('Error updating skill:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Delete a skill for a logged in user
export const deleteSkill = async (req, res) => {
    try {
        const userId = req.user.id;
        const { skillId } = req.params;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        const skill = user.profile.skills.id(skillId);
        if(!skill){
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }
        const skillToDelete = user.profile.skills.filter(skill => skill._id.toString() !== skillId);
        user.profile.skills = skillToDelete;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Skill deleted successfully',
            skills: user.profile.skills,
        });
    } catch (error) {
        console.error('Error deleting skill:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}