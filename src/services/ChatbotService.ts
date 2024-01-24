import { Inject, Injectable } from "@tsed/di";
import axios from "axios";
import { ChatbotsRepository } from '../prisma/repositories/ChatbotsRepository';

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


    async syncChatbot() {
        try {
            const result = await axios.get('/get-chatbots');
            // console.log('chatbots -', result);
            if (result.data && result.data.chatbots) {
                const chatbots = result.data.chatbots;
                for (let i = 0; i < chatbots.length; i++) {
                    const chatbot = chatbots[i];
                    console.log('chatbot -', chatbot);
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
                        const u = await this.update(existingChatbot.db_id, chatbot);
                        console.log('u -', u);
                    } else {
                        const r = await this.create(chatbot);
                        console.log('r -', r);
                    }
                }

            }
        } catch (error) {
            console.log('syncChatbot error -', error);
        }
    }

    async statusUpdate(db_id: number) {
        const chatbot = await this.findOne({ where: { db_id } });
        if (chatbot) {
            return await this.chatbotsRepository.update({
                where: { db_id },
                data: { isActive: !chatbot.isActive }
            });
        }
        return null;

    }

    async makeSinglePlan(db_id: number) {
        await this.chatbotsRepository.updateMany({
            data: { singlePlan: false }
        });

        return await this.update(db_id, { singlePlan: true, isActive: true });;

    }

}
