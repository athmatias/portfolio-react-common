import {
  ControllerFieldState,
  FieldValues,
  UseFormStateReturn,
  ControllerRenderProps,
} from 'react-hook-form';

import { Autocomplete } from '../components/Autocomplete';
import { FieldConfig } from '../types/form.types';

type Render = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};

export const renderFormControl = (props: Render, config: FieldConfig) => {
  const { field, fieldState } = props;
  const {
    component: {
      name,
      config: { options, label, size, multiple, className, errorMessage },
    },
  } = config;

  const { invalid, error } = fieldState;

  if (name === 'autocomplete') {
    return (
      <div className="form-control">
        <Autocomplete
          className={`${className} ${invalid && 'Mui-error'}`}
          options={options || []}
          label={label}
          onChange={(event, data) => field.onChange(data)}
          value={field.value}
          size={size}
          multiple={multiple}
        />
        {error && <div className="Mui-error">{errorMessage}</div>}
      </div>
    );
  }
  return <div>{name}</div>;
};
