import { Button as MuiButton, ButtonProps } from '@mui/material';

export const Button = (props: ButtonProps) => <MuiButton {...props}>{props.children}</MuiButton>;
