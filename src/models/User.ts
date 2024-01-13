import { Format, Property } from "@tsed/schema";

export class User {
    @Property()
    id: number;

    @Property()
    userSessionId: string;

    @Property()
    name: string;

    @Property()
    @Format("email")
    email: string;

    @Property()
    role: number;

    @Property()
    createdAt: Date;

}
