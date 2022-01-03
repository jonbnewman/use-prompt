import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Prompter, Props } from './Prompter';
import Wrapper from './Wrapper';

const meta: Meta = {
  title: 'usePrompt',
  component: Prompter,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => (
  <Wrapper>
    <Prompter {...args} />
  </Wrapper>
);

export const ModalPrompt = Template.bind({});
ModalPrompt.args = {
  message: 'This is a modal prompt',
  type: 'modal',
};

export const InlinePrompt = Template.bind({});
InlinePrompt.args = {
  message: 'This is an inline prompt',
  type: 'inline',
};
