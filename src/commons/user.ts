export interface ExistsUserResponse {
    exists: boolean;
}

export interface LoginResponse {
    token: string;
    user: UserResponse;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface UserResponse {
    email: string;
    name: string;
}

export interface SignupRequest {
    email: string;
    name: string;
    password: string;
}