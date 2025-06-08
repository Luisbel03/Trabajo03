export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  bio?: string;
  location?: string;
  birth_date?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<LoginResponse>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
} 