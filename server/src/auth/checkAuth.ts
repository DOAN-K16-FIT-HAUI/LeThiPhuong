import { Request, Response, NextFunction } from 'express';

// Use require for modules without type declarations
// @ts-ignore
import { BadRequestError } from '../core/error.response';
// @ts-ignore
import { verifyToken } from '../services/tokenSevices';
// @ts-ignore
import modelUser from '../models/users.model';

// Define types for decoded token
interface DecodedToken {
    id: string;
    [key: string]: any;
}

interface User {
    isAdmin: string;
}

// Define type for request with user
interface RequestWithUser extends Request {
    user?: DecodedToken;
}

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    };
};

const authUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.cookies.token;
        if (!user) throw new BadRequestError('Vui lòng đăng nhập');
        const token = user;
        const decoded = (await verifyToken(token)) as DecodedToken;
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

const authAdmin = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.cookies.token;
        if (!user) throw new BadRequestError('Bạn không có quyền truy cập');
        const token = user;
        const decoded = (await verifyToken(token)) as DecodedToken;
        const { id } = decoded;
        const findUser = (await modelUser.findOne({ where: { id } })) as unknown as User;
        if (findUser.isAdmin === '0') {
            throw new BadRequestError('Bạn không có quyền truy cập');
        }
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

export { asyncHandler, authUser, authAdmin };
