import { Inject, Injectable } from "@tsed/di";
import bcrypt from "bcrypt";
import { UsersRepository } from "../prisma";
import { Prisma } from "@prisma/client";
import { EmailService } from './EmailService';

@Injectable()
export class UsersService {
    @Inject() private usersRepository: UsersRepository;
    @Inject() private emailService: EmailService;

    async findOne(options: any) {
        return this.usersRepository.findFirst(options);
    }

    async create(user: Prisma.UserUncheckedCreateInput) {
        if (!user.password) {
            throw new Error(`Password is required`);
        }
        user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS || "12"));
        return this.usersRepository.create({ data: user });
    }

    async update(id: number, user: Prisma.UserUncheckedUpdateInput) {
        // console.log("user detils ", user)
        if (user.password) {
            user.password = await bcrypt.hash(user.password.toString(), parseInt(process.env.SALT_ROUNDS || "12"));
        } else {
            delete user.password;
        }
        return this.usersRepository.update({
            where: { id },
            data: user
        });
    }




    async forgotPassword(email: string) {
        const user = await this.usersRepository.findFirst({
            where: {
                email
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.email) {
            throw new Error("Email is required");
        }
        const token = await bcrypt.hash(user.email, parseInt(process.env.SALT_ROUNDS || "12"));
        await this.usersRepository.update({
            where: {
                id: user.id
            },
            data: {
                token: token,
                tokenExpiration: new Date(Date.now() + 3600000) // 1 hour
            }
        });
        let resetLinkBaseUrl = process.env.ADMIN_URL || 'http://ec2-54-219-91-186.us-west-1.compute.amazonaws.com:8085admin/';

        const resetLink = `${resetLinkBaseUrl}/reset-password?token=${token}`;
        console.log('resetLink === ' + resetLink);
        await this.emailService.resetPasswordEmail(user.email, user.name || '', resetLink);
        return user;
    }

    async resetPassword(token: string, password: string) {
        const user = await this.usersRepository.findFirst({
            where: {
                token
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        const now = new Date();
        if (user.tokenExpiration && user.tokenExpiration < now) {
            throw new Error("Token expired");
        }
        await this.usersRepository.update({
            where: {
                id: user.id
            },
            data: {
                password: await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS || "12")),
                token: null,
                tokenExpiration: null
            }
        });
        return user;
    }

    async changePassword(id: number, oldPassword: string, newPassword: string) {
        const user = await this.usersRepository.findFirst({
            where: {
                id
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (!user.password) {
            throw new Error("Password is required");
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error("Old password doesn't match");
        }
        await this.usersRepository.update({
            where: {
                id: user.id
            },
            data: {
                password: await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS || "12"))
            }
        });
        return user;
    }

    async changeEmail(id: number, email: string) {
        const user = await this.usersRepository.findFirst({
            where: {
                id
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        await this.usersRepository.update({
            where: {
                id: user.id
            },
            data: {
                email
            }
        });
        return user;
    }

    async register(user: Prisma.UserUncheckedCreateInput) {
        if (!user.password) {
            throw new Error("Password is required");
        }
        if (!user.email) {
            throw new Error("Email is required");
        }
        user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS || "12"));
        user.isActive = false;
        user.isEmailVerified = false;
        user.token = await bcrypt.hash(user.email, parseInt(process.env.SALT_ROUNDS || "12"));
        user.tokenExpiration = new Date(Date.now() + 3600000 * 24 * 2); // 2 days

        return this.usersRepository.create({ data: user });
    }

    async verifyEmail(token: string) {
        const user = await this.usersRepository.findFirst({
            where: {
                token
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        const now = new Date();
        if (user.tokenExpiration && user.tokenExpiration < now) {
            throw new Error("Token expired");
        }
        await this.usersRepository.update({
            where: {
                id: user.id
            },
            data: {
                isActive: true,
                isEmailVerified: true,
                token: null,
                tokenExpiration: null
            }
        });
        return user;
    }


}
