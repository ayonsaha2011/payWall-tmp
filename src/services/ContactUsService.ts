import { Inject, Injectable } from "@tsed/di";
import { ContactusesRepository } from '../prisma/repositories/ContactusesRepository';

@Injectable()
export class ContactUsService {
    @Inject() private contactusesRepository: ContactusesRepository;

    async findOne(options: any) {
        return this.contactusesRepository.findFirst(options);
    }

    async create(contactus: any) {
        return this.contactusesRepository.create({ data: contactus });
    }

    async update(id: number, contactus: any) {
        return this.contactusesRepository.update({
            where: { id },
            data: contactus
        });
    }

    async delete(id: number) {
        return this.contactusesRepository.delete({
            where: { id }
        });
    }

    async findMany(options: any) {
        return this.contactusesRepository.findMany(options);
    }

    async findManyWithPagination(options: any) {
        const { page, limit, ...where } = options;
        const offset = (page - 1) * limit;
        return this.contactusesRepository.findMany({
            where,
            take: limit,
            skip: offset
        });
    }

    async count(options: any) {
        return this.contactusesRepository.count(options);
    }

}
