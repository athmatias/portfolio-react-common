import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './';

export default {
  title: 'Portfolio/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
    docs: { inlineStories: false },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div style={{ padding: '20px' }}>
    <Button {...args}>Button</Button>
  </div>
);

export const TextButton = Template.bind({});
TextButton.args = {
  variant: 'text',
};

export const ContainedButton = Template.bind({});
ContainedButton.args = {
  variant: 'contained',
};

export const OutlinedContainedButton = Template.bind({});
OutlinedContainedButton.args = {
  variant: 'outlined',
};

export const disabledButton = Template.bind({});
disabledButton.args = {
  disabled: true,
};

export const smallContainedSuccessButton = Template.bind({});
smallContainedSuccessButton.args = {
  color: 'success',
  variant: 'contained',
  size: 'small',
};

export const clickEventButton = Template.bind({});
clickEventButton.args = {
  onClick: () => alert('clicked'),
};
