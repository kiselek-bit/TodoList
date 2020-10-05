import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean
}

export function Todolist(props: PropsType) {

    let [taskTitle, setTaskTitle] = useState<string>('')
    let [error, setError] = useState<null | string>(null)

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    const addTask = () => {
        if (taskTitle.trim() === '') {
            setError("Title is required")
            setTaskTitle('')
            return
        }
        props.addTask(taskTitle.trim())
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

    return (
        <div>
            <h3>{props.title}</h3>
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

                        const onRemoveTaskHandler = () => props.removeTask(task.id)
                        const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.target.checked)
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