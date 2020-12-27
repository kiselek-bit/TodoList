import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodolistsList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: "AddItemFormExample clicked"
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('AddItemFormExample Clicked'),
}
