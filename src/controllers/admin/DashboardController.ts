import { Controller, Inject } from "@tsed/di";
import { Get, Post, Redirect, View } from "@tsed/schema";
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';
import { UseAuth } from "@tsed/platform-middlewares";
import { UsersService } from '../../services/UsersService';
import { BodyParams, Context, Req, Session } from "@tsed/common";
import { ErrorHandlingService } from '../../services/ErrorHandlingService';

@Controller("/")
@UseAuth(AuthMiddleware, { role: 54 })
export class DashboardController {
    @Inject() private usersService: UsersService;


    @Get("/")
    @Get("/dashboard")
    @View("admin/dashboard.njk")
    async getDashboard() {
        return { title: "Dashboard", path: "dashboard", breadcrumbs: 'Dashboard' }
    }
    @Get("/profile")
    @View("admin/profile.njk")
    async getProfile(@Req() req: Req) {
        const reqUser = req?.user as any;
        if (!reqUser?.id) {
            return { user: null, title: "Profile", path: "profile", breadcrumbs: 'Profile' }
        } else {
            const user = await this.usersService.findOne({
                where: {
                    id: reqUser?.id
                }
            });
            if (!user) {
                return { user: null, title: "Profile", path: "profile", breadcrumbs: 'Profile' }
            }

            return {
                user,
                title: "Profile",
                path: "profile",
                breadcrumbs: 'Profile'
            }
        }
    }

    @Post("/profile")
    // @Redirect("/admin/profile")
    async updateProfile(@BodyParams() user: any, @Req() req: any, @Context() ctx: Context) {

        try {
            const reqUser = req?.user as any;
            if (!reqUser?.id) {
                return { user: null, title: "Profile" }
            } else {
                // console.log('user =====', user);
                user.name = user.firstName + " " + user.lastName;
                // sessionUser.name = user.name;
                try {
                    ctx.response.locals.user.name = user.name;
                } catch (error) {
                    console.log('error =====', error);
                }
                delete user.confirmPassword;
                await this.usersService.update(Number(reqUser?.id), user);
                return {
                    status: "success",
                    message: "Profile updated successfully"
                }
            }
        } catch (error) {
            console.error('Post /profile error = ', error);
            return ErrorHandlingService.ProcessError(error);
        }
    }


    @Get("/change-password")
    @View("admin/changepassword.njk")
    async changepassword(@Req() req: Req) {
        return { title: "Change Password", path: "change-password", breadcrumbs: 'Change Password' }
    }

    @Post("/change-password")
    async updatePassword(@BodyParams() reqData: any, @Req() req: any, @Session("user") sessionUser: any) {
        const reqUser = req?.user as any;
        // console.log('sessionUser =====', sessionUser);
        if (reqData.confirmPassword !== reqData.password) {
            return ErrorHandlingService.getCustomValidationError("Password and confirm password not match", "confirmPassword");
        }

        try {
            const user = await this.usersService.changePassword(reqUser.id, reqData.oldPassword, reqData.password);
            if (!user) {
                return {
                    status: "error",
                    message: "User not found"
                }
            }
            return {
                status: "success",
                message: "Successfully change your password."
            }
        } catch (error) {
            console.log("error ======>", error);
            return ErrorHandlingService.ProcessError(error);
        }

    }

}
