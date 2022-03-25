import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: '111', isDone: true, title: 'JS'},
    todolistId: 'qwe',
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: '1111', isDone: false, title: 'HTML'},
    todolistId: 'qweS',
};
