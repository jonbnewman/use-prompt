import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MultiPrompter, Props } from './components/MultiPrompter';
import Wrapper from './components/Wrapper';

const meta: Meta = {
  title: 'usePrompt',
  component: MultiPrompter,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => (
  <Wrapper>
    <MultiPrompter {...args} />
  </Wrapper>
);

export const MultiPrompt = Template.bind({});
// ExamplePrompt.args = {
//   message: 'This is a modal prompt',
// };
