import {CustomError} from "../middlewares/errorHandler";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model";

export class AuthenticationService {
    public async authenticate(username: string, password: string): Promise<string> {
        const user = await User.findOne({where: {username, password}});

        if (!user) {
            let error: CustomError = new Error("Invalid username or password");
            error.status = 401;
            throw error;
        }

        const payload = { username: user.username, role: user.role || 'user' };
        return jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'});
    }
}

export const authenticationService = new AuthenticationService();