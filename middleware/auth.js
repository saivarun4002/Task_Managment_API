import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ success: false, message: 'Access Denied Mate' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = verified; // Attaching the user details to the request
        next(); // used for proceeding to the next middleware
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Token Mate' });
    }
};

export { auth };
