
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";


type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id != action.taskId),
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    addedDate: '',
                    deadline: null,
                    description: null,
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: null,
                    todoListId: action.todolistID },
                    ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            let newState = {...state}
            let tasks = [...newState[action.todolistID]]
            let tasksCopy = tasks.map(t => {
                if (t.id === action.taskId) {
                    return {...t, status: action.status}
                } else {
                    return t
                }
            })
            newState[action.todolistID] = tasksCopy
            return newState
        case "CHANGE-TASK-TITLE": {
            let newState = {...state}
            let tasks = [...newState[action.todolistID]]
            let tasksCopy = tasks.map(t => {
                if (t.id === action.taskId) {
                    return {...t, title: action.title}
                } else {
                    return t
                }
            })
            newState[action.todolistID] = tasksCopy
            return newState
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {type: "REMOVE-TASK", todolistID, taskId} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {type: "ADD-TASK", title, todolistID} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistID: string)=> {
    return {type: "CHANGE-TASK-STATUS", status, taskId, todolistID} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string) => {
    return {type: "CHANGE-TASK-TITLE", title, taskId, todolistID} as const
}

