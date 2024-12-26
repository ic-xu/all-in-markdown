export interface ThemeDefinition {
  id: string;
  name: string;
  icon: React.ComponentType;
  styles: {
    background: {
      primary: string;
      secondary: string;
      hover: string;
    };
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    border: {
      primary: string;
      secondary: string;
    };
  };
}

export interface ThemeContextType {
  currentTheme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  getThemeClass: (type: keyof ThemeDefinition['styles'], variant: string) => string;
}