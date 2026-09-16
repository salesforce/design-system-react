/**
 * Theme and styling type definitions
 *
 * These types support the theming system including dark mode and SLDS versions.
 */

/**
 * SLDS version identifiers
 */
export type SLDSVersion = 'slds1' | 'slds2';

/**
 * Color mode for theming
 */
export type ColorMode = 'light' | 'dark' | 'system';

/**
 * Theme configuration object
 */
export interface ThemeConfig {
  /** Current SLDS version */
  sldsVersion: SLDSVersion;
  /** Current color mode */
  colorMode: ColorMode;
  /** Whether to use high contrast mode */
  highContrast?: boolean;
  /** Custom CSS variable overrides */
  customProperties?: Record<string, string>;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme configuration */
  theme: ThemeConfig;
  /** Update the theme */
  setTheme: (theme: Partial<ThemeConfig>) => void;
  /** Toggle between light and dark mode */
  toggleColorMode: () => void;
  /** Set specific color mode */
  setColorMode: (mode: ColorMode) => void;
  /** Set SLDS version */
  setSLDSVersion: (version: SLDSVersion) => void;
  /** Resolved color mode (system resolved to actual) */
  resolvedColorMode: 'light' | 'dark';
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  /** Initial theme configuration */
  defaultTheme?: Partial<ThemeConfig>;
  /** Storage key for persisting theme */
  storageKey?: string;
  /** Whether to persist theme to storage */
  persist?: boolean;
  /** Children components */
  children: React.ReactNode;
}

/**
 * SLDS Design Token categories
 */
export interface SLDSTokens {
  /** Color tokens */
  color: {
    background: Record<string, string>;
    border: Record<string, string>;
    text: Record<string, string>;
    brand: Record<string, string>;
    error: Record<string, string>;
    warning: Record<string, string>;
    success: Record<string, string>;
  };
  /** Spacing tokens */
  spacing: Record<string, string>;
  /** Font tokens */
  font: {
    family: Record<string, string>;
    size: Record<string, string>;
    weight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  /** Shadow tokens */
  shadow: Record<string, string>;
  /** Border radius tokens */
  radius: Record<string, string>;
  /** Sizing tokens */
  sizing: Record<string, string>;
}

/**
 * Styling hook types for component customization
 */
export interface StylingHooks {
  /** CSS custom properties to apply */
  cssProperties?: Record<string, string>;
  /** CSS class names to apply */
  classNames?: string[];
  /** Inline styles to apply */
  styles?: React.CSSProperties;
}

/**
 * Component-level styling configuration
 */
export interface ComponentStyling {
  /** Root element styling hooks */
  root?: StylingHooks;
  /** Label element styling hooks */
  label?: StylingHooks;
  /** Icon element styling hooks */
  icon?: StylingHooks;
  /** Container element styling hooks */
  container?: StylingHooks;
}

