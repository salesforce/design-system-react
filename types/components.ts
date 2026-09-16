/**
 * Component-specific type definitions
 *
 * These types are for specific components and extend the common types.
 */

import type { ReactNode, CSSProperties, MouseEvent, FocusEvent, KeyboardEvent } from 'react';
import type {
  AssistiveText,
  BaseComponentProps,
  ButtonVariant,
  ButtonIconVariant,
  ButtonType,
  IconCategory,
  IconSize,
  IconPosition,
  DisableableProps,
  TooltipProps,
  ComponentCallbacks,
  DataAttributes,
  AriaAttributes,
} from './common';

/**
 * Button Component Props
 */
export interface ButtonProps
  extends BaseComponentProps,
    DisableableProps,
    TooltipProps,
    Omit<ComponentCallbacks, 'onClick'>,
    DataAttributes,
    AriaAttributes {
  /** Assistive text for accessibility */
  assistiveText?: Pick<AssistiveText, 'icon'>;
  /** Callback that passes in the DOM reference of the button */
  buttonRef?: (ref: HTMLButtonElement | null) => void;
  /** Associates an icon button with another element on the page */
  hint?: boolean;
  /** Name of the icon category */
  iconCategory?: IconCategory;
  /** CSS classes to be added to icon */
  iconClassName?: string | string[] | Record<string, boolean>;
  /** Name of the icon */
  iconName?: string;
  /** Path to the icon (overrides iconCategory/iconName) */
  iconPath?: string;
  /** Icon position relative to label */
  iconPosition?: IconPosition;
  /** Size of the icon */
  iconSize?: IconSize;
  /** For icon variants */
  iconVariant?: ButtonIconVariant;
  /** If true, button/icon is white for dark backgrounds */
  inverse?: boolean;
  /** Visible label on the button */
  label?: ReactNode;
  /** Triggered when the button is clicked */
  onClick?: (event: MouseEvent<HTMLButtonElement>, data?: { id?: string }) => void;
  /** Triggered to indicate that this component should receive focus */
  onRequestFocus?: () => void;
  /** If true, will trigger onRequestFocus */
  requestFocus?: boolean;
  /** If true, button scales to 100% width on small form factors */
  responsive?: boolean;
  /** Tab index for keyboard navigation */
  tabIndex?: number | string;
  /** HTML title attribute */
  title?: string;
  /** Button type attribute */
  type?: ButtonType;
  /** Different types of buttons */
  variant?: ButtonVariant;
}

/**
 * Icon Component Props
 */
export interface IconProps extends BaseComponentProps {
  /** Assistive text for accessibility */
  assistiveText?: Pick<AssistiveText, 'label'>;
  /** Icon category */
  category?: IconCategory;
  /** Whether the icon is a color swatch */
  colorVariant?: 'default' | 'base' | 'warning' | 'error' | 'light';
  /** Container class name */
  containerClassName?: string;
  /** Container style */
  containerStyle?: CSSProperties;
  /** Inverse colors for dark backgrounds */
  inverse?: boolean;
  /** Name of the icon */
  name?: string;
  /** Direct path to the icon sprite */
  path?: string;
  /** Size of the icon */
  size?: IconSize;
  /** HTML title attribute */
  title?: string;
}

/**
 * IconSettings Context Props
 */
export interface IconSettingsProps {
  /** Path to the icon directory */
  iconPath?: string;
  /** Action sprite path */
  actionSprite?: string;
  /** Custom sprite path */
  customSprite?: string;
  /** Doctype sprite path */
  doctypeSprite?: string;
  /** Standard sprite path */
  standardSprite?: string;
  /** Utility sprite path */
  utilitySprite?: string;
  /** Function to generate icon paths */
  onRequestIconPath?: (
    data: { category: IconCategory; name: string },
    iconPath?: string
  ) => string;
  /** Children components */
  children?: ReactNode;
}

/**
 * Input Component Props
 */
export interface InputProps
  extends BaseComponentProps,
    DisableableProps,
    ComponentCallbacks {
  /** Assistive text for accessibility */
  assistiveText?: Pick<AssistiveText, 'label'>;
  /** Default value for uncontrolled input */
  defaultValue?: string;
  /** Error message */
  errorText?: string;
  /** Fixed text displayed before the input */
  fixedTextLeft?: string;
  /** Fixed text displayed after the input */
  fixedTextRight?: string;
  /** Whether the field has an error */
  hasError?: boolean;
  /** Help text displayed below the input */
  inlineHelpText?: string;
  /** Left icon element */
  iconLeft?: ReactNode;
  /** Right icon element */
  iconRight?: ReactNode;
  /** Input label */
  label?: string;
  /** Maximum length of input */
  maxLength?: number;
  /** Name attribute */
  name?: string;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: { value: string }) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Input type */
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'number';
  /** Controlled value */
  value?: string;
  /** Input variant */
  variant?: 'base' | 'counter';
}

/**
 * Checkbox Component Props
 */
export interface CheckboxProps
  extends BaseComponentProps,
    DisableableProps,
    ComponentCallbacks {
  /** Assistive text for accessibility */
  assistiveText?: Pick<AssistiveText, 'label'>;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Error text to display */
  errorText?: string;
  /** Whether the checkbox is indeterminate */
  indeterminate?: boolean;
  /** Label for the checkbox */
  label?: ReactNode;
  /** Labels for internationalization */
  labels?: {
    label?: string;
    toggleEnabled?: string;
    toggleDisabled?: string;
  };
  /** Name attribute */
  name?: string;
  /** Change handler */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean; indeterminate: boolean }
  ) => void;
  /** Whether the field is required */
  required?: boolean;
  /** Checkbox value */
  value?: string;
  /** Checkbox variant */
  variant?: 'base' | 'toggle' | 'button-group';
}

/**
 * Modal Component Props
 */
export interface ModalProps extends BaseComponentProps {
  /** Align the modal */
  align?: 'top' | 'center';
  /** Aria describedby */
  ariaDescribedby?: string;
  /** Aria labelledby */
  ariaLabelledby?: string;
  /** Assistive text */
  assistiveText?: {
    closeButton?: string;
    dialogLabel?: string;
    dialogLabelledBy?: string;
  };
  /** Content to render in the header */
  children?: ReactNode;
  /** Close button assistant text */
  closeButtonAssistiveText?: string;
  /** Content class name */
  contentClassName?: string;
  /** Content style */
  contentStyle?: CSSProperties;
  /** Whether clicking outside should dismiss */
  dismissOnClickOutside?: boolean;
  /** Footer content */
  footer?: ReactNode | ReactNode[];
  /** Header content */
  header?: ReactNode;
  /** Heading content */
  heading?: ReactNode;
  /** Whether the modal is open */
  isOpen?: boolean;
  /** Close handler */
  onRequestClose?: () => void;
  /** Size of the modal */
  size?: 'small' | 'medium' | 'large';
  /** Tagline below heading */
  tagline?: ReactNode;
  /** Title of the modal */
  title?: ReactNode;
}

