import { Middleware, Res, Req } from "@tsed/common";
import * as Express from "express";

@Middleware()
export class NotFoundMiddleware {
    use(@Req() request: Express.Request, @Res() response: Express.Response) {

        if (request.url.startsWith("/admin")) {
            return response.status(404).render("admin/404.ejs");
        }
        response.status(404).render("admin/404.ejs");
    }
}