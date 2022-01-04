import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  MultiPrompter as MultiPrompterComponent,
  Props,
} from './components/MultiPrompter';
import Wrapper from './components/Wrapper';

const meta: Meta = {
  title: 'usePrompt',
  component: MultiPrompterComponent,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => (
  <Wrapper>
    <MultiPrompterComponent {...args} />
  </Wrapper>
);

export const MultiPrompter = Template.bind({});
// ExamplePrompt.args = {
//   message: 'This is a modal prompt',
// };
