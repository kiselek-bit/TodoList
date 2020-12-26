import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistReducer
} from "./state/todolist-reducer";
import { removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/tasks-api";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    let [todoLists, dispatchToTodolist] = useReducer(todolistReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
            todoListId: todoListId1, addedDate: '', deadline: '', description: '',
            order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,
                todoListId: todoListId1, addedDate: '', deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: 'React', status: TaskStatuses.Completed,
                todoListId: todoListId1, addedDate: '', deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: 'Redux', status: TaskStatuses.Completed,
                todoListId: todoListId1, addedDate: '', deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: ''},
            {id: v1(), title: 'Thunk', status: TaskStatuses.Completed,
                todoListId: todoListId1, addedDate: '', deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: ''},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Bread',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: todoListId2},
            {id: v1(), title: 'Milk',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: todoListId2},
            {id: v1(), title: 'Book',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: todoListId2},
        ]
    })

    function removeTodoList(tlId: string) {
        let action = removeTodoListAC(tlId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatchToTodolist(changeTodoListFilterAC(todoListId, value))
    }

    function addTodolist(title: string) {
        // let action = addTodolistAC(title)
        // dispatchToTodolist(action)
        // dispatchToTasks(action)
    }

    function changeTodolistTitle(tlId: string, newTodolistTitle: string) {
        dispatchToTodolist(changeTodoListTitleAC(tlId, newTodolistTitle))
    }

    function addTask(title: string, tlId: string) {
        // dispatchToTasks(addTaskAC(title, tlId))
    }

    function removeTask(taskID: string, tlId: string) {
        dispatchToTasks(removeTaskAC(taskID, tlId))
    }

    function changeTaskStatus(id: string, status: TaskStatuses, tlId: string) {
        // dispatchToTasks(changeTaskStatusAC(id, status, tlId))
    }

    function changeTaskTitle(newTaskTitle: string, taskId: string, tlId: string) {
        // dispatchToTasks(changeTaskTitleAC(taskId, newTaskTitle, tlId))
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
                                tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.Completed)
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



