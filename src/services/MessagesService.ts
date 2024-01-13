import { Inject, Injectable } from "@tsed/di";
import { MessagesRepository } from '../prisma/repositories/MessagesRepository';

@Injectable()
export class MessagesService {
    @Inject() private messagesRepository: MessagesRepository;

    async createMessage(inputData: any) {
        inputData.conversationId = Number(inputData.conversationId);
        return this.messagesRepository.create({
            data: {
                ...inputData,
            }
        });
    };

    async getMessagesByConversationId(conversationId: number) {
        return this.messagesRepository.findMany({ where: { conversationId } });
    }

    async getMessage(id: number) {
        return this.messagesRepository.findFirst({ where: { id } });
    }

    async updateMessage(id: number, inputData: any) {
        return this.messagesRepository.update({
            where: { id },
            data: {
                ...inputData,
            }
        });
    }

    async deleteMessage(id: number) {
        return this.messagesRepository.delete({ where: { id } });
    }

    async deleteMessagesByConversationId(conversationId: number) {
        return this.messagesRepository.deleteMany({ where: { conversationId } });
    }

}
