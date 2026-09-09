import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#ED145B',
    primaryHover: '#C40E48',
    primaryDark: '#880831',

    secondary: '#121214',
    secondaryHover: '#1C1C21',

    background: '#09090B',
    surface: '#18181B',
    surfaceAlt: '#27272A',

    textPrimary: '#FFFFFF',
    textSecondary: '#FFFFFF',
    textMuted: '#A1A1AA',

    border: '#27272A',
    borderLight: '#3F3F46',

    whiteDetail: '#FFFFFF',

    danger: '#EF4444',
    dangerHover: '#DC2626',
    success: '#10B981',
    warning: '#F59E0B',
  },

  fonts: {
    main: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    code: "'Fira Code', monospace",
  },

  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
  },

  radii: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%',
  },

  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.4)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.6), 0 0 12px rgba(237, 20, 91, 0.08)',
    large: '0 10px 20px rgba(0, 0, 0, 0.8), 0 0 20px rgba(237, 20, 91, 0.15)',
  },
};