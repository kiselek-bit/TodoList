import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {handleServerAppError} from "../utils/error-utils";
import {setIsLoggedInAC, SetIsLoginActionType} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: "idle",
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED-APP":
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED-APP', initialized} as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch<ActionType>) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            }
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

type ActionType = SetAppStatusType | SetAppErrorType | SetIsLoginActionType | SetAppInitializedActionType