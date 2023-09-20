import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React from 'react'
import { purpleTheme } from './purpleTheme'

const AppTheme = ({children}) => {
    return (
        <div>
            <ThemeProvider theme={purpleTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </div>
    )
}

export default AppTheme
