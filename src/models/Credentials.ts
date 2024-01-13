

import { Format, MaxLength, Min, MinLength, Property } from "@tsed/schema";

export class Credentials {
    @Property()
    @Format("email")
    email: string;

    @Property()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @Property()
    role: number;
}
