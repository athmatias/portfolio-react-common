import * as themeColors from '@mui/material/colors';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

type ThemeColor = keyof typeof themeColors;

type ThemeProps = {
  children: ReactNode;
  primary: ThemeColor;
  secondary: ThemeColor;
};

const getColor: any = (color: ThemeColor) => themeColors[color];

export const ThemeProvider = (props: ThemeProps) => {
  const { children, primary, secondary } = props;
  const theme = createTheme({
    palette: {
      primary: {
        main: getColor(primary)[500],
      },
      secondary: {
        main: getColor(secondary)[500],
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div>{children}</div>
    </MuiThemeProvider>
  );
};
