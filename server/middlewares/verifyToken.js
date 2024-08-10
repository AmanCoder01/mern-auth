import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "Please Login !"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorized !"
            })
        }

        req.userId = decoded.userId
        next();

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}