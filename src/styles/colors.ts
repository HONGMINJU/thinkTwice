export const colors = {
  // Primary backgrounds
  background: {
    primary: '#FAFAFA',
    secondary: '#F5F5F0',
    card: '#FFFFFF',
  },

  // Text colors
  text: {
    primary: '#2D2D2D',
    secondary: '#6B6B6B',
    tertiary: '#9B9B9B',
    inverse: '#FFFFFF',
  },

  // Accent colors
  accent: {
    primary: '#2A6B6B',
    secondary: '#E07B6B',
    tertiary: '#7B9E87',
  },

  // UI elements
  border: {
    light: '#E5E5E5',
    medium: '#D0D0D0',
  },

  // Semantic colors
  semantic: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },

  // Value spectrum colors
  spectrum: {
    left: '#5B8DEE',
    right: '#EE8B5B',
    neutral: '#9B9B9B',
  },

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type Colors = typeof colors;
