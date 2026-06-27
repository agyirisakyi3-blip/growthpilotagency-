export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  message: string;
  status: string;
  source: string;
  createdAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: Record<string, string>;
  image: string;
  published: boolean;
  createdAt: Date;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string;
  benefits: string[];
  cta: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Industry {
  name: string;
  description: string;
  icon: string;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  createdAt: Date;
}

export interface WhatsAppContact {
  id: string;
  waId: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  serviceInterest: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhatsAppConversation {
  id: string;
  contactId: string;
  contact: WhatsAppContact;
  status: string;
  intent: string;
  createdAt: Date;
  updatedAt: Date;
  messages: WhatsAppMessage[];
}

export interface WhatsAppMessage {
  id: string;
  conversationId: string;
  fromMe: boolean;
  content: string;
  type: string;
  metadata: string;
  createdAt: Date;
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  type: string;
  status: string;
  error: string | null;
  createdAt: Date;
}
