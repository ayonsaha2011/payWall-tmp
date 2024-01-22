import { BodyParams, Redirect, Req, Res } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { Credentials } from "../models/Credentials";
import bcrypt from "bcrypt";
import { RedisService } from '../services/RedisService';
import { Unauthorized } from '@tsed/exceptions';
import { UsersService } from '../services/UsersService';


@Protocol<IStrategyOptions>({
    name: "login",
    useStrategy: Strategy,
    settings: {
        usernameField: "email",
        passwordField: "password"
    }
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
    constructor(private usersService: UsersService) {
    }

    async $onVerify(@Req() request: Req, @Res() response: Res, @BodyParams() credentials: Credentials) {
        const { email, password, role } = credentials;

        console.log(` email  = ${email}, password =${password} , role= ${role}`);

        try {
            const user = await this.usersService.findOne({
                where: {
                    email: email,
                    role: Number(role),
                    isActive: true
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: true,
                    role: true,
                    createdAt: true,
                }
            });

            if (!user) {
                // return false;
                // console.log("User not found ctx.id == ", ctx.id);
                // console.log('LoginLocalProtocol request.id ====> ', request.id);
                // RedisService.setFlashMessages(request.url, 'User not found', { formData: { email, password, role } });
                // return response.redirect(401, request.url || "/admin/login");
                // return Redirect(401, request.url || "/admin/login");
                throw new Unauthorized("User not found");
                // return false;
                // OR throw new NotAuthorized("Wrong credentials")
            }
            if (!user.password) {
                throw new Unauthorized("Password is  required");
            }
            if (!await bcrypt.compare(password, user.password)) {
                // RedisService.setFlashMessages(request.id, 'Wrong credentials', { formData: { email, password, role } });
                // return false;
                throw new Unauthorized("Wrong credentials");
                // return Redirect(401, request.url || "/admin/login");
                // return response.redirect(401, request.url || "/admin/login");
                // OR throw new NotAuthorized("Wrong credentials")
            }

            return user;
        } catch (error) {
            console.log('LoginLocalProtocol error ===== === ', error);
            throw error;
        }

    }

    $onInstall(strategy: Strategy): void {
        // intercept the strategy instance to adding extra configuration
    }
}