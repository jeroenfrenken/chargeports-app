import * as React from 'react';
import { ThemeProvider } from 'styled-components/native';

export const defaultTheme = {
    colors: {
        primary: '#97d0a3',
        secondary: '#2b3247',
        white: '#FFFFFF',
        black: '#000000',
    },
    fonts: [ 'Roboto', 'sans-serif' ],
    fontSizes: {
        small: '14px',
        buttonTextSize: '19px',
        medium: '36px',
        large: '64px'
    }
};

export default ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
