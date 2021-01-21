import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        dark: string;
        text: string;
      };
      secondary: {
        main: string;
        light: string;
      };
      gray: {
        600: string;
        400: string;
        200: string;
        100: string;
      };
    };
  }
}
