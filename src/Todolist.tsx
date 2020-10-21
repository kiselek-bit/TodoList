import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTodolistTitle: (newTodolistTitle: string, tlId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, tlId: string) => void
}


export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

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
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
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
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeChecked}/>
                                <EditableSpan title={task.title} changeTitle={changeTitleTask}/>
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