import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolist-reducer";
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorType,
    setAppStatusAC,
    SetAppStatusType
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


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
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
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
            debugger
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, entityStatus: 'idle'}))}
        case "CHANGE-TASK-ENTITY-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.status} : t)}
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
export const changeTaskEntityStatus = (taskId: string, todolistId: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TASK-ENTITY-STATUS', status, todolistId, taskId} as const
}

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then(res => {
            debugger
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            debugger
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatus(taskId, todolistId, 'loading'))
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTaskEntityStatus(taskId, todolistId, 'failed'))
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatus(taskId, todolistId, 'failed'))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(title, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            dispatch(setAppStatusAC('loading'))
            dispatch(changeTaskEntityStatus(taskId, todolistId, 'loading'))
            tasksAPI.updateTask(todolistId, taskId, {...task, ...domainModel})
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, domainModel, todolistId))
                        dispatch(setAppStatusAC('succeeded'))
                        dispatch(changeTaskEntityStatus(taskId, todolistId, 'succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatus(taskId, todolistId, 'idle'))
                    }
                })
                .catch(error => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeTaskEntityStatus(taskId, todolistId, 'idle'))
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
export type ChangeTaskEntityStatusActionType = ReturnType<typeof changeTaskEntityStatus>
export type TaskDomainType =  TaskType & {entityStatus: RequestStatusType}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetAppStatusType
    | SetAppErrorType
    | ChangeTaskEntityStatusActionType
