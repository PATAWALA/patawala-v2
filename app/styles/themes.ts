// app/styles/themes.ts
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  gradient: {
    from: string;
    to: string;
  };
}

export const lightTheme: ThemeColors = {
  primary: '#3B82F6', // blue-500
  primaryLight: '#60A5FA', // blue-400
  primaryDark: '#2563EB', // blue-600
  secondary: '#06B6D4', // cyan-500
  accent: '#8B5CF6',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  surfaceHover: '#F3F4F6',
  text: '#1F2937',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  borderHover: '#D1D5DB',
  gradient: {
    from: '#3B82F6', // blue-500
    to: '#06B6D4'    // cyan-500
  }
};

export const darkModernTheme: ThemeColors = {
  // Version DARK avec les MÊMES INTENSITÉS que le light
  primary: '#3B82F6',     // blue-500 (comme light)
  primaryLight: '#60A5FA', // blue-400
  primaryDark: '#2563EB',  // blue-600
  secondary: '#06B6D4',    // cyan-500 (comme light)
  accent: '#8B5CF6',
  background: '#0A0F1C',
  surface: '#141B2B',
  surfaceHover: '#1E2638',
  text: '#E5E7EB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  border: '#1F2937',
  borderHover: '#374151',
  gradient: {
    from: '#3B82F6', // blue-500 (comme light)
    to: '#06B6D4'    // cyan-500 (comme light)
  }
};