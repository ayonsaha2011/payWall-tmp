import { User } from "../client";
import { Integer, Required, Property, Groups, Allow, Email, Description, Ignore, Format } from "@tsed/schema";

export class UserModel implements User {
  @Property(Number)
  @Integer()
  @Required()
  @Groups("!creation")
  id: number;

  @Property(String)
  @Required()
  userSessionId: string;

  @Property(String)
  @Allow(null)
  @Email()
  @Description("User email. This email must be unique!")
  @Groups("credentials", "creation")
  email: string | null;

  @Property(String)
  @Allow(null)
  name: string | null;

  @Property(String)
  @Allow(null)
  @Groups("credentials", "creation")
  @Ignore((value: any, ctx: any) => ctx.endpoint === true)
  password: string | null;

  @Property(String)
  @Allow(null)
  firstName: string | null;

  @Property(String)
  @Allow(null)
  lastName: string | null;

  @Property(String)
  @Allow(null)
  image: string | null;

  @Property(String)
  @Allow(null)
  gender: string | null;

  @Property(String)
  @Allow(null)
  phone: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  birthday: Date | null;

  @Property(String)
  @Allow(null)
  address: string | null;

  @Property(Number)
  @Integer()
  @Required()
  role: number;

  @Property(String)
  @Allow(null)
  @Groups("!creation")
  token: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  @Groups("!creation")
  tokenExpiration: Date | null;

  @Property(Boolean)
  @Allow(null)
  @Groups("!creation")
  isEmailVerified: boolean | null;

  @Property(Boolean)
  @Allow(null)
  @Groups("!creation")
  isActive: boolean | null;

  @Property(Boolean)
  @Allow(null)
  @Groups("!creation")
  deleted: boolean | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  @Groups("!creation")
  deletedAt: Date | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  @Groups("!creation", "!update")
  createdAt: Date | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  @Groups("!creation")
  updatedAt: Date | null;
}

