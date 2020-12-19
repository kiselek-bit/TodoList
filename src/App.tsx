import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {TodolistDomainType} from "./state/todolist-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todoListId2, title: 'What to by', filter: 'all', order: 2, addedDate: ''}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.Completed, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId1},
            {id: v1(), title: 'JS',
                status: TaskStatuses.Completed, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId1},
            {id: v1(), title: 'ReactJS',
                status: TaskStatuses.New, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId1},
            {id: v1(), title: 'Redux',
                status: TaskStatuses.New, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId1},
            {id: v1(), title: 'RestApi',
                status: TaskStatuses.New, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId1},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Bread',
                status: TaskStatuses.Completed, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId2},
            {id: v1(), title: 'Milk',
                status: TaskStatuses.Completed, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId2},
            {id: v1(), title: 'Book',
                status: TaskStatuses.New, description: null,
                addedDate: '', deadline: null, order: 1, priority: 0,
                startDate: null, todoListId: todoListId2},
        ]
    })

    function removeTodoList(tlId: string) {
        delete tasks[tlId]
        setTasks({...tasks})

        let newTodoLists = todoLists.filter(tl => tl.id !== tlId)
        setTodoLists(newTodoLists)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function addTodolist(title: string) {
        let newTodolist: TodolistDomainType = {id: v1(), title: title, filter: 'all', order: 0, addedDate: ''}
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
        const newTask: TaskType = {id: v1(), title: title, status: TaskStatuses.New,
            addedDate: '', deadline: null, description: null,
            order: 0, priority: 0, startDate: null, todoListId: tlId}
        const todolist = tasks[tlId]
        tasks[tlId] = [newTask, ...todolist]
        setTasks({...tasks})
    }

    function removeTask(tlId: string, taskID: string) {
        let newTasks = tasks[tlId]
        newTasks = newTasks.filter(t => t.id !== taskID)
        tasks[tlId] = newTasks
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, status: TaskStatuses, tlId: string) {
        let todolist = tasks[tlId]
        const task = todolist.find(t => t.id === id)
        if (task) {
            task.status = status ? TaskStatuses.Completed : TaskStatuses.New
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

export default App;



