export interface Project {
  id: string;
  name: string;
  description: string;
  category: 'Web Applications' | 'SaaS Platforms' | 'E-Commerce' | 'Dashboards';
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  image: string;
  longDescription?: string;
  views: number;
  likes: number;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  views: number;
  likes: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface Service {
  id: string;
  iconName: string; // Lucide icon identifier
  title: string;
  description: string;
  details: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  accomplishments: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AnalyticsStats {
  totalViews: number;
  projectViews: number;
  blogViews: number;
  messagesReceived: number;
  dailyViews: { date: string; views: number; contactSubmissions: number }[];
}
