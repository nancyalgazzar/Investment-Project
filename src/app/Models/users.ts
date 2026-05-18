export type Role = 'Admin'|'User'

export interface Users {

  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verificationId?: string;
  role:Role;
  
}