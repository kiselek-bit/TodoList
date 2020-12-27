import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolist-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";


let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id != action.taskId),
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)

            }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {type: "REMOVE-TASK", todolistID, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: "UPDATE-TASK", model, todolistId, taskId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    tasksAPI.createTask(title, todolistId)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {...task, ...domainModel})
                .then(res => {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                })
        }
    }
}


//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
