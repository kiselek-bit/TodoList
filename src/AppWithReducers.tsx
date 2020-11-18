import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    let [todoLists, dispatchToTodolist] = useReducer(todolistReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to by', filter: 'all'}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RestApi', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: false},
        ]
    })

    function removeTodoList(tlId: string) {
        let action = RemoveTodoListAC(tlId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatchToTodolist(ChangeTodoListFilterAC(todoListId, value))
    }

    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(tlId: string, newTodolistTitle: string) {
        dispatchToTodolist(ChangeTodoListTitleAC(tlId, newTodolistTitle))
    }

    function addTask(title: string, tlId: string) {
        dispatchToTasks(addTaskAC(title, tlId))
    }

    function removeTask(taskID: string, tlId: string) {
        dispatchToTasks(removeTaskAC(taskID, tlId))
    }

    function changeTaskStatus(id: string, isDone: boolean, tlId: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, tlId))
    }

    function changeTaskTitle(newTaskTitle: string, taskId: string, tlId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, newTaskTitle, tlId))
    }



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
                            let tasksForTodoList = tasks[tl.id]
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding:'10px'}} elevation={5}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            addTask={addTask}
                                            filter={tl.filter}
                                            removeTask={removeTask}
                                            tasks={tasksForTodoList}
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

export default AppWithReducers;



