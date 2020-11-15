import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {act} from "react-dom/test-utils";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    todolistID: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    todolistID: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    todolistID: string
    isDone: boolean
    taskId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistID: string
    title: string
    taskId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id != action.taskId),
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID]: [{id: '4', title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        case "CHANGE-TASK-STATUS":
            let newState = {...state}
            let tasks = [...newState[action.todolistID]]
            let tasksCopy = tasks.map(t => {
                if (t.id === action.taskId) {
                    return {...t, isDone: action.isDone}
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
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error('I don"t understand type')
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todolistID, taskId}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistID}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", isDone, taskId, todolistID}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", title, taskId, todolistID}
}

