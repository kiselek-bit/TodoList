import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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


export const Todolist = React.memo((props: PropsType) => {

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'all')
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'active')
    },[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed')
    },[props.changeFilter, props.id])

    const addTask = useCallback((taskTitle: string) => {
        props.addTask(taskTitle, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((newTodolistTitle: string) => {
        props.changeTodolistTitle(newTodolistTitle, props.id)
    },[props.changeTodolistTitle, props.id])

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
                    tasksForTodoList.map((task) => {

                        return (
                            <Task task={task}
                                  key={task.id}
                                  todolistId={props.id}
                                  changeTaskStatus={props.changeTaskStatus}
                                  removeTask={props.removeTask}
                                  changeTaskTitle={props.changeTaskTitle}/>
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
})


