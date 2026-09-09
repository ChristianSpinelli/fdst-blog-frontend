import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryDark: string;

      secondary: string;
      secondaryHover: string;

      background: string;
      surface: string;
      surfaceAlt: string;

      textPrimary: string;
      textSecondary: string;
      textMuted: string;

      border: string;
      borderLight: string;

      whiteDetail: string;

      danger: string;
      dangerHover: string;
      success: string;
      warning: string;
    };

    fonts: {
      main: string;
      code: string;
    };

    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };

    radii: {
      small: string;
      medium: string;
      large: string;
      circle: string;
    };

    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  }
}