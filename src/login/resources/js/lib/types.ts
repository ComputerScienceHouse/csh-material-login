export type ThemeBackground = {
  color?: string;
  image?: string;
  size?: string;
  repeat?: string;
};

export type Theme = {
  id: string;
  name: string;
  authorUsername: string;
  authorName: string;
  dark: boolean;
  logo: string;
  stylesheets: string[];
  background?: ThemeBackground;
  backgroundUrl?: string;
};
