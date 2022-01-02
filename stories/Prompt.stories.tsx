import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Prompt, Props } from '../src/components/Prompt';
import Wrapper from './Wrapper';

const meta: Meta = {
  title: 'usePrompt',
  component: Prompt,
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
    <Prompt {...args} />
  </Wrapper>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
