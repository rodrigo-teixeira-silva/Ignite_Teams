import 'style-components';
import theme from '../theme';
import { type } from 'os';

declare module 'styled-components'{

    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType  {}
}