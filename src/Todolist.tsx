import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodolist: (tlId: string) => void
    addTask: (title: string, tlId: string) => void
    removeTask: (taskId: string, tlId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, tlId: string) => void
}


export function Todolist(props: PropsType) {

    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<null | string>(null)

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const addTask = () => {
        if (taskTitle.trim() === '') {
            setError("Title is required")
            setTaskTitle('')
            return
        }
        props.addTask(taskTitle.trim(), props.id)
        setTaskTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <input onChange={onChangeHandler}
                       value={taskTitle}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={error ? "error-message" : ""}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((task) => {

                        const onRemoveTaskHandler = () => props.removeTask(task.id, props.id)
                        const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.target.checked, props.id)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeChecked}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveTaskHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}
                        className={props.filter === 'all' ? "active-filter" : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? "active-filter" : ''}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? "active-filter" : ''}>Completed
                </button>
            </div>
        </div>
    )
}