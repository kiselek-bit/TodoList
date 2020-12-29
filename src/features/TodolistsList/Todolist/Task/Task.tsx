import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {TaskDomainType} from "../../tasks-reducer";

export type PropsTaskType = {
    task: TaskDomainType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: PropsTaskType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onChangeTaskTitle = (newTitle: string) => {
        props.changeTaskTitle(newTitle, props.task.id, props.todolistId)
    }

    return (
        <div className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed}
                      disabled={props.task.entityStatus === 'loading'}
                      color={'primary'}
                      onChange={onChangeStatus}/>
            <EditableSpan title={props.task.title} disabled={props.task.entityStatus === 'loading'} changeTitle={onChangeTaskTitle}/>
            <IconButton disabled={props.task.entityStatus === 'loading'} onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})