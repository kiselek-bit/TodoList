import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    let[tasks, setTasks] = useState <Array<TaskType>>(
        [
            {id: v1(), title:'HTML&CSS', isDone: true},
            {id: v1(), title:'JS', isDone: true},
            {id: v1(), title:'ReactJS', isDone: false},
            {id: v1(), title:'Redux', isDone: false},
            {id: v1(), title:'RestApi', isDone: false},
        ]
    );

    const [filter, setFilter] = useState <FilterValuesType>('all')
    let tasksForTodoList = tasks
    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    function changeFilter (value: FilterValuesType) {
        setFilter(value)
    }
    function removeTask (taskID: string) {

        const filterTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filterTasks)
    }
    function addTask(title: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;



