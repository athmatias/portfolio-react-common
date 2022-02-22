import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Autocomplete } from './';

export default {
  title: 'Portfolio/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'fullscreen',
    docs: { inlineStories: false },
  },
} as ComponentMeta<typeof Autocomplete>;

const OPTIONS = Array.from(new Array(501)).map(() => ({
  id: Math.random(),
  label: `Option-${Math.random()}`,
}));

const Template: ComponentStory<typeof Autocomplete> = (args) => (
  <div style={{ padding: '20px' }}>
    <Autocomplete {...args} />
  </div>
);

export const LoadingAutoComplete = Template.bind({});
LoadingAutoComplete.args = {
  options: [],
  label: 'Numbers',
  isLoading: true,
};

export const EmptyAutoComplete = Template.bind({});
EmptyAutoComplete.args = {
  options: [],
  label: 'Numbers',
  isLoading: false,
};

export const SimpleAutoComplete = Template.bind({});
SimpleAutoComplete.args = {
  options: OPTIONS.slice(0, 50),
  label: 'Numbers',
};

export const MultipleAutoComplete = Template.bind({});
MultipleAutoComplete.args = {
  options: OPTIONS.slice(0, 50),
  label: 'Numbers',
  multiple: true,
};

export const MultipleAutoCompleteWithCheckbox = Template.bind({});
MultipleAutoCompleteWithCheckbox.args = {
  options: OPTIONS.slice(0, 50),
  label: 'Numbers',
  multiple: true,
  useCheckbox: true,
};

export const MultipleAutoCompleteManyOptions = Template.bind({});
MultipleAutoCompleteManyOptions.args = {
  options: OPTIONS,
  label: 'Numbers',
  multiple: true,
  useCheckbox: true, // component will always set this false to improve performance on big option array
};
