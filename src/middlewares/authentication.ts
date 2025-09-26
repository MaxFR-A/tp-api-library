import * as express from "express";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";
import {CustomError} from "./errorHandler";

let adminRight: string[] = ["admin", "read", "write", "delete", "update"];
let userRight: string[] = ["read", "books:write"];
let managerRight: string[] = ["read", "write", "update", "bookCopys:delete"];

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const token = request.headers["authorization"];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            } else {
                jwt.verify(token, process.env.JWT_SECRET as string,
                    function (erreur, decoded) {
                        if (scopes !== undefined) {
                            // Gestion des droits
                            const jwtPayload = decoded as JwtPayload & { username?: string, role?: string };
                            const role = jwtPayload.role ?? 'user';

                            console.log(role);

                            for (const scope of scopes) {
                                if (role === 'admin' && adminRight.includes(scope)) {
                                    return resolve(decoded);
                                } else if (role === 'manager' && managerRight.includes(scope)) {
                                    return resolve(decoded);
                                } else if (role === 'user' && userRight.includes(scope)) {
                                    return resolve(decoded);
                                }
                            }
                            let error: CustomError = new Error("Forbidden: You don't have enough rights");
                            error.status = 403;
                            return reject(error);
                        }
                    }
                );
            }
        });
    } else {
        throw new Error("Only support JWT authentication");
    }
}
