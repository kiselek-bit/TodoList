import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../../trash/App';
import {addTodolistAC, removeTodoListAC, RemoveTodolistActionType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

let startState: TasksStateType
let todolistId1: string
let todolistId2: string

beforeEach(() => {
    todolistId1 = "todolistId1"
    todolistId2 = "todolistId2"

    startState = {
        "todolistId1": [
            {id: '1', title: 'CSS',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId1'},
            {id: '2', title: 'JS',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId1'},
            {id: '3', title: 'React',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId1'}
        ],
        "todolistId2": [
            {id: '1', title: 'bread',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId2'},
            {id: '2', title: 'milk',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId2'},
            {id: '3', title: 'tea',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId2'}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: '1', title: 'CSS',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId1'},
            {id: '2', title: 'JS',
                status: TaskStatuses.Completed, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId1'},
            {id: '3', title: 'React',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId1'}
        ],
        "todolistId2": [
            {id: '1', title: 'bread',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId2'},
            {id: '3', title: 'tea',
                status: TaskStatuses.New, description: '',
                addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
                startDate: '', todoListId: 'todolistId2'}
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({id: '4', title: 'juce',
        status: TaskStatuses.New, description: '',
        addedDate: '', deadline: '', order: 1, priority: TaskPriorities.Low,
        startDate: '', todoListId: 'todolistId2'});


    const endState = tasksReducer(startState, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: 'book'}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('book');
    expect(endState["todolistId1"][1].title).toBe('JS');
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        "id": "Todolist3",
        "title": "important",
        "addedDate": "2019-07-30T12:23:49.677",
        "order": 0
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action: RemoveTodolistActionType = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

