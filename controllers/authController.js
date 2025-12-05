import User from '../models/userModel.js';
import { cookieOptions } from '../util/cookies.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../util/token.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await User.findOne({ email })
        if(exists){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const user = await User.create({
            name,
            email,
            password,
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        // set refresh token as http-only cookie
        res.cookie("refreshToken", refreshToken, cookieOptions);

        const { password: _, ...userData } = user.toObject();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: userData,
                accessToken,
            },
        });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            });
        }
        const isValid = await user.comparePassword(password);
        if(!isValid){
             return res.status(400).json({
                success: false,
                message: 'Invalid password'
             });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // set refresh token as http-only cookie
        res.cookie("refreshToken", refreshToken, cookieOptions); 

        const {password:_, ...userData} = user.toObject();

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                user: userData,
                accessToken,
            }
        })
    } catch (error) {
        console.error('Failed to login user:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const logout = async (req, res) => {
    try {
        const tokenFromCookie = req.cookies.refreshToken;

        if(tokenFromCookie) {
            const user = await User.findOne({ refreshToken: tokenFromCookie });
            if(user){
                user.refreshToken = null;
                await user.save({ validateBeforeSave: false });
            }
        }

        // clear cookie
        res.clearCookie('refreshToken', cookieOptions);

        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.error('Failed to logout:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const tokenFromCookie = req.cookies.refreshToken;

        if(!tokenFromCookie) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token is required'
            })
        }

        const decoded = verifyRefreshToken(tokenFromCookie);
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }

        const user = await User.findOne({ refreshToken: tokenFromCookie });
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        // Update cookie
        res.cookie("refreshToken", newRefreshToken, cookieOptions);


        return res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                accessToken: newAccessToken,
            }
        });
    } catch (error) {
        console.error('Failed to refresh token:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}