import { BodyParams, Req } from "@tsed/common";
import { OnInstall, OnVerify, Protocol, Arg } from "@tsed/passport";
import { Strategy } from "passport";
import { BasicStrategy } from "passport-http";
import bcrypt from "bcrypt";
import { UsersService } from '../services/UsersService';

@Protocol({
    name: "basic",
    useStrategy: BasicStrategy,
    settings: {}
})
export class BasicProtocol implements OnVerify, OnInstall {
    constructor(private usersService: UsersService) {
    }

    async $onVerify(@Req() request: Req, @Arg(0) username: string, @Arg(1) password: string) {
        // checkEmail(username);

        const user = await this.usersService.findOne({
            where: {
                email: username
            },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
                createdAt: true,
            }
        }) as any;

        if (!user) {
            return false;
            // throw new NotAuthorized("Wrong credentials")
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return false;
            // OR throw new NotAuthorized("Wrong credentials")
        }
        delete user.password;

        return user;
    }

    $onInstall(strategy: Strategy): void {
        // intercept the strategy instance to adding extra configuration
    }
}