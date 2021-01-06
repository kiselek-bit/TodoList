import axios from "axios";
import {CommonResponseType} from "./tasks-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY" : '433520f3-b807-456c-908f-67604d9c56a7'
    }
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId: number}>>('auth/login', data)
    },
    me() {
        return instance.get<CommonResponseType<MeResponseType>>('auth/me')
    },
    logout() {
        return instance.delete<CommonResponseType>('auth/login')
    }
}


//types
type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
type MeResponseType = {
    id: number
    email: string
    login: string
}