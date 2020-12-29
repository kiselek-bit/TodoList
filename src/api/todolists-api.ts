import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '433520f3-b807-456c-908f-67604d9c56a7'
    }
})


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistID}`, {title})
    }
}

// types
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type CommonResponseType<T = {}> = {
    data: T
    messages: Array<string>,
    fieldsErrors: Array<string>,
    resultCode: number
}