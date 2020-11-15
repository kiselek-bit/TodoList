import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

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


function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to by', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        delete tasks[tlId]
        setTasks({...tasks})

        let newTodoLists = todoLists.filter(tl => tl.id !== tlId)
        setTodoLists(newTodoLists)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTodolist(title: string) {
        let newTodolist: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])

        tasks[newTodolist.id] = []
        setTasks({...tasks})
    }

    function changeTodolistTitle(newTodolistTitle: string, tlId: string) {
        let todolist = todoLists.find(tl => tl.id === tlId)
        if (todolist) {
            todolist.title = newTodolistTitle
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, tlId: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const todolist = tasks[tlId]
        tasks[tlId] = [newTask, ...todolist]
        setTasks({...tasks})
    }

    function removeTask(taskID: string, tlId: string) {
        let newTasks = tasks[tlId]
        newTasks = newTasks.filter(t => t.id !== taskID)
        tasks[tlId] = newTasks
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, tlId: string) {
        let todolist = tasks[tlId]
        const task = todolist.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(newTaskTitle: string, taskId: string, tlId: string) {
        let todolist = tasks[tlId]
        let task = todolist.find(t => t.id === taskId)
        if (task) {
            task.title = newTaskTitle
            setTasks({...tasks})
        }

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

export default App;



