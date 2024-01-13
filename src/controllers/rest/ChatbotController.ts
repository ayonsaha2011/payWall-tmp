import { Controller, Inject } from "@tsed/di";
import { Get, Post } from "@tsed/schema";
import { ChatbotService } from '../../services/ChatbotService';
import { BodyParams, Cookies, QueryParams } from "@tsed/platform-params";
import { ThemeService } from '../../services/ThemeService';

@Controller("/chatbot")
export class ChatbotController {
    @Inject() private chatbotService: ChatbotService;
    @Inject() private themeService: ThemeService;

    @Get("/get-chatbot")
    async getChatbot(@QueryParams('userSessionId') userSessionId: string, @Cookies() cookies: any) {
        const chatbot = await this.chatbotService.getChatbot(userSessionId);
        cookies.userSessionId = chatbot.userSessionId;
        cookies.chatbotId = chatbot.chatbotId;
        cookies.userId = chatbot.userId;
        return chatbot;
    }

    @Post("/send-message")
    async sendToChatbot(@BodyParams() input: any) {
        console.log(input)
        return this.chatbotService.createChatbotMessage(input.messages_list, input.message, input.chatbotId, input.conversationId);
    }

    @Get("/get-chatbot-message")
    async getChatbotMessage(@QueryParams('conversationId') conversationId: string) {
        return await this.chatbotService.getChatbotMessage(Number(conversationId));
    }

    @Get("/getActiveTheme")
    async getActiveTheme() {
        return await this.themeService.getActiveTheme();
    }
}
