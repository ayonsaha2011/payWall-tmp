import { Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { Forbidden, Unauthorized } from "@tsed/exceptions";

@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
    public use(@Req() request: Req, @Context() ctx: Context) {
        // retrieve options given to the @UseAuth decorator
        const options = ctx.endpoint.get(AuthMiddleware) || {};

        // console.log('request.user ====>', request.user);
        const user = request.user as any;

        if (!request.isAuthenticated() || !user) {
            let redirectPath = "/admin/login";

            return ctx.response.redirect(302, redirectPath);
            // passport.js method to check auth
            throw new Unauthorized("Unauthorized");
        } else {
            ctx.response.locals.user = user;
        }
        if (user?.role !== options.role) {
            throw new Forbidden("Forbidden");
        }
    }
}