/**
 * Design System Color Tokens
 *
 */

export const colors = {
  'vx-warm-neutral': {
    50: '#F9F7F7',
    100: '#F1EFEF',
    200: '#E7E4E4',
    300: '#D8D4D4',
    400: '#AAA5A5',
    500: '#787474',
    700: '#464343',
  },
  'sl-grey-neutral': {
    300: '#D4D4D8',
    500: '#71717A',
    700: '#3F3F46',
  },
  'sl-color-neutral': {
    0: '#FFFFFF',
  },
  'bw': {
    white: '#FFFFFF',
  },
  'grays': {
    white: '#FFFFFF',
  },
  'annotation-style': {
    pink: '#FF2D55',
    grey: '#8E8E93',
  },
  'orange': {
    default: '#EB6A00',
  },
} as const;

export type ColorToken = typeof colors;
export type ColorCategory = keyof ColorToken;
export type ColorValue = ColorToken[ColorCategory][keyof ColorToken[ColorCategory]];
