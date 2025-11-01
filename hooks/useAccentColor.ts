import { useTheme } from '@/contexts/ThemeContext';

export const useAccentColor = () => {
  const { accentColor } = useTheme();
  
  return {
    accentColor,
    accentStyle: { color: accentColor },
    accentBgStyle: { backgroundColor: accentColor },
    accentBorderStyle: { borderColor: accentColor },
    accentHoverStyle: { '--accent-hover': accentColor } as React.CSSProperties,
  };
};

