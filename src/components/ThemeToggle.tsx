import React from 'react';
import { Box, Button } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import { useTheme } from '../App';

export const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <Box margin={{ horizontal: 'small' }}>
      <Button 
        icon={mode === 'dark' ? <Sun /> : <Moon />} 
        onClick={toggleTheme}
        a11yTitle={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        tip={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      />
    </Box>
  );
}; 