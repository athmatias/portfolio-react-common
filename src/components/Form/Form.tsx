import { ReactNode } from 'react';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';

import { FormConfig, FieldConfig } from '../../types/form.types';
import { renderFormControl } from '../../renderers';

import './Form.scss';

const Form = (props: { children: ReactNode; config: FormConfig }) => {
  const { children, config } = props;
  const { defaultValues, onSubmitFn } = config;
  const methods = useForm({
    mode: 'onChange',
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form className="Form" onSubmit={methods.handleSubmit(onSubmitFn)} style={config?.style}>
        {children}
      </form>
    </FormProvider>
  );
};

const Control = (props: { config: FieldConfig }) => {
  const { config } = props;
  const { control } = useFormContext();
  const {
    controller: {
      name,
      config: { rules },
    },
  } = config;
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => renderFormControl(props, config)}
      rules={rules}
    />
  );
};

export { Form, Control };
