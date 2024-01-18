import { Inject, Injectable } from "@tsed/di";
import { ChatbotsRepository } from "src/prisma";
import axios from "axios";

axios.defaults.baseURL = 'https://www.chatbase.co/api/v1';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.CHAT_BASE_AUTH_TOKEN || 'eeb3a53b-5334-4171-9580-c55d8bf3f478'
axios.defaults.headers.common['Content-Type'] = 'application/json';

@Injectable()
export class ChatbotService {
    @Inject() private chatbotsRepository: ChatbotsRepository;

    async findOne(options: any) {
        return this.chatbotsRepository.findFirst(options);
    }

    async create(chatbot: any) {
        return this.chatbotsRepository.create({ data: chatbot });
    }

    async update(db_id: number, chatbot: any) {
        return this.chatbotsRepository.update({
            where: { db_id },
            data: chatbot
        });
    }

    async delete(db_id: number) {
        return this.chatbotsRepository.delete({
            where: { db_id }
        });
    }

    async findMany(options: any) {
        return this.chatbotsRepository.findMany(options);
    }

    async findManyWithPagination(options: any) {
        const { page, limit, ...where } = options;
        const offset = (page - 1) * limit;
        return this.chatbotsRepository.findMany({
            where,
            take: limit,
            skip: offset
        });
    }

    async count(options: any) {
        return this.chatbotsRepository.count(options);
    }


    async syncChatbot() {
        try {
            const result = await axios.get('/get-chatbots');
            console.log('chatbots -', result);
            if (result.data && result.data.chatbots) {
                const chatbots = result.data.chatbots;
                for (let i = 0; i < chatbots.length; i++) {
                    const chatbot = chatbots[i];
                    const chatbotData = {
                        id: chatbot.id,
                        name: chatbot.name,
                        platform: chatbot.platform,
                        category: chatbot.category,
                        description: chatbot.description,
                        url: chatbot.url,
                        icon: chatbot.icon,
                        is_active: chatbot.is_active,
                        created_at: chatbot.created_at,
                        updated_at: chatbot.updated_at
                    };
                    const existingChatbot = await this.findOne({ where: { id: chatbot.id } });
                    if (existingChatbot) {
                        await this.update(existingChatbot.db_id, chatbotData);
                    } else {
                        await this.create(chatbotData);
                    }
                }

            }
        } catch (error) {
            console.log('syncChatbot error -', error);
        }
    }



}
