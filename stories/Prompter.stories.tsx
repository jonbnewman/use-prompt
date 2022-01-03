import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Prompter, Props } from './components/Prompter';
import Wrapper from './components/Wrapper';

const meta: Meta = {
  title: 'usePrompt',
  component: Prompter,
  argTypes: {
    component: {
      control: {
        type: null,
      },
    },
    type: {
      control: {
        type: null,
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

export const ExamplePrompt = Template.bind({});
// ExamplePrompt.args = {
//   message: 'This is a modal prompt',
// };
