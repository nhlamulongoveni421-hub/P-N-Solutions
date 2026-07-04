export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  iconName: string;
  features: string[];
}

export interface PricingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "core" | "addon";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
