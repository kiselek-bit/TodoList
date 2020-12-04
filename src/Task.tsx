import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type PropsTaskType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}
export const Task = React.memo((props: PropsTaskType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }
    const onChangeTaskTitle = (newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId)
    }

    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.task.isDone}
                      color={'primary'}
                      onChange={onChangeStatus}/>
            <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitle}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})