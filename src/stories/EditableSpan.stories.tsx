import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argsTypes: {
        onChange: {
            description: 'callback',
        },
        value: {
            description: 'value to editable span',
            defaultValue: 'JS',
        },
    },
    args: {
        value: 'CSS',
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});

EditableSpanStory.args = {
    // value: 'HTML',
    onChange: action('value EditableSpan changed')
};