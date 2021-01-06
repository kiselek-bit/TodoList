import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodoListFilterAC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "./todolist-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import { Redirect } from "react-router-dom";

export const TodolistsList: React.FC = (props) => {


    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistTC())
    }, [])


    const removeTodoList = useCallback((tlId: string) => {
        dispatch(removeTodolistTC(tlId))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const changeTodolistTitle = useCallback((tlId: string, newTodolistTitle: string) => {
        dispatch(updateTodolistTC(tlId, newTodolistTitle))
    }, [dispatch])

    const addTask = useCallback((title: string, tlId: string) => {
        dispatch(addTaskTC(title, tlId))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, tlId: string) => {
        dispatch(removeTaskTC(taskID, tlId))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, tlId: string) => {
        dispatch(updateTaskTC(id, {status: status}, tlId))
    }, [dispatch])

    const changeTaskTitle = useCallback((newTaskTitle: string, taskId: string, tlId: string) => {
        dispatch(updateTaskTC(taskId, {title: newTaskTitle}, tlId))
    }, [dispatch])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map(tl => {


                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={5}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        entityStatus={tl.entityStatus}
                                        removeTodolist={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </ Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}