import type { IResponse } from "@/commons/types";
import type { ExistsUserResponse, LoginRequest, LoginResponse, SignupRequest } from "@/commons/user";
import api from "@/lib/axios";

const path = 'users/';

const existsUser = async (email: string): Promise<IResponse<ExistsUserResponse>> => {
    return api.get(`${path}/exists`, {email});
};

const login = async (data: LoginRequest): Promise<IResponse<LoginResponse>> => {
    return api.post(`login`, data);
}

const signup = async (data: SignupRequest): Promise<IResponse<undefined>> => {
    return api.post(path, data);
}
const UserService = {
    existsUser,
    login,
    signup
};

export default UserService;