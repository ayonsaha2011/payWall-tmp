import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";

@Controller("/")
export class HomeController {
    @Get("/")
    async get() {
        return '<h1>Welcome to PayWall</h1>'
    }
}
