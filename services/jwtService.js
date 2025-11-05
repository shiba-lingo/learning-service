import jwt from "jsonwebtoken";

class JwtService {
    generateToken(userId) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        return jwt.sign(
            { userId },
            secret,
            { expiresIn: '7d' }
        );
    }

    verifyToken(token) {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error('JWT_SECRET is not defined');
            }

            return jwt.verify(token, secret);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

export default new JwtService();
