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

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
