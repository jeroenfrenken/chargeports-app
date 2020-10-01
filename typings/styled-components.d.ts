import { defaultTheme } from '../src/ui/theme/DefaultTheme';

type ThemeInterface = typeof defaultTheme

declare module "styled-components" {
    interface DefaultTheme extends ThemeInterface {}
}
