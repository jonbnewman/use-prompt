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

export const StandardModalPrompt = Template.bind({});
StandardModalPrompt.args = {
  message: 'This is a modal prompt',
  type: 'modal',
  component: 'standard',
};

export const StandardInlinePrompt = Template.bind({});
StandardInlinePrompt.args = {
  message: 'This is an inline prompt',
  type: 'inline',
  component: 'standard',
};

export const MUIPrompt = Template.bind({});
MUIPrompt.args = {
  message: 'This is a modal prompt',
  type: 'modal',
  component: 'mui',
};
