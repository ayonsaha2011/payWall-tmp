import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, ContactUs } from "../client";
import { ContactUsModel } from "../models";

@Injectable()
export class ContactusesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.contactUs
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | ContactUs | ContactUs[]): T {
    return deserialize<T>(obj, { type: ContactUsModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.ContactUsFindUniqueArgs): Promise<ContactUsModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<ContactUsModel | null>(obj);
  }

  async findFirst(args: Prisma.ContactUsFindFirstArgs): Promise<ContactUsModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<ContactUsModel | null>(obj);
  }

  async findMany(args?: Prisma.ContactUsFindManyArgs): Promise<ContactUsModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<ContactUsModel[]>(obj);
  }

  async create(args: Prisma.ContactUsCreateArgs): Promise<ContactUsModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<ContactUsModel>(obj);
  }

  async update(args: Prisma.ContactUsUpdateArgs): Promise<ContactUsModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<ContactUsModel>(obj);
  }

  async upsert(args: Prisma.ContactUsUpsertArgs): Promise<ContactUsModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<ContactUsModel>(obj);
  }

  async delete(args: Prisma.ContactUsDeleteArgs): Promise<ContactUsModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<ContactUsModel>(obj);
  }

  deleteMany(args: Prisma.ContactUsDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  updateMany(args: Prisma.ContactUsUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  aggregate(args: Prisma.ContactUsAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
