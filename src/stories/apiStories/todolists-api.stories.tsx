import React, {useEffect, useState} from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import {todolistsAPI} from "../../api/todolists-api";

export default {
    title: 'TodolistsList/API',
    argTypes: {}
} as Meta;

const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": '433520f3-b807-456c-908f-67604d9c56a7'
    }
}

const Template: Story = (args) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTodoExamples = Template.bind({});
GetTodoExamples.args = {}




const Template1: Story = (args) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist(args.title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodoExamples = Template1.bind({});
CreateTodoExamples.args = {
    title: 'MyTodo'
}


const Template2: Story = (args) => {
    const [state, setState] = useState<any>(null)
    const todoId = '97745da4-814d-4460-be0d-ca6706c34e42'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todoId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodoExamples = Template2.bind({});
DeleteTodoExamples.args = {}


const Template3: Story = (args) => {
    const [state, setState] = useState<any>(null)
    const todoId = 'b282fa0c-7dbc-420e-9262-9caf037e1d05'
    useEffect(() => {
        todolistsAPI.updateTodolist(todoId, args.title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodoExamples = Template3.bind({});
UpdateTodoExamples.args = {
    title: 'HOOK'
}