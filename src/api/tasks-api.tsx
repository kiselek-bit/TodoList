import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY" : '433520f3-b807-456c-908f-67604d9c56a7'
    }
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(title: string, todolistId: string) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, task: any) {
        return instance.put<CommonResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {...task})
    }
}

// types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: number,
    startDate: string,
    deadline: string,
    addedDate: string,

}


type GetResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: null
}
export type CommonResponseType<T = {}> = {
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}