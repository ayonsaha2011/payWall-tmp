import { ContactUs } from "../client";
import { Integer, Required, Property, Allow, Groups, Format } from "@tsed/schema";

export class ContactUsModel implements ContactUs {
  @Property(Number)
  @Integer()
  @Required()
  id: number;

  @Property(String)
  @Required()
  firstName: string;

  @Property(String)
  @Required()
  lastName: string;

  @Property(String)
  @Required()
  email: string;

  @Property(String)
  @Required()
  phone: string;

  @Property(String)
  @Required()
  message: string;

  @Property(Boolean)
  @Allow(null)
  @Groups("!creation")
  isActive: boolean | null;

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

