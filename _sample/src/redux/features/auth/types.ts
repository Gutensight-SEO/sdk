export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    status: string;
    message: string | null;
    success: boolean;
    error: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  user: any;
  accessToken: string;
}