import User from '../models/user.schema.js';
import JWT from 'jsonwebtoken';
import { config } from '../config/index.js';

export default async function isLoggedin(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('Authorization Header:', req.headers.authorization);
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Please login to access this route',
        });
    }

    try {
        const decoded = JWT.verify(token, config.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User no longer exists',
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid token. Please login to access this route',
        });
    }
}
