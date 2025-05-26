export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  location: string;
  rating: number;
  ratingCount: number;
  bio?: string;
  memberSince?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  description?: string;
}

export interface Match {
  id: string;
  user: User;
  teachSkill: Skill;
  learnSkill: Skill;
  conversationId?: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  skillExchange: string;
}

export interface Message {
  id: string;
  conversationId: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  read: boolean;
}

export interface UserProfile extends User {
  skillsTaught: number;
  skillsLearned: number;
  bio: string;
  memberSince: string;
}