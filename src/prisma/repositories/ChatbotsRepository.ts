import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Chatbot } from "../client";
import { ChatbotModel } from "../models";

@Injectable()
export class ChatbotsRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.chatbot
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Chatbot | Chatbot[]): T {
    return deserialize<T>(obj, { type: ChatbotModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ChatbotFindUniqueArgs): Promise<ChatbotModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ChatbotModel | null>(obj);
  }

  async findFirst(args: Prisma.ChatbotFindFirstArgs): Promise<ChatbotModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ChatbotModel | null>(obj);
  }

  async findMany(args?: Prisma.ChatbotFindManyArgs): Promise<ChatbotModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ChatbotModel[]>(obj);
  }

  async create(args: Prisma.ChatbotCreateArgs): Promise<ChatbotModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ChatbotModel>(obj);
  }

  async update(args: Prisma.ChatbotUpdateArgs): Promise<ChatbotModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ChatbotModel>(obj);
  }

  async upsert(args: Prisma.ChatbotUpsertArgs): Promise<ChatbotModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ChatbotModel>(obj);
  }

  async delete(args: Prisma.ChatbotDeleteArgs): Promise<ChatbotModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ChatbotModel>(obj);
  }

  deleteMany(args: Prisma.ChatbotDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ChatbotUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ChatbotAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
