import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";

let initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST" :
            return [{...action.todolist, filter: 'all'}, ...state];
        case "CHANGE-TODOLIST-TITLE" :
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}
//action
export const removeTodoListAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", id} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", todolist} as const
}
export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

//thunks
export const fetchTodolistTC = () => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodoListTitleAC(todolistId, title))
        })
}

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionType =
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

