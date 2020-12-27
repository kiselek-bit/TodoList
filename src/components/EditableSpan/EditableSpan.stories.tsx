import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
    title: 'TodolistsList/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            defaultValue: action('Value changed'),
            description: 'Changed value'
        },
        title: {
            defaultValue: 'default value',
            description: 'Стартовое значение'
        }
    }
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>



export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {

}