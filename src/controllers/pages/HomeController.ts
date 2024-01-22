import { Controller, Inject } from "@tsed/di";
import { Get, Post, View } from "@tsed/schema";
import { ChatbotService } from '../../services/ChatbotService';
import { ContactUsService } from '../../services/ContactUsService';
import { BodyParams } from "@tsed/platform-params";

@Controller("/")
export class HomeController {
    @Inject() private chatbotService: ChatbotService;
    @Inject() private contactUsService: ContactUsService;

    @Get("/")
    @View("home.njk")
    async get() {
        const chatbots = await this.chatbotService.findMany({ where: { isActive: true } });
        return {
            title: "Home",
            chatbots,
        }
    }

    @Post("/contact-us")
    async contactUs(@BodyParams() body: any) {
        try {
            const contact = await this.contactUsService.create(body);
            return {
                message: "Contact us successfully",
                contact,
                status: 'success'
            };
        } catch (error) {
            console.log('error -', error);
            return {
                message: "Contact us failed",
                status: 'error'
            };
        }
    }
}
