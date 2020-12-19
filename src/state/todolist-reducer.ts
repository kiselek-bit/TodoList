import {FilterValuesType} from "../AppWithRedux";
import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ActionType = ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType

export type TodolistDomainType = TodolistType & {filter: FilterValuesType}

let initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST" :
            let newTodolist: TodolistDomainType = {
                id: action.todolistId,
                title: action.title,
                addedDate: '',
                order: 1,
                filter: 'all'
            }
            return [newTodolist, ...state];
        case "CHANGE-TODOLIST-TITLE" :
            let copyTodolists = [...state]
            let todolist = copyTodolists.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...copyTodolists];
        case "CHANGE-TODOLIST-FILTER" :{
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state
    }
}

export const removeTodoListAC = (todolistID: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistID} as const
}
export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", title: title , todolistId: v1()} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter} as const
}
