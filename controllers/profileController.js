import User from "../models/userModel.js";

// Get profile info for logged in user
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password -refreshToken');

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

// Update profile info for logged in user
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio, skills } = req.body;
        const updates = {};

        if(name !== undefined) updates.name = name;
        if(bio !== undefined) updates['profile.bio'] = bio;
        if(skills !== undefined) updates['profile.skills'] = skills;

        const user = await User.findByIdAndUpdate(
            userId, 
            {$set:updates}, 
            { new: true, runValidators: true }).select('-password -refreshToken');

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        console.error('Error updating profile:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}