import { verifyAccessToken } from "../util/token.js";

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}

export const authoriseRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        }
        next();
    }
}