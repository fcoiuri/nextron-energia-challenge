export interface SessionType {
  success?: boolean;
  user?: UserType;
}

export interface UserType {
  created_at: Date;
  email: string;
  exp: number;
  name: string;
  password: string;
  updated_at: Date;
}

export interface LoginType {
  msg: string;
  success: boolean;
  user: UserType;
  token: string;
}

export interface RegisterType {
  msg: string;
  success: boolean;
}
