import {Dispatch} from "redux";
import {authAPI} from "../../api/auth-api";
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "login/SET":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state

    }
}

//actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'login/SET', isLoggedIn} as const)

//thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
type InitialStateType = {
    isLoggedIn: boolean
}
type ActionType =
    SetIsLoginActionType
    | SetAppStatusType
    | SetAppErrorType
export type SetIsLoginActionType = ReturnType<typeof setIsLoggedInAC>