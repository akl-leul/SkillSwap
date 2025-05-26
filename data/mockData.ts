import { Skill, Match, Conversation, Message, UserProfile } from '@/types/types';

export const skillCategories = [
  'Music', 
  'Technology', 
  'Languages', 
  'Art', 
  'Cooking', 
  'Fitness', 
  'Academic', 
  'Crafts',
  'Business',
  'Photography'
];

export const mockUserSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'JavaScript Programming',
    category: 'Technology',
    level: 'Expert',
    description: 'Advanced JavaScript including ES6+, React, Node.js, and backend development.'
  },
  {
    id: 'skill-2',
    name: 'Spanish Language',
    category: 'Languages',
    level: 'Intermediate',
    description: 'Conversational Spanish with good grammar and vocabulary.'
  },
  {
    id: 'skill-3',
    name: 'Photography',
    category: 'Photography',
    level: 'Intermediate',
    description: 'Portrait and landscape photography including editing with Lightroom.'
  }
];

export const mockUserLearningSkills: Skill[] = [
  {
    id: 'learn-1',
    name: 'Piano',
    category: 'Music',
    level: 'Beginner',
    description: 'Looking to learn basics of piano playing and music theory.'
  },
  {
    id: 'learn-2',
    name: 'Cooking',
    category: 'Cooking',
    level: 'Beginner',
    description: 'Interested in learning how to cook basic meals and understanding flavor profiles.'
  }
];

export const mockMatches: Match[] = [
  {
    id: 'match-1',
    user: {
      id: 'user-1',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
      location: 'San Francisco',
      rating: 4.8,
      ratingCount: 32
    },
    teachSkill: {
      id: 'skill-piano',
      name: 'Piano',
      category: 'Music',
      level: 'Expert'
    },
    learnSkill: {
      id: 'skill-js',
      name: 'JavaScript',
      category: 'Technology',
      level: 'Beginner'
    },
    conversationId: 'conv-1'
  },
  {
    id: 'match-2',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      location: 'New York',
      rating: 4.9,
      ratingCount: 45
    },
    teachSkill: {
      id: 'skill-cooking',
      name: 'Italian Cooking',
      category: 'Cooking',
      level: 'Expert'
    },
    learnSkill: {
      id: 'skill-photo',
      name: 'Photography',
      category: 'Photography',
      level: 'Intermediate'
    },
    conversationId: 'conv-2'
  },
  {
    id: 'match-3',
    user: {
      id: 'user-3',
      name: 'Sophia Garcia',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      location: 'Chicago',
      rating: 4.7,
      ratingCount: 28
    },
    teachSkill: {
      id: 'skill-spanish',
      name: 'Spanish',
      category: 'Languages',
      level: 'Expert'
    },
    learnSkill: {
      id: 'skill-js',
      name: 'JavaScript',
      category: 'Technology',
      level: 'Beginner'
    }
  },
  {
    id: 'match-4',
    user: {
      id: 'user-4',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      location: 'Los Angeles',
      rating: 4.6,
      ratingCount: 18
    },
    teachSkill: {
      id: 'skill-yoga',
      name: 'Yoga',
      category: 'Fitness',
      level: 'Expert'
    },
    learnSkill: {
      id: 'skill-spanish',
      name: 'Spanish',
      category: 'Languages',
      level: 'Intermediate'
    }
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    user: {
      id: 'user-1',
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
      location: 'San Francisco',
      rating: 4.8,
      ratingCount: 32
    },
    lastMessage: 'I\'d be happy to teach you piano! When are you available for our first session?',
    lastMessageTime: '10:32 AM',
    unread: 2,
    skillExchange: 'Piano ↔ JavaScript'
  },
  {
    id: 'conv-2',
    user: {
      id: 'user-2',
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      location: 'New York',
      rating: 4.9,
      ratingCount: 45
    },
    lastMessage: 'That looks great! I\'m excited to teach you some Italian cooking techniques.',
    lastMessageTime: 'Yesterday',
    unread: 0,
    skillExchange: 'Italian Cooking ↔ Photography'
  },
  {
    id: 'conv-3',
    user: {
      id: 'user-3',
      name: 'Sophia Garcia',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      location: 'Chicago',
      rating: 4.7,
      ratingCount: 28
    },
    lastMessage: 'I\'ve been learning Spanish for years. I can definitely help you practice conversation.',
    lastMessageTime: '2 days ago',
    unread: 0,
    skillExchange: 'Spanish ↔ JavaScript'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    text: 'Hi Emma! I saw that you teach piano and I\'d love to learn. I could help you with JavaScript in return.',
    sender: 'me',
    timestamp: '2023-04-15T10:00:00Z',
    read: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    text: 'Hey there! I\'d be happy to teach you piano! I\'ve been playing for over 15 years. And I could definitely use some help with JavaScript for a project I\'m working on.',
    sender: 'them',
    timestamp: '2023-04-15T10:15:00Z',
    read: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    text: 'That sounds perfect! When are you available for our first session?',
    sender: 'me',
    timestamp: '2023-04-15T10:20:00Z',
    read: true
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    text: 'I\'d be happy to teach you piano! When are you available for our first session?',
    sender: 'them',
    timestamp: '2023-04-15T10:32:00Z',
    read: false
  },
  {
    id: 'msg-5',
    conversationId: 'conv-1',
    text: 'We could do online sessions to start if that works for you?',
    sender: 'them',
    timestamp: '2023-04-15T10:33:00Z',
    read: false
  },
  {
    id: 'msg-6',
    conversationId: 'conv-2',
    text: 'Hi Michael, I\'m interested in learning Italian cooking. I can teach you photography in exchange.',
    sender: 'me',
    timestamp: '2023-04-14T14:00:00Z',
    read: true
  },
  {
    id: 'msg-7',
    conversationId: 'conv-2',
    text: 'Hello! That sounds great. I\'m a chef at an Italian restaurant and would love to improve my photography skills. What kind of dishes are you interested in learning?',
    sender: 'them',
    timestamp: '2023-04-14T14:30:00Z',
    read: true
  },
  {
    id: 'msg-8',
    conversationId: 'conv-2',
    text: 'I\'d love to learn how to make authentic pasta from scratch and maybe some classic sauces. For photography, I can teach you composition and editing techniques.',
    sender: 'me',
    timestamp: '2023-04-14T15:00:00Z',
    read: true
  },
  {
    id: 'msg-9',
    conversationId: 'conv-2',
    text: 'That looks great! I\'m excited to teach you some Italian cooking techniques.',
    sender: 'them',
    timestamp: '2023-04-14T15:45:00Z',
    read: true
  }
];

export const mockUserProfile: UserProfile = {
  id: 'current-user',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  location: 'Seattle, WA',
  rating: 4.9,
  ratingCount: 15,
  skillsTaught: 12,
  skillsLearned: 8,
  bio: 'Software developer by day, musician by night. Passionate about learning new skills and sharing knowledge with others. Always up for a new challenge!',
  memberSince: 'January 2023'
};