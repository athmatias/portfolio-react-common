import { FieldValues } from 'react-hook-form/dist/types';

export type Option = {
  id: string | number;
  label: string;
};

export type Options = Option[];

export type FormConfig = {
  defaultValues: FieldValues;
  style?: object;
  onSubmitFn: () => void;
};

export type FieldConfig = {
  controller: {
    name: string;
    config: {
      rules?: { required: boolean };
    };
  };
  component: {
    name: string;
    config: {
      multiple?: boolean;
      size?: 'small' | 'medium' | undefined;
      options?: Options;
      label: string;
      className: string;
      errorMessage?: string;
    };
  };
};
