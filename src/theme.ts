import { deepMerge } from 'grommet/utils';
import { ThemeType } from 'grommet';

// Base theme with common settings
const baseTheme: ThemeType = {
  global: {
    font: {
      family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    focus: {
      border: {
        color: 'brand',
      },
    },
    elevation: {
      light: {
        small: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.1)',
      },
      dark: {
        small: '0px 2px 4px rgba(255, 255, 255, 0.1)',
        medium: '0px 4px 8px rgba(255, 255, 255, 0.1)',
        large: '0px 8px 16px rgba(255, 255, 255, 0.1)',
      },
    },
    animation: {
      duration: '0.3s',
    },
  },
  button: {
    border: {
      radius: '8px',
    },
    padding: {
      vertical: '0.6em',
      horizontal: '1.2em',
    },
    transition: {
      timing: 'ease-in-out',
      // duration: '0.2s',
      duration: 0.2,
    },
  },
  header: {
    // background: 'background',
    // extend: 'margin-bottom: 1rem;',
  },
};

// Light theme specific overrides
const lightThemeOverrides: Partial<ThemeType> = {
  global: {
    colors: {
      background: '#ffffff',
      text: '#333333',
      border: '#dddddd',
      // Markdown specific colors
      'markdown-bg': '#f6f8fa',
      'markdown-text': '#333333',
      'markdown-code-bg': 'rgba(27, 31, 35, 0.05)',
      'markdown-blockquote': '#6a737d',
      'markdown-link': '#0366d6',
      'button-bg': '#f9f9f9',
    },
  },
};

// Dark theme specific overrides
const darkThemeOverrides: Partial<ThemeType> = {
  global: {
    colors: {
      background: '#242424',
      text: '#ffffff',
      border: '#444444',
      // Markdown specific colors
      'markdown-bg': '#2d2d2d',
      'markdown-text': '#e6e6e6',
      'markdown-code-bg': 'rgba(255, 255, 255, 0.1)',
      'markdown-blockquote': '#a0a0a0',
      'markdown-link': '#58a6ff',
      'button-bg': '#1a1a1a',
    },
  },
};

/**
 * Get a complete theme configuration for the specified mode
 * @param mode - 'light' or 'dark'
 * @returns A complete Grommet theme configuration
 */
export const getTheme = (mode: 'light' | 'dark'): ThemeType => {
  const themeOverrides = mode === 'light' ? lightThemeOverrides : darkThemeOverrides;
  return deepMerge(baseTheme, themeOverrides);
};

// For backward compatibility and direct access to themes
export const lightTheme = getTheme('light');
export const darkTheme = getTheme('dark');