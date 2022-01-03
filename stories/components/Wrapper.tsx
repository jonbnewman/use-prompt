import React from 'react';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const theme = createTheme();

export function Wrapper({ children }: { children: any }) {
  return (
    <StyledEngineProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </MaterialThemeProvider>
    </StyledEngineProvider>
  );
}

export default Wrapper;
