import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Prompter as PrompterComponent, Props } from './components/Prompter';
import Wrapper from './components/Wrapper';

const meta: Meta = {
  title: 'usePrompt',
  component: PrompterComponent,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => (
  <Wrapper>
    <PrompterComponent {...args} />
  </Wrapper>
);

export const Prompter = Template.bind({});
// Prompter.args = {
//   message: 'This is a modal prompt',
// };
