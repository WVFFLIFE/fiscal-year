import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/material';

declare module '@mui/material' {
  interface Theme {
    color: {
      darkBlue: string;
      white: string;
      greyBorder: string;
      greyDark: string;
      modalBackground: string;
      greyLight2: string;
      transparentBlue: string;
      warning: string;
      blue2: string;
    };
    size: {
      sidebarWidth: number;
      calendarWidth: number;
      pickerHeight: number;
    };
  }

  interface ThemeOptions {
    color?: {
      darkBlue?: string;
      white?: string;
      greyBorder?: string;
      greyDark?: string;
      modalBackground?: string;
      greyLight2?: string;
      transparentBlue?: string;
      warning?: string;
      blue2?: string;
    };
    size?: {
      sidebarWidth?: number;
      pickerHeight?: number;
      calendarWidth?: number;
    };
  }
}

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}

const themeInstance = createTheme({
  color: {
    darkBlue: 'rgba(34, 64, 96, 1)',
    white: 'rgba(255, 255, 255, 1)',
    greyBorder: 'rgba(176, 185, 197, 1)',
    greyDark: 'rgba(100, 121, 143, 1)',
    blue2: 'rgba(10, 141, 199, 1)',
    modalBackground: 'rgba(27, 27, 27, 0.1)',
    greyLight2: 'rgba(240, 243, 247, 1)',
    transparentBlue: 'rgba(0, 166, 231, 0.1)',
    warning: 'rgba(165, 16, 16, 1)',
  },
  size: {
    sidebarWidth: 80,
    pickerHeight: 40,
    calendarWidth: 210,
  },
  spacing: 5,
});

export default themeInstance;
export type ThemeInstance = typeof themeInstance;
