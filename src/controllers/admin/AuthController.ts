import { Controller, Inject } from "@tsed/di";
import { Get, Post, Redirect, Returns, View, email } from "@tsed/schema";
import { UsersService } from '../../services/UsersService';
import { Req, UseAuth } from "@tsed/common";
import { Authenticate } from "@tsed/passport";
import { BodyParams, Context, QueryParams } from "@tsed/platform-params";
import { UserModel } from "../../prisma";
import { PublicMiddleware } from '../../middlewares/PublicMiddleware';
import { Credentials } from '../../models/Credentials';
import { ErrorHandlingService } from '../../services/ErrorHandlingService';
import { RedisService } from '../../services/RedisService';

@Controller("/")
export class AuthController {
    @Inject() private usersService: UsersService;


    @Get("/login")
    @UseAuth(PublicMiddleware)
    @View("admin/login.njk")
    async loginView(@Req() req: Req) {
        const flashMessage = await RedisService.getFlashMessages('/admin/login');
        return {
            title: "Login",
            flashMessage
        };
    }

    @Get("/forgot-password")
    @UseAuth(PublicMiddleware)
    @View("admin/forgot-password.njk")
    async forgotPasswordView(@Req() req: Req) {
        return {
            title: "Forgot Password"
        };
    }

    @Get("/reset-password/")
    @UseAuth(PublicMiddleware)
    @View("admin/reset-password.njk")
    async resetPasswordView(@QueryParams() params: any) {
        const token = params.token;
        return {
            title: "Reset Password",
            token
        };
    }

    @Post("/login")
    @Authenticate("login")
    @Returns(200)
    async login(@Req("user") user: UserModel, @BodyParams() credentials: Credentials, @Context() ctx: Context) {
        if (!user) {
            return ctx.response.redirect(401, "/admin/login");
        }
        return {
            status: "success",
            data: user,
            message: "User successfully authenticated",
        };
    }

    @Get("/logout")
    @Redirect("/admin/login")
    logout(@Req() req: Req) {
        return req.logout(() => {
            req.session.destroy(() => {
                return;
            });
        });
    }

    @Post("/forgot-password")
    @UseAuth(PublicMiddleware)
    @Returns(200)
    async forgotPassword(@BodyParams('email') email: string) {
        try {
            const user = await this.usersService.forgotPassword(email);
            if (!user) {
                return {
                    status: "error",
                    message: "User not found"
                }
            }
            RedisService.setFlashMessages('/admin/login', 'Password reset link sent to your email. Please check your inbox.', 'success');
            return {
                status: "success",
                message: "Password reset link sent to your email. Please check your inbox."
            }
        } catch (error) {
            console.log("error ======>", error);
            return ErrorHandlingService.ProcessError(error);
        }
    }

    @Post("/reset-password")
    @UseAuth(PublicMiddleware)
    @Returns(200)
    async resetPassword(@BodyParams() body: any) {
        try {
            const user = await this.usersService.resetPassword(body.token, body.password);
            if (!user) {
                return {
                    status: "error",
                    message: "User not found"
                }
            }
            RedisService.setFlashMessages('/admin/login', 'Successfully reset your password. Please login to continue.', 'success');
            return {
                status: "success",
                message: "Successfully reset your password. Please login to continue."
            }
        } catch (error) {
            console.log("error ======>", error);
            return ErrorHandlingService.ProcessError(error);
        }
    }

}
