import { AppError } from '../utils/AppError';

interface User {
  id: string;
  role: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  preferredLanguage?: string;
  updatedAt: Date;
  // add more later
}

const mockUsers: Record<string, User> = {
  'user-123': {
    id: 'user-123',
    role: 'user',
    displayName: 'Felix Baghaya',
    avatarUrl: 'https://example.com/avatar/felix.jpg',
    bio: 'building from Lilongwe',
    phone: '+265999123456',
    preferredLanguage: 'en',
    updatedAt: new Date(),
  },
};

export const userService = {
  findById: async (id: string): Promise<User | null> => {
    const user = mockUsers[id];
    if (!user) return null;
    return { ...user };
  },

  updatePartial: async (id: string, updates: Partial<Omit<User, 'id' | 'role' | 'updatedAt'>>): Promise<User> => {
    const user = mockUsers[id];
    if (!user) throw new AppError('User not found', 404);

    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };

    mockUsers[id] = updated;
    return updated;
  },
};