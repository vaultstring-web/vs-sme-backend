// src/models/user.ts
export interface User {
  id: string;
  email: string;
  password: string;           // hashed
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role: 'applicant' | 'admin' | 'staff';
  createdAt: Date;
  updatedAt: Date;
}