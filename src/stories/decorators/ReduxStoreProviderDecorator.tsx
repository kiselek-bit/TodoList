import {Provider} from "react-redux";
import React from "react";
import {AppRootStateType, store} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {todolistReducer} from "../../state/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todoListId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todoListId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                todoListId: 'todoListId1', addedDate: '', deadline: null, description: null,
                order: 0, priority: TaskPriorities.Low, startDate: null},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,
                todoListId: 'todoListId1', addedDate: '', deadline: null, description: null,
                order: 0, priority: TaskPriorities.Low, startDate: null},
        ],
        ["todoListId2"]: [
            {id: v1(), title: 'Bread',
                status: TaskStatuses.Completed, description: null,
                addedDate: '', deadline: null, order: 1, priority: TaskPriorities.Low,
                startDate: null, todoListId: 'todoListId2'},
            {id: v1(), title: 'Milk',
                status: TaskStatuses.Completed, description: null,
                addedDate: '', deadline: null, order: 1, priority: TaskPriorities.Low,
                startDate: null, todoListId: 'todoListId2'},
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
