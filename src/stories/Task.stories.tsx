import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {PropsTaskType, Task} from "../Task";

export default {
    title: 'Todolists/Task',
    component: Task
} as Meta;

const RemoveTaskCallback = action('Remove button inside Task clicked')
const ChangeTaskStatusCallback = action('Status changed inside Task')
const ChangeTaskTitleCallback = action('Title changed inside Task')

const Template: Story<PropsTaskType> = (args) => <Task {...args}/>

const baseArgs = {
    removeTask: RemoveTaskCallback,
    changeTaskStatus: ChangeTaskStatusCallback,
    changeTaskTitle: ChangeTaskTitleCallback,
}


export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    todolistId: 'todolist1',
    task: {id: '1',title: 'HTML', isDone: true}
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    todolistId: 'todolist1',
    task: {id: '2',title: 'CSS', isDone: false}
}