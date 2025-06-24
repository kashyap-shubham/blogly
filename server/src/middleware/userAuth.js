import jwt from "jsonwebtoken";



export const userAuth = (req, res, next) => {

    const authorization = req.headers["authorization"];

    const token = req.cookies?.token 
        || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null)
        || req.body?.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.USER_JWT);

        req.user = decoded;
        next(); 

    } catch(error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token Expired Please Login Again"
            })
        }

        return res.status(401).json({
            message: "Invalid or Malformed Token"
        })
    }

}