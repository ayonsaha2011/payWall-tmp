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
  @Required()
  user_id: string;

  @Property(String)
  @Allow(null)
  visibility: string | null;

  @Property(Date)
  @Format("date-time")
  @Required()
  created_at: Date;

  @Property(String)
  @Allow(null)
  thumbnail_url: string | null;

  @Property(Boolean)
  @Required()
  is_featured: boolean;

  @Property(String)
  @Allow(null)
  domains: string | null;

  @Property(String)
  @Allow(null)
  instructions: string | null;

  @Property(String)
  @Allow(null)
  initial_message: string | null;

  @Property(String)
  @Required()
  index_name: string;

  @Property(Number)
  @Integer()
  @Allow(null)
  ip_limit: number | null;

  @Property(String)
  @Allow(null)
  ip_limit_timeframe: string | null;

  @Property(String)
  @Allow(null)
  ip_limit_message: string | null;

  @Property(String)
  @Allow(null)
  suggested_messages: string | null;

  @Property(String)
  @Allow(null)
  initial_messages: string | null;

  @Property(String)
  @Allow(null)
  user_message_color: string | null;

  @Property(String)
  @Allow(null)
  styles: string | null;

  @Property(String)
  @Required()
  model: string;

  @Property(Date)
  @Format("date-time")
  @Required()
  last_message_at: Date;

  @Property(Number)
  @Integer()
  @Required()
  num_of_characters: number;

  @Property(Date)
  @Format("date-time")
  @Required()
  last_trained_at: Date;

  @Property(String)
  @Required()
  status: string;

  @Property(Number)
  @Integer()
  @Required()
  temp: number;

  @Property(String)
  @Allow(null)
  collect_customer_info: string | null;

  @Property(String)
  @Allow(null)
  collect_customer_information: string | null;

  @Property(Boolean)
  @Required()
  only_allow_on_added_domains: boolean;

  @Property(String)
  @Allow(null)
  notifications_settings: string | null;

  @Property(String)
  @Required()
  retraining_interval: string;

  @Property(String)
  @Allow(null)
  custom_domains: string | null;

  @Property(String)
  @Allow(null)
  current_training_id: string | null;

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

