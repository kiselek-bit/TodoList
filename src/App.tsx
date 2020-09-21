import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {

    let[tasks, setTasks] = useState <Array<TaskType>>(
        [
            {id:1, title:'HTML&CSS', isDone: true},
            {id:2, title:'JS', isDone: true},
            {id:3, title:'ReactJS', isDone: false},
            {id:4, title:'Redux', isDone: false},
            {id:5, title:'RestApi', isDone: false},
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

    function removeTask (taskID: number) {

        const filterTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filterTasks)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;



