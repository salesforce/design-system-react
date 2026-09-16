/**
 * Common types used across multiple components
 */

import type { ReactNode, CSSProperties, RefObject, HTMLAttributes } from 'react';

/**
 * Standard assistive text object for accessibility
 */
export interface AssistiveText {
  /** Text read by screen readers for icons */
  icon?: string;
  /** Text read by screen readers for labels */
  label?: string;
  /** Text read by screen readers for spinners/loading states */
  loading?: string;
  /** Text read by screen readers for close buttons */
  closeButton?: string;
}

/**
 * Standard labels object for internationalization
 */
export interface Labels {
  /** Label for the component */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Help text */
  help?: string;
  /** Required field indicator */
  required?: string;
}

/**
 * Icon category types matching SLDS icon categories
 */
export type IconCategory =
  | 'action'
  | 'custom'
  | 'doctype'
  | 'standard'
  | 'utility';

/**
 * Common icon size variants
 */
export type IconSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

/**
 * Common component size variants
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Button variant types
 */
export type ButtonVariant =
  | 'base'
  | 'link'
  | 'neutral'
  | 'brand'
  | 'outline-brand'
  | 'destructive'
  | 'success'
  | 'text-destructive'
  | 'icon';

/**
 * Button icon variant types
 */
export type ButtonIconVariant =
  | 'bare'
  | 'container'
  | 'border'
  | 'border-filled'
  | 'brand'
  | 'more'
  | 'global-header';

/**
 * Icon position relative to label
 */
export type IconPosition = 'left' | 'right';

/**
 * Standard HTML button types
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Common callback types
 */
export interface ComponentCallbacks {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Base props that all components share
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  className?: string | string[] | Record<string, boolean>;
  /** Inline styles */
  style?: CSSProperties;
  /** Unique identifier */
  id?: string;
  /** Children elements */
  children?: ReactNode;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Props for components that support ref forwarding
 */
export interface RefForwardingProps<T extends HTMLElement> {
  /** Callback to access the DOM node */
  buttonRef?: (ref: T | null) => void;
}

/**
 * Props for components with tooltip support
 */
export interface TooltipProps {
  /** Tooltip content */
  tooltip?: ReactNode;
}

/**
 * Generic option type for select/dropdown components
 */
export interface SelectOption<T = string> {
  /** Display label */
  label: string;
  /** Option value */
  value: T;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Icon to display */
  icon?: ReactNode;
}

/**
 * Utility type to make specific props required
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Utility type for polymorphic components
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = object,
> = Props & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof Props | 'as'>;

/**
 * Data attribute props for passing custom data attributes
 */
export type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean;
};

/**
 * ARIA attribute props for accessibility
 */
export type AriaAttributes = {
  [key: `aria-${string}`]: string | number | boolean;
};

