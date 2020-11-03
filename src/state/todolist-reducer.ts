import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}

type ActionType = ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | AddTodolistActionType |RemoveTodolistActionType


export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST" :
            let newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'}
            return [...state, newTodolist];
        case "CHANGE-TODOLIST-TITLE" :
            let copyTodolists = [...state]
            let todolist = copyTodolists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...copyTodolists];
        case "CHANGE-TODOLIST-FILTER" :
            let copyTodolist = [...state]
            const todoList = copyTodolist.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return {...copyTodolist};
        default:
            throw new Error('I don"t understand type')
    }
}

export const RemoveTodoListAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}
export const AddTodolistAC = (title: string):AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodoListTitleAC = (id: string, title: string):ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType):ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}
