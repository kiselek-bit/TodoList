import {CommonResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";

export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))

}


// types
type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>