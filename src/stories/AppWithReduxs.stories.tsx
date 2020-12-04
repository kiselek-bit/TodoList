import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';
import AppWithRedux from "../AppWithReduxs";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story = (args) => <AppWithRedux/>



export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {

}