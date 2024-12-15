export type InitThemeOptions = {
  dark?: ThemeOptions;
  light?: ThemeOptions;
  theme?: "dark" | "light";
};

export type ThemeOptions = {
  themeConfig?: ThemeConfig;
  highlightConfig?: HighlightConfig;
};

export type ThemeConfig = {
  fontFamily?: string;
  color?: string;
  background?: string;
  codeBackground?: string;
  codeColor?: string;
  codeButtonColor?: string;
  codeButtonBackground?: string;
  horizontalColor?: string;
  linkColor?: string;
  blockquoteColor?: string;
  mentionColor?: string;
};

export type HighlightConfig = {
  keyword?: string;
  variable?: string;
  function?: string;
  string?: string;
  constant?: string;
  type?: string;
  class?: string;
  number?: string;
  comment?: string;
  heading?: string;
  invalid?: string;
  regexp?: string;
};