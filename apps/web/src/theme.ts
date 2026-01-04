import { PaletteMode } from '@mui/material'

// Theme design tokens that mirror the Peck or Pass guidelines.
export const colorTokens = {
  base: {
    background: '#0F1115',
    surface: '#181B22',
    border: '#2A2F3A',
    textPrimary: '#F2F3F5',
    textSecondary: '#A1A6B3',
  },
  accent: {
    primary: '#F59E0B',
    primaryHover: '#FBBF24',
    primaryActive: '#D97706',
    secondary: '#F2A93B',
  },
}

// mui theme settings
export const theme = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: colorTokens.accent.primary,
      light: colorTokens.accent.primaryHover,
      dark: colorTokens.accent.primaryActive,
      contrastText: colorTokens.base.textPrimary,
    },
    secondary: {
      main: colorTokens.accent.secondary,
      contrastText: colorTokens.base.background,
    },
    background: {
      default: colorTokens.base.background,
      paper: colorTokens.base.surface,
    },
    text: {
      primary: colorTokens.base.textPrimary,
      secondary: colorTokens.base.textSecondary,
    },
    divider: colorTokens.base.border,
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
    fontSize: 14,
    h1: {
      fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
      fontSize: 44,
      fontWeight: 600,
      letterSpacing: -0.5,
    },
    h2: {
      fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
      fontSize: 36,
      fontWeight: 600,
      letterSpacing: -0.4,
    },
    h3: {
      fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
      fontSize: 28,
      fontWeight: 500,
      letterSpacing: -0.2,
    },
    h4: {
      fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: -0.1,
    },
    h5: {
      fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
      fontSize: 18,
      fontWeight: 500,
    },
    h6: {
      fontFamily: ['Inter', 'SF Pro Text', 'Space Grotesk', 'sans-serif'].join(','),
      fontSize: 16,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: colorTokens.base.textSecondary,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      color: colorTokens.base.textSecondary,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colorTokens.base.background,
          color: colorTokens.base.textPrimary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          fontWeight: 500,
          paddingInline: 20,
        },
        containedPrimary: {
          backgroundColor: colorTokens.accent.primary,
          color: '#000000',
          ':hover': {
            backgroundColor: colorTokens.accent.primaryHover,
          },
          ':active': {
            backgroundColor: colorTokens.accent.primaryActive,
          },
        },
        outlined: {
          borderColor: colorTokens.base.border,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colorTokens.base.surface,
          backgroundImage: 'none',
          borderRadius: 16,
          border: `1px solid ${colorTokens.base.border}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colorTokens.base.surface,
          borderRadius: 16,
          border: `1px solid ${colorTokens.base.border}`,
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderColor: colorTokens.base.border,
          color: colorTokens.base.textSecondary,
        },
        filled: {
          backgroundColor: colorTokens.base.surface,
          borderColor: colorTokens.base.border,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colorTokens.base.border,
        },
      },
    },
  },
}
