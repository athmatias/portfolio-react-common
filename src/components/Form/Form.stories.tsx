import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form, Control } from './';
import { Button } from '../Button';
import { FormConfig, FieldConfig } from '../../types/form.types';

export default {
  title: 'Portfolio/Form',
  component: Form,
  parameters: {
    layout: 'fullscreen',
    docs: { inlineStories: false },
  },
} as ComponentMeta<typeof Form>;

export const SimpleForm: ComponentStory<typeof Form> = () => {
  const formConfig: FormConfig = {
    defaultValues: { controllerOne: [], controllerTwo: { id: 1, label: 'Option 1' } },
    onSubmitFn: () => console.log('teste'),
    style: {
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      columnGap: '10px',
      rowGap: '10px',
    },
  };

  const controlConfigOne: FieldConfig = {
    controller: {
      name: 'controllerOne',
      config: {
        rules: { required: true },
      },
    },
    component: {
      name: 'autocomplete',
      config: {
        className: '',
        multiple: true,
        size: 'small',
        options: [
          { id: 0, label: 'Option 0' },
          { id: 1, label: 'Option 1' },
        ],
        label: 'Form Label One',
        errorMessage: 'AutoComplete One is required',
      },
    },
  };

  const controlConfigTwo: FieldConfig = {
    controller: {
      name: 'controllerTwo',
      config: {},
    },
    component: {
      name: 'autocomplete',
      config: {
        className: '',
        size: 'small',
        options: [
          { id: 0, label: 'Option 0' },
          { id: 1, label: 'Option 1' },
        ],
        label: 'Form Label Two',
      },
    },
  };

  return (
    <Form config={formConfig}>
      <Control config={controlConfigOne} />
      <Control config={controlConfigTwo} />
      <Button type="submit" variant="contained">
        Button
      </Button>
    </Form>
  );
};
