import { Chatbot } from "../client";
import { Integer, Required, Property, Groups, Allow, Format } from "@tsed/schema";

export class ChatbotModel implements Chatbot {
  @Property(Number)
  @Integer()
  @Required()
  @Groups("!creation")
  db_id: number;

  @Property(String)
  @Required()
  id: string;

  @Property(String)
  @Required()
  name: string;

  @Property(String)
  @Allow(null)
  user_id: string | null;

  @Property(String)
  @Allow(null)
  visibility: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  created_at: Date | null;

  @Property(String)
  @Allow(null)
  thumbnail_url: string | null;

  @Property(Boolean)
  @Allow(null)
  is_featured: boolean | null;

  @Property(Object)
  @Allow(null)
  domains: any | null;

  @Property(String)
  @Allow(null)
  instructions: string | null;

  @Property(String)
  @Allow(null)
  initial_message: string | null;

  @Property(Object)
  @Allow(null)
  initial_messages: any | null;

  @Property(String)
  @Allow(null)
  index_name: string | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  ip_limit: number | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  ip_limit_timeframe: number | null;

  @Property(String)
  @Allow(null)
  ip_limit_message: string | null;

  @Property(String)
  @Allow(null)
  suggested_messages: string | null;

  @Property(String)
  @Allow(null)
  user_message_color: string | null;

  @Property(Object)
  @Allow(null)
  styles: any | null;

  @Property(String)
  @Allow(null)
  model: string | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  last_message_at: Date | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  num_of_characters: number | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  last_trained_at: Date | null;

  @Property(String)
  @Allow(null)
  status: string | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  temp: number | null;

  @Property(String)
  @Allow(null)
  collect_customer_info: string | null;

  @Property(Object)
  @Allow(null)
  collect_customer_information: any | null;

  @Property(Boolean)
  @Allow(null)
  only_allow_on_added_domains: boolean | null;

  @Property(String)
  @Allow(null)
  notifications_settings: string | null;

  @Property(String)
  @Allow(null)
  retraining_interval: string | null;

  @Property(String)
  @Allow(null)
  custom_domains: string | null;

  @Property(String)
  @Allow(null)
  current_training_id: string | null;

  @Property(Boolean)
  @Allow(null)
  @Groups("!creation")
  singlePlan: boolean | null;

  @Property(Boolean)
  @Allow(null)
  @Groups("!creation")
  isActive: boolean | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  @Groups("!creation", "!update")
  db_createdAt: Date | null;

  @Property(Date)
  @Format("date-time")
  @Allow(null)
  @Groups("!creation")
  db_updatedAt: Date | null;
}

