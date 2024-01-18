import { Controller, Inject } from "@tsed/di";
import { Get, Redirect, View } from "@tsed/schema";
import { ChatbotService } from '../../services/ChatbotService';

@Controller("/chatbot")
export class ChatbotController {
    @Inject() private chatbotService: ChatbotService;


    @Get("/")
    @View("admin/chatbot.njk")
    get() {
        const chatbots = this.chatbotService.findMany({});
        return { title: "Chatbot", path: "chatbot", breadcrumbs: 'Chatbot', chatbots }
    }

    @Get("/sync")
    @Redirect("/admin/chatbot")
    async syncChatbot() {
        return await this.chatbotService.syncChatbot();
    }
}
