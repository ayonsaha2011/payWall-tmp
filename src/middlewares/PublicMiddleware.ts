import { Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";

@Middleware()
export class PublicMiddleware implements MiddlewareMethods {
    public use(@Req() request: Req, @Context() ctx: Context) {
        // retrieve options given to the @UseAuth decorator
        const options = ctx.endpoint.get(PublicMiddleware) || {};

        console.log('request.user ====>', request.user);
        const user = request.user as any;
        if (request.isAuthenticated()) {
            if (user?.role === 54) {
                return ctx.response.redirect(302, "/admin/");
            }
            return ctx.response.redirect(302, "/user/");
        }
    }
}
