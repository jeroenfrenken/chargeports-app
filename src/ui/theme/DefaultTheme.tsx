import * as React from 'react';
import { ThemeProvider } from 'styled-components/native';

export const defaultTheme = {
    colors: {
        primary: '#86d29f',
        secondary: '#2b3247',
        white: '#FFFFFF'
    },
    fonts: [ 'Roboto', 'sans-serif' ],
    fontSizes: {
        small: '14px',
        buttonTextSize: '14px',
        medium: '36px',
        large: '64px'
    }
};

export default ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
);
