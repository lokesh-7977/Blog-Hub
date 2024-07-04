import User from './user.middleware.js'
import JWT from 'jsonwebtoken'
import { config } from '../config/index.js'

export const isLoggedin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }   

    if(!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please login to access this route'
        })
    }

    try {
        const decoded = JWT.verify(token, config.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please login to access this route'
        })
    }
}

