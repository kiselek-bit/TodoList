import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, TodolistDomainType,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {TodolistType} from "./api/todolists-api";

export type FilterValuesType = 'all' | 'active' | 'completed'


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()


    const removeTodoList = useCallback((tlId: string) => {
        let action = removeTodoListAC(tlId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListId, value))
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback((tlId: string, newTodolistTitle: string) => {
        dispatch(changeTodoListTitleAC(tlId, newTodolistTitle))
    },[dispatch])

    const addTask = useCallback((title: string, tlId: string) => {
        dispatch(addTaskAC(title, tlId))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, tlId: string) => {
        dispatch(removeTaskAC(taskID, tlId))
    },[dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, tlId: string) => {
        dispatch(changeTaskStatusAC(id, status, tlId))
    },[dispatch])

    const changeTaskTitle = useCallback((newTaskTitle: string, taskId: string, tlId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTaskTitle, tlId))
    },[dispatch])



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={'menuButton'} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={'title'}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {


                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding:'10px'}} elevation={5}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            addTask={addTask}
                                            filter={tl.filter}
                                            removeTask={removeTask}
                                            tasks={tasks[tl.id]}
                                            changeFilter={changeFilter}
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
            </Container>
        </div>
    );
}

export default AppWithRedux;



