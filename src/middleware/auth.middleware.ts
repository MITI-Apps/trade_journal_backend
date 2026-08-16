import { expressjwt } from "express-jwt";
import type { Response, Request, NextFunction } from "express";

function authJwt(req: Request, res: Response, next: NextFunction){
    const secret = process.env.JWT_SECRET;
    if(!secret){
        return res.status(500).json({ error: 'JWT secret not configured' });
    };
    const jwtMiddleware = expressjwt({
        secret,
        algorithms: ["HS256"],
    });

    jwtMiddleware(req, res, (err) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        next();
    });
}

export default authJwt;