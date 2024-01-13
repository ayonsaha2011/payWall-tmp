import { Inject, Injectable } from "@tsed/di";
import axios from "axios";
import { ConversationsRepository } from '../prisma/repositories/ConversationsRepository';
import { UsersRepository } from '../prisma/repositories/UsersRepository';
import { MessagesService } from "./MessagesService";

axios.defaults.baseURL = 'https://www.chatbase.co/api/v1';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.CHAT_BASE_AUTH_TOKEN || 'eeb3a53b-5334-4171-9580-c55d8bf3f478'
axios.defaults.headers.common['Content-Type'] = 'application/json';

@Injectable()
export class ChatbotService {
    @Inject() private conversationsRepository: ConversationsRepository;
    @Inject() private usersRepository: UsersRepository;
    @Inject() private messagesService: MessagesService;
    private chatbotId: string = process.env.CHATBOT_ID || 'LxxCmDdHSk8k33xg_RDw8';


    async createChatbot(inputData: any) {
        return { chatbotId: this.chatbotId };
        const response = await axios.post('/create-chatbot', { "urlsToScrape": ["https://www.chatbase.co/docs/chat", "https://www.chatbase.co/docs/create-chatbot"], "chatbotName": "Chatbase" });
        console.log('responce ==', response);
        if (response && response.data && response.data.error) {
            console.error('error ==', response.data.error);
            return null;
        }

        return response.data;
    };

    async createChatbotMessage(messages: any[], message: string, chatbotId: string, conversationId: string) {
        await this.messagesService.createMessage({
            conversationId,
            role: 'user',
            content: message
        });
        const responce = await axios.post('/chat', {
            "messages": messages,
            "chatbotId": chatbotId,
            "stream": false,
            "temperature": 0,
            "model": "gpt-3.5-turbo",
            "conversationId": conversationId || "example-conversation-id",
        });
        console.log('responce ==', responce);
        if (responce && responce.data && responce.data.error) {
            console.error('error ==', responce.data.error);
            return null;
        }
        if (responce?.data?.text) {
            await this.messagesService.createMessage({
                conversationId,
                role: 'assistant',
                content: responce.data.text
            });
        }

        return responce;
    }

    async getChatbot(userSessionId: string) {
        const chatbot = await this.conversationsRepository.findFirst({ where: { userSessionId }, include: { messages: true }, orderBy: { createdAt: 'asc' } });
        console.log('getChatbot chatbot =======', chatbot);
        if (chatbot) {
            return chatbot;
        }
        // const responce = await this.createChatbot({ userSessionId });
        const user = await this.usersRepository.create({
            data: {
                userSessionId,
            }
        });
        const newChatbot = await this.conversationsRepository.create({
            data: {
                userSessionId,
                chatbotId: this.chatbotId,
                userId: user.id,
            }
        });
        return newChatbot;
    }

    async createConversations(userSessionId: string, userId: number) {
        // const responce = await this.createChatbot({ userSessionId });
        console.log('createConversations userSessionId =======', userSessionId);

        try {
            const newChatbot = await this.conversationsRepository.create({
                data: {
                    userSessionId,
                    chatbotId: this.chatbotId,
                    userId,
                }
            });
            return newChatbot;
        } catch (error) {
            console.error('createConversations error =======', error);
            throw error;
        }

    }

    async getChatbotMessage(conversationId: number) {
        return await this.messagesService.getMessagesByConversationId(conversationId);
    }


}
