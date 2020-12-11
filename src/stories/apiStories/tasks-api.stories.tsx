import React, {useEffect, useState} from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {tasksAPI} from "../../api/tasks-api";

export default {
    title: 'Tasks/API',
    argTypes: {}
} as Meta;

const todolistId = 'e6bca789-78fc-43bd-99c7-700962098c76'

const Template: Story = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasksExamples = Template.bind({});
GetTasksExamples.args = {}



const Template1: Story = (args) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask(todolistId, args.title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasksExamples = Template1.bind({});
CreateTasksExamples.args = {
    title: 'Learn'
}

const Template2: Story = () => {
    const [state, setState] = useState<any>(null)
    const taskId = '138e35f6-aebe-4df9-992f-4fa9ec7e0022'
    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasksExamples = Template2.bind({});
DeleteTasksExamples.args = {}



const Template3: Story = () => {
    const [state, setState] = useState<any>(null)
    const taskId = 'eadaf3ad-246a-48f7-8af5-7a257ec0939f'
    const task = {
        id: "eadaf3ad-246a-48f7-8af5-7a257ec0939f",
        title: "BlaBla",
        description: null,
        todoListId: "e6bca789-78fc-43bd-99c7-700962098c76",
        order: -3,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2020-12-11T17:42:28.943"
    }
    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, task)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTasksExamples = Template3.bind({});
UpdateTasksExamples.args = {}
