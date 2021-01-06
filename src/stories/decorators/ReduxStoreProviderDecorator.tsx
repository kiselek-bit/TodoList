import {Provider} from "react-redux";
import React from "react";
import {AppRootStateType, store} from "../../app/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {v1} from "uuid";
import {todolistReducer} from "../../features/TodolistsList/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {appReducer} from "../../app/app-reducer";
import {authReducer} from "../../features/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}
    ] ,
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                todoListId: 'todoListId1', addedDate: '', deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: '', entityStatus: "idle"},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todoListId1', addedDate: '', deadline: '', description: '',
                order: 0, priority: TaskPriorities.Low, startDate: '', entityStatus: "idle"},
        ],
        ["todoListId2"]: [
            {id: v1(), title: 'Bread',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todoListId2', entityStatus: "idle"},
            {id: v1(), title: 'Milk',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todoListId2', entityStatus: "idle"},
        ]
    },
    app: {status: "failed", error: null, initialized: false},
    auth: {isLoggedIn: false}
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
