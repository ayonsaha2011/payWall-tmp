import { Controller, Inject } from "@tsed/di";
import { Get, Path, Redirect, View } from "@tsed/schema";
import { ChatbotService } from '../../services/ChatbotService';
import { PathParams } from "@tsed/platform-params";

@Controller("/chatbot")
export class ChatbotController {
    @Inject() private chatbotService: ChatbotService;


    @Get("/")
    @View("admin/chatbot.njk")
    async get() {
        const chatbots = await this.chatbotService.findMany({});
        return { title: "Chatbot", path: "chatbot", breadcrumbs: 'Chatbot', chatbots }
    }

    @Get("/sync")
    @Redirect("/admin/chatbot")
    async syncChatbot() {
        return await this.chatbotService.syncChatbot();
    }

    @Get("/statusUpdate/:id")
    @Redirect("/admin/chatbot")
    async statusUpdate(@PathParams("id") id: number) {
        return await this.chatbotService.statusUpdate(id);
    }


    @Get("/makeSinglePlan/:id")
    @Redirect("/admin/chatbot")
    async makeSinglePlan(@PathParams("id") id: number) {
        return await this.chatbotService.makeSinglePlan(id);
    }


}
