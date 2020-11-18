import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistType} from "./AppWithReduxs";

type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodolist: (tlId: string) => void
    addTask: (title: string, tlId: string) => void
    removeTask: (tlId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTaskStatus: (id: string, isDone: boolean, tlId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, tlId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, tlId: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed')

    const addTask = (taskTitle: string) => {
        props.addTask(taskTitle, props.id)
    }
    const changeTodolistTitle = (newTodolistTitle: string) => {
        props.changeTodolistTitle(newTodolistTitle, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton color={'secondary'} onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map((task) => {

                        const onRemoveTaskHandler = () => props.removeTask(task.id, props.id)
                        const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.target.checked, props.id)
                        }
                        const changeTitleTask = (newTaskTitle: string) => {
                            props.changeTaskTitle(newTaskTitle, task.id, props.id)
                        }

                        return (
                            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox checked={task.isDone}
                                          color={'primary'}
                                          onChange={changeChecked}/>
                                <EditableSpan title={task.title} changeTitle={changeTitleTask}/>
                                <IconButton onClick={onRemoveTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button onClick={onAllClickHandler}
                        style={{margin:'4px'}}
                        size={'small'}
                        variant={props.filter === 'all' ? 'outlined' : 'text'}>All
                </Button>
                <Button onClick={onActiveClickHandler}
                        style={{margin:'4px'}}
                        size={'small'}
                        variant={props.filter === 'active' ? 'outlined' : 'text'}
                        color={'secondary'}>Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        style={{margin:'4px'}}
                        color={'primary'}
                        size={'small'}
                        variant={props.filter === 'completed' ? 'outlined' : 'text'}>Completed
                </Button>
            </div>
        </div>
    )
}