import { getDesignTokens } from './themePrimitives';
import {
  navigationCustomizations
} from './customizations/navigation';

export default function getDashboardTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      ...navigationCustomizations
    },
  };
}