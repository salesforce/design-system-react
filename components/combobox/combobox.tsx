/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useRef,
	useCallback,
	useEffect,
	useContext,
	type ReactNode,
	type ReactElement,
} from 'react';

import assign from 'lodash.assign';
import find from 'lodash.find';
import reject from 'lodash.reject';
import { dequal as isEqual } from 'dequal';
import findIndex from 'lodash.findindex';

import classNames from 'classnames';

import Button from '../button';
import Dialog from '../utilities/dialog';
import InnerInput from '../input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Menu, {
	type ComboboxOption,
	type ComboboxItemOption,
	type ComboboxActionOption,
	type ComboboxDeselectOption,
	type MenuRenderMenuItemData,
} from './private/menu';
import Label from '../forms/private/label';
import Popover from '../popover';
import SelectedListBox from '../pill-container/private/selected-listbox';

import FieldLevelHelpTooltip from '../tooltip/private/field-level-help-tooltip';
import KEYS from '../../utilities/key-code';
import KeyBuffer from '../../utilities/key-buffer';
import keyLetterMenuItemSelect from '../../utilities/key-letter-menu-item-select';
import mapKeyEventCallbacks from '../../utilities/key-callbacks';
import menuItemSelectScroll from '../../utilities/menu-item-select-scroll';

import checkProps from './check-props';

import { COMBOBOX } from '../../utilities/constants';
import type { SelectedListBoxOption } from '../pill-container/private/selected-listbox';
import generateId from '../../utilities/generate-id';
import componentDoc from './component.json';
import { IconSettingsContext } from '../icon-settings';
import { useControllableState } from '../../utilities/hooks';

let currentOpenDropdown: { handleClose: () => void } | undefined;
const documentDefined = typeof document !== 'undefined';

// ===== Types =====

export interface ComboboxAssistiveText {
	label?: string;
	loadingMenuItems?: string;
	optionSelectedInMenu?: string;
	popoverLabel?: string;
	removeSingleSelectedOption?: string;
	removePill?: string;
	selectedListboxLabel?: string;
}

export interface ComboboxLabels {
	deselectOption?: string;
	label?: ReactNode | string;
	cancelButton?: string;
	doneButton?: string;
	multipleOptionsSelected?: string;
	noOptionsFound?: ReactNode | string;
	placeholder?: string;
	placeholderReadOnly?: string;
	removePillTitle?: string;
	optionDisabledTooltipLabel?: string;
	inputIconTitle?: string;
}

export interface ComboboxEvents {
	onBlur?: (event: React.FocusEvent) => void;
	onChange?: (
		event: React.ChangeEvent<HTMLInputElement>,
		data: { value: string }
	) => void;
	/**
	 * Fires after the menu has closed (uncontrolled), or when a controlled
	 * `isOpen` changes to `false`. `event` is the event of the close request,
	 * when there was one.
	 */
	onClose?: (
		event: React.SyntheticEvent | undefined,
		data: Record<string, unknown>
	) => void;
	onFocus?: (event: React.FocusEvent, data: Record<string, unknown>) => void;
	/** Fires after the menu has opened and rendered, controlled or not. */
	onOpen?: (
		event: React.SyntheticEvent | undefined,
		data: Record<string, unknown>
	) => void;
	/**
	 * Fires when the user asks to close the menu (Escape, blur, selecting an
	 * option, the popover buttons). With a controlled `isOpen`, set it to
	 * `false` to close.
	 */
	onRequestClose?: (
		event: React.SyntheticEvent,
		data: Record<string, unknown>
	) => void;
	/**
	 * Fires when the user asks to open the menu (typing, clicking the input,
	 * Down, Enter) while it is closed. With a controlled `isOpen`, set it to
	 * `true` to open.
	 */
	onRequestOpen?: (
		event: React.SyntheticEvent | undefined,
		data: Record<string, unknown>
	) => void;
	onRequestRemoveSelectedOption?: (
		event: React.SyntheticEvent,
		data: { selection: ComboboxOption[] }
	) => void;
	/**
	 * Fires with the requested selection when an option is chosen. `selection`
	 * is controlled, so update it to accept the change.
	 */
	onSelect?: (
		event: React.SyntheticEvent,
		data: { selection: ComboboxOption[] }
	) => void;
	/** Fires when an `optionsSearchEntity` or `optionsAddItem` row is chosen by
	 * click or Enter. `value` is the current input text. */
	onSelectActionItem?: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: { option: ComboboxActionItem; value: string }
	) => void;
	onSubmit?: (event: React.KeyboardEvent, data: { value: string }) => void;
}

/**
 * An action row in the menu: `optionsSearchEntity` items render above the
 * options, `optionsAddItem` items below them. Choosing one (click or Enter)
 * calls `events.onSelectActionItem` and closes the menu. Action rows are
 * commands, not records, so they never fire `onSelect` or enter the selection.
 */
export interface ComboboxActionItem {
	id?: string;
	icon?: ReactNode;
	label?: string | ((searchTerm: string) => ReactNode);
	disabled?: boolean;
	/** @deprecated Use `events.onSelectActionItem`. If both are set, both are
	 * called, this one first. */
	onClick?: (
		event: React.MouseEvent | React.KeyboardEvent,
		data: { option: ComboboxActionItem }
	) => void;
}

// A menu row built from a `ComboboxActionItem`. The original item is stored
// under a module-private symbol, so consumer data in `options` (which may come
// from untyped JS and carry arbitrary keys) can't impersonate one.
const ACTION_ITEM = Symbol('actionItem');

type ActionItemRow = ComboboxActionOption & {
	[ACTION_ITEM]: ComboboxActionItem;
};

const isActionItemRow = (option: ComboboxOption): option is ActionItemRow =>
	ACTION_ITEM in option;

const toActionItemRow = (
	item: ComboboxActionItem,
	type: ActionItemRow['type']
): ActionItemRow => ({
	id: item.id || '',
	icon: item.icon,
	label: item.label,
	disabled: item.disabled,
	type,
	[ACTION_ITEM]: item,
});

/**
 * Argument passed to `renderMenuItem`
 */
export interface ComboboxRenderMenuItemData extends MenuRenderMenuItemData {
	/** The combobox's assistive text */
	assistiveText: ComboboxAssistiveText;
}

/**
 * Component accepted by the deprecated `onRenderMenuItem` and `menuItem` props
 */
type ComboboxLegacyMenuItem = React.ComponentType<{
	assistiveText?: ComboboxAssistiveText;
	selected: boolean;
	/** Custom renderers only receive selectable rows */
	option: ComboboxItemOption | ComboboxDeselectOption;
}>;

interface ComboboxBaseProps {
	/** aria-describedby attribute */
	'aria-describedby'?: string;
	/** CSS classes for combobox container */
	className?: string | string[] | Record<string, boolean>;
	/** CSS classes for top level container */
	classNameContainer?: string | string[] | Record<string, boolean>;
	/** CSS classes for dropdown menu */
	classNameMenu?: string | string[] | Record<string, boolean>;
	/** CSS classes for menu sub header */
	classNameMenuSubHeader?: string | string[] | Record<string, boolean>;
	/**
	 * Initial open state when `isOpen` is not set. Ignored when `isOpen` is
	 * set.
	 */
	defaultIsOpen?: boolean;
	/** Whether component is disabled */
	disabled?: boolean;
	/** Entity combobox for grouped comboboxes */
	entityCombobox?: ReactNode;
	/** Error text to display */
	errorText?: string;
	/** Event callbacks */
	events?: ComboboxEvents;
	/** Field level help tooltip */
	fieldLevelHelpTooltip?: ReactNode;
	/** Whether to show deselect option */
	hasDeselect?: boolean;
	/** Whether to show input spinner */
	hasInputSpinner?: boolean;
	/** Whether to show menu spinner */
	hasMenuSpinner?: boolean;
	/** Whether to use static alignment */
	hasStaticAlignment?: boolean;
	/** HTML id */
	id?: string;
	/** Sets dialog width inheritance */
	inheritWidthOf?: 'target' | 'menu' | 'none';
	/** Custom input component */
	input?: ReactElement;
	/** Callback to get input ref */
	inputRef?: (ref: HTMLInputElement | null) => void;
	/**
	 * Whether the menu is open. Leave unset to let the combobox open and close
	 * itself (start state from `defaultIsOpen`). When set, the combobox only
	 * reports open and close requests through `events.onRequestOpen` and
	 * `events.onRequestClose`; update `isOpen` to act on them.
	 */
	isOpen?: boolean;
	/** Text labels */
	labels?: ComboboxLabels;
	/** Menu item visible length */
	menuItemVisibleLength?: 5 | 7 | 10;
	/** Menu max width */
	menuMaxWidth?: string;
	/** Menu position */
	menuPosition?: 'absolute' | 'overflowBoundaryElement' | 'relative';
	/** Whether multiple selection is allowed */
	multiple?: boolean;
	/**
	 * @deprecated Use `renderMenuItem`, which is called as a function with
	 * `{ assistiveText, isSelected, option }`.
	 */
	onRenderMenuItem?: ComboboxLegacyMenuItem;
	/** Action items shown below the options, such as "New Account" */
	optionsAddItem?: ComboboxActionItem[];
	/** Action items shown above the options, such as "Search in Accounts" */
	optionsSearchEntity?: ComboboxActionItem[];
	/** Whether only predefined options are allowed */
	predefinedOptionsOnly?: boolean;
	/** Whether field is required */
	required?: boolean;
	/**
	 * Selected options. Controlled: `events.onSelect` and
	 * `events.onRequestRemoveSelectedOption` report the requested selection;
	 * update `selection` to accept it.
	 */
	selection: ComboboxOption[];
	/** Callback to get selected listbox ref */
	selectedListboxRef?: (ref: HTMLUListElement | null) => void;
	/** Whether single input is disabled */
	singleInputDisabled?: boolean;
	/** Tooltip for disabled menu items */
	tooltipMenuItemDisabled?: ReactElement;
	/**
	 * Text in the input. Controlled: update it from `events.onChange`.
	 * (`defaultValue` was removed in v11.)
	 */
	value?: string;
	/**
	 * Renders each option's content in place of the default label and icon.
	 * Receives `{ assistiveText, isSelected, option }`.
	 */
	renderMenuItem?: (data: ComboboxRenderMenuItemData) => ReactNode;
	/** @deprecated Use `renderMenuItem` instead. */
	menuItem?: ComboboxLegacyMenuItem;
}

/**
 * `variant` decides where the menu content comes from: `options` for the
 * listbox variants, or a custom `popover` dialog.
 */
export type ComboboxVariantProps =
	| {
			/** Listbox variants. Defaults to `base`. */
			variant?: 'base' | 'inline-listbox' | 'readonly';
			/** Assistive text for accessibility */
			assistiveText?: ComboboxAssistiveText;
			/** Menu options */
			options: ComboboxOption[];
			popover?: never;
	  }
	| {
			/** Custom dialog content instead of a listbox */
			variant: 'popover';
			/** Assistive text for accessibility. `popoverLabel` labels the dialog. */
			assistiveText: ComboboxAssistiveText & { popoverLabel: string };
			options?: never;
			/** Popover component rendered as the dialog */
			popover: ReactElement;
	  };

export type ComboboxProps = ComboboxBaseProps & ComboboxVariantProps;

// ===== Default Props =====

const defaultAssistiveText: Required<ComboboxAssistiveText> = {
	label: '',
	loadingMenuItems: 'Loading',
	optionSelectedInMenu: 'Current Selection:',
	popoverLabel: '',
	removeSingleSelectedOption: 'Remove selected option',
	removePill: ', Press delete or backspace to remove',
	selectedListboxLabel: 'Selected Options:',
};

const defaultLabels: Required<ComboboxLabels> = {
	deselectOption: 'None',
	label: '',
	cancelButton: 'Cancel',
	doneButton: 'Done',
	multipleOptionsSelected: '',
	noOptionsFound: 'No matches found.',
	placeholder: '',
	placeholderReadOnly: 'Select an Option',
	removePillTitle: 'Remove',
	optionDisabledTooltipLabel: 'This option is disabled.',
	inputIconTitle: '',
};

const defaultEvents: ComboboxEvents = {};

// ===== Component =====

const Combobox: React.FC<ComboboxProps> = (props) => {
	const {
		assistiveText: assistiveTextProp = {},
		'aria-describedby': ariaDescribedby,
		className,
		classNameContainer,
		classNameMenu,
		classNameMenuSubHeader,
		defaultIsOpen,
		disabled,
		entityCombobox,
		errorText,
		events: eventsProp = {},
		fieldLevelHelpTooltip,
		hasDeselect,
		hasInputSpinner,
		hasMenuSpinner,
		hasStaticAlignment,
		id: idProp,
		inheritWidthOf = 'target',
		input,
		inputRef: inputRefCallback,
		isOpen: isOpenProp,
		labels: labelsProp = {},
		menuItemVisibleLength,
		menuMaxWidth,
		menuPosition = 'absolute',
		multiple,
		onRenderMenuItem,
		options = [],
		optionsAddItem = [],
		optionsSearchEntity = [],
		popover,
		predefinedOptionsOnly,
		required = false,
		selection = [],
		selectedListboxRef: selectedListboxRefCallback,
		singleInputDisabled = false,
		tooltipMenuItemDisabled,
		value,
		variant = 'base',
		renderMenuItem: renderMenuItemProp,
		menuItem,
	} = props;

	// Merge with defaults
	const assistiveText = assign({}, defaultAssistiveText, assistiveTextProp);
	const labels = assign({}, defaultLabels, labelsProp);
	const events = assign({}, defaultEvents, eventsProp);

	// Context
	const iconSettingsContext = useContext(IconSettingsContext);

	// Refs
	const inputRef = useRef<HTMLInputElement | null>(null);
	const menuRef = useRef<HTMLUListElement | null>(null);
	const selectedListboxRef = useRef<HTMLUListElement | null>(null);
	const activeSelectedOptionRef = useRef<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const menuKeyBuffer = useRef(new KeyBuffer());

	// Generated IDs
	const generatedId = useRef(generateId());
	const generatedErrorId = useRef(generateId());
	const getId = useCallback(() => idProp || generatedId.current, [idProp]);
	const deselectId = `${getId()}-deselect`;

	// State
	const [activeOption, setActiveOption] = useState<ComboboxOption | undefined>(
		undefined
	);
	const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
	const [activeSelectedOption, setActiveSelectedOption] = useState<
		ComboboxOption | undefined
	>(selection?.[0]);
	const [activeSelectedOptionIndex, setActiveSelectedOptionIndex] = useState(0);
	const [listboxHasFocus, setListboxHasFocus] = useState(false);
	// `isOpen` is ephemeral UI state: controlled when the prop is set,
	// otherwise internal and seeded by `defaultIsOpen`.
	const [isOpen, setIsOpen, isOpenControlled] = useControllableState(
		isOpenProp,
		defaultIsOpen ?? false
	);
	// Latest `isOpen` for close requests made from timers and for swallowing a
	// duplicate request within one event.
	const isOpenRef = useRef(isOpen);
	useEffect(() => {
		isOpenRef.current = isOpen;
	}, [isOpen]);
	// Event of the latest close request, reported by `events.onClose`.
	const closeEventRef = useRef<React.SyntheticEvent | undefined>(undefined);
	// Reset the highlighted option whenever the menu closes, however it closed.
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
	if (prevIsOpen !== isOpen) {
		setPrevIsOpen(isOpen);
		if (!isOpen) {
			setActiveOption(undefined);
			setActiveOptionIndex(-1);
		}
	}
	const [inputRendered, setInputRendered] = useState(false);

	// Check props on mount
	useEffect(() => {
		checkProps(
			COMBOBOX,
			props as unknown as Record<string, unknown>,
			componentDoc
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Derived state
	const getIsOpen = useCallback(() => !!isOpen, [isOpen]);

	const getIsActiveOption = useCallback(() => {
		return activeOption && activeOptionIndex !== -1;
	}, [activeOption, activeOptionIndex]);

	const getErrorId = useCallback(() => {
		return ariaDescribedby || (errorText && generatedErrorId.current);
	}, [ariaDescribedby, errorText]);

	// Build options list
	const getOptions = useCallback(() => {
		const deselectOption: ComboboxOption = {
			id: deselectId,
			label: labels.deselectOption,
			value: '',
			type: 'deselect',
		};

		const localOptionsSearchEntity = optionsSearchEntity.map((item) =>
			toActionItemRow(item, 'header')
		);

		const localOptionsAddItem = optionsAddItem.map((item) =>
			toActionItemRow(item, 'footer')
		);

		return [
			...(localOptionsSearchEntity.length > 0 ? localOptionsSearchEntity : []),
			...(hasDeselect ? [deselectOption] : []),
			...(options && options.length > 0 ? options : []),
			...(localOptionsAddItem.length > 0 ? localOptionsAddItem : []),
		];
	}, [
		deselectId,
		labels.deselectOption,
		optionsSearchEntity,
		optionsAddItem,
		hasDeselect,
		options,
	]);

	const isSelected = useCallback(
		({
			selection: sel,
			option,
		}: {
			selection: ComboboxOption[];
			option: ComboboxOption;
		}) => {
			return !!find(sel, option);
		},
		[]
	);

	// Get new active option index (for navigation)
	const getNewActiveOptionIndex = useCallback(
		({
			activeOptionIndex: currentIndex,
			offset,
			options: opts,
		}: {
			activeOptionIndex: number;
			offset: number;
			options: ComboboxOption[];
		}) => {
			const nextIndex = currentIndex + offset;
			const skipIndex =
				opts.length > nextIndex &&
				nextIndex >= 0 &&
				opts[nextIndex].type === 'separator';
			const newIndex = skipIndex ? nextIndex + offset : nextIndex;
			const hasNewIndex = opts.length > nextIndex && nextIndex >= 0;
			return hasNewIndex ? newIndex : currentIndex;
		},
		[]
	);

	// ===== Event Handlers =====

	// Every internal close path (Escape, blur, selecting an option, the popover
	// buttons, a click outside) goes through `requestClose`. It reports the
	// request through `events.onRequestClose` and closes only when `isOpen` is
	// uncontrolled; a controlled `isOpen` closes when the parent updates it.
	const requestClose = useCallback(
		(event?: React.SyntheticEvent, { trigger }: { trigger?: string } = {}) => {
			if (isOpenRef.current) {
				if (!isOpenControlled) {
					// Swallow a second request in the same event (for example
					// Escape handled by both the input and the popover).
					isOpenRef.current = false;
				}
				closeEventRef.current = event;

				if (variant === 'popover' && trigger === 'cancel') {
					const popoverProps = popover?.props as
						| { onClose?: (event: unknown, data: { trigger: string }) => void }
						| undefined;
					if (popoverProps?.onClose) {
						popoverProps.onClose(event, { trigger });
					}
				}

				if (events.onRequestClose) {
					events.onRequestClose(event as React.SyntheticEvent, {});
				}

				setIsOpen(false);
			}
		},
		[isOpenControlled, variant, popover, events, setIsOpen]
	);

	// Called by the menu `Dialog` (or `Popover`) once it has rendered, so
	// `events.onOpen` fires on a real open whether `isOpen` is controlled or not.
	const handleOpen = useCallback(
		(event?: React.SyntheticEvent, data?: Record<string, unknown>) => {
			currentOpenDropdown = { handleClose: requestClose };

			if (events.onOpen) {
				events.onOpen(event, data || {});
			}

			if (variant === 'readonly') {
				const opts = getOptions();
				const idx = findIndex(opts, (item) => isEqual(item, selection[0]));

				setActiveOptionIndex(idx);
				setActiveOption(selection[0]);

				if (menuRef.current !== null) {
					menuItemSelectScroll({
						container: menuRef.current,
						focusedIndex: idx,
					});
				}
			}
		},
		[requestClose, events, variant, getOptions, selection]
	);

	// Every internal open path (typing, clicking the input, Down, Enter) goes
	// through `requestOpen`. It reports the request through
	// `events.onRequestOpen` and opens only when `isOpen` is uncontrolled.
	const requestOpen = useCallback(
		(event?: React.SyntheticEvent) => {
			if (!isOpen) {
				if (events.onRequestOpen) {
					events.onRequestOpen(event, {});
				}
				setIsOpen(true);
			}
		},
		[isOpen, events, setIsOpen]
	);

	const requestOpenMenu = useCallback(
		(event?: React.SyntheticEvent) => {
			const isInlineSingleSelectionAndIsNotSelected =
				!multiple && selection.length === 0 && variant === 'inline-listbox';

			if (
				isInlineSingleSelectionAndIsNotSelected ||
				multiple ||
				variant === 'readonly'
			) {
				requestOpen(event);
			}
		},
		[multiple, selection.length, variant, requestOpen]
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent | TouchEvent) => {
			requestClose(event as unknown as React.SyntheticEvent, {
				trigger: 'cancel',
			});
		},
		[requestClose]
	);

	const handleSelect = useCallback(
		(
			event: React.SyntheticEvent,
			{
				selection: sel,
				option,
			}: { selection: ComboboxOption[]; option: ComboboxOption }
		) => {
			if (isActionItemRow(option)) {
				const actionItem = option[ACTION_ITEM];
				const actionEvent = event as React.MouseEvent | React.KeyboardEvent;
				actionItem.onClick?.(actionEvent, { option: actionItem });
				events.onSelectActionItem?.(actionEvent, {
					option: actionItem,
					value: value ?? '',
				});
				requestClose(event);
				return;
			}

			let newSelection: ComboboxOption[];
			const selected = isSelected({ selection: sel, option });
			const singleSelectAndSelectedWasNotClicked = !multiple && !selected;
			const multiSelectAndSelectedWasNotClicked = multiple && !selected;
			const deselectWasClicked = option.id === deselectId;

			if (deselectWasClicked) {
				newSelection = [];
			} else if (singleSelectAndSelectedWasNotClicked) {
				newSelection = [option];
			} else if (multiSelectAndSelectedWasNotClicked) {
				newSelection = [...selection, option];
			} else {
				newSelection = reject(selection, option);
			}

			if (events.onSelect) {
				events.onSelect(event, { selection: newSelection });
			}

			requestClose(event);
		},
		[isSelected, multiple, deselectId, selection, events, requestClose, value]
	);

	const handleInputBlur = useCallback(
		(event: React.FocusEvent) => {
			setTimeout(() => {
				const activeElement = documentDefined ? document.activeElement : null;
				if (
					activeElement &&
					activeElement.tagName === 'DIV' &&
					activeElement.id === `${getId()}-listbox`
				) {
					if (inputRef.current) {
						inputRef.current.focus();
					}
				} else if (!popover) {
					requestClose(event);
				}
			}, 200);

			if (events.onBlur) {
				events.onBlur(event);
			}
		},
		[getId, popover, requestClose, events]
	);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			requestOpenMenu(event);
			if (events.onChange) {
				events.onChange(event, { value: event.target.value });
			}
		},
		[requestOpenMenu, events]
	);

	const handleInputFocus = useCallback(
		(event: React.FocusEvent) => {
			if (events.onFocus) {
				events.onFocus(event, {});
			}
		},
		[events]
	);

	const handleInputSubmit = useCallback(
		(event: React.KeyboardEvent) => {
			if (activeOption === undefined && activeOptionIndex === -1) {
				if (!isOpen) {
					if (!event.shiftKey) {
						requestOpen(event);
					}
				} else {
					requestClose(event, { trigger: 'cancel' });
				}
			}

			if (activeOption?.disabled) {
				return;
			}

			// Legacy: `type: 'header' | 'footer'` rows passed directly in `options`
			// keep their pre-v11 Enter behavior of calling `option.onClick`.
			if (
				activeOption &&
				!isActionItemRow(activeOption) &&
				(activeOption.type === 'header' || activeOption.type === 'footer')
			) {
				activeOption.onClick?.(event as unknown as React.MouseEvent);
				return;
			}

			if (getIsActiveOption()) {
				handleSelect(event, {
					option: activeOption!,
					selection,
				});
			} else if (
				!predefinedOptionsOnly &&
				(event.target as HTMLInputElement).value !== '' &&
				events.onSubmit
			) {
				events.onSubmit(event, {
					value: (event.target as HTMLInputElement).value,
				});
			}
		},
		[
			activeOption,
			activeOptionIndex,
			isOpen,
			requestOpen,
			requestClose,
			getIsActiveOption,
			handleSelect,
			selection,
			predefinedOptionsOnly,
			events,
		]
	);

	const handleNavigateListboxMenu = useCallback(
		(
			event: React.KeyboardEvent,
			{ direction }: { direction: 'next' | 'previous' }
		) => {
			const offsets = { next: 1, previous: -1 };
			const opts = getOptions();
			const newIndex = getNewActiveOptionIndex({
				activeOptionIndex,
				offset: offsets[direction],
				options: opts,
			});

			if (getIsOpen() && menuRef.current) {
				menuItemSelectScroll({
					container: menuRef.current,
					focusedIndex: newIndex,
				});
			}

			setActiveOption(opts[newIndex]);
			setActiveOptionIndex(newIndex);
		},
		[getOptions, getNewActiveOptionIndex, activeOptionIndex, getIsOpen]
	);

	const handleNavigateSelectedListbox = useCallback(
		(
			event: React.SyntheticEvent,
			{ direction }: { direction: 'next' | 'previous' }
		) => {
			const offsets = { next: 1, previous: -1 };
			const isLastOptionAndRightIsPressed =
				activeSelectedOptionIndex + 1 === selection.length &&
				direction === 'next';
			const isFirstOptionAndLeftIsPressed =
				activeSelectedOptionIndex === 0 && direction === 'previous';

			if (isLastOptionAndRightIsPressed) {
				setActiveSelectedOption(selection[0]);
				setActiveSelectedOptionIndex(0);
				setListboxHasFocus(true);
			} else if (isFirstOptionAndLeftIsPressed) {
				setActiveSelectedOption(selection[selection.length - 1]);
				setActiveSelectedOptionIndex(selection.length - 1);
				setListboxHasFocus(true);
			} else {
				const newIndex = getNewActiveOptionIndex({
					activeOptionIndex: activeSelectedOptionIndex,
					offset: offsets[direction],
					options: selection,
				});
				setActiveSelectedOption(selection[newIndex]);
				setActiveSelectedOptionIndex(newIndex);
				setListboxHasFocus(true);
			}
		},
		[activeSelectedOptionIndex, selection, getNewActiveOptionIndex]
	);

	const handleKeyDownDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (!event.shiftKey) {
				requestOpen(event);
			}

			if (variant !== 'popover') {
				handleNavigateListboxMenu(event, { direction: 'next' });
			}
		},
		[requestOpen, variant, handleNavigateListboxMenu]
	);

	const handleKeyDownUp = useCallback(
		(event: React.KeyboardEvent) => {
			if (!event.shiftKey && getIsOpen()) {
				handleNavigateListboxMenu(event, { direction: 'previous' });
			}
		},
		[getIsOpen, handleNavigateListboxMenu]
	);

	const handleKeyDownTab = useCallback(() => {
		if (selectedListboxRef.current) {
			setListboxHasFocus(true);
		}
	}, []);

	const handleKeyDownOther = useCallback(
		(event: React.KeyboardEvent) => {
			const opts = getOptions();
			const newActiveOptionIndex = keyLetterMenuItemSelect({
				key: event.key,
				keyBuffer: menuKeyBuffer.current,
				keyCode: event.keyCode,
				options: opts,
			});

			if (newActiveOptionIndex !== undefined) {
				if (getIsOpen() && menuRef.current) {
					menuItemSelectScroll({
						container: menuRef.current,
						focusedIndex: newActiveOptionIndex,
					});
				}

				setActiveOption(opts[newActiveOptionIndex]);
				setActiveOptionIndex(newActiveOptionIndex);
			}
		},
		[getOptions, getIsOpen]
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			const callbacks: Record<
				number | string,
				| {
						callback: (e: React.KeyboardEvent) => void;
						stopPropagation?: boolean;
				  }
				| undefined
			> = {
				[KEYS.DOWN]: { callback: handleKeyDownDown },
				[KEYS.ENTER]: { callback: handleInputSubmit },
				[KEYS.ESCAPE]: {
					callback: requestClose as (e: React.KeyboardEvent) => void,
				},
				[KEYS.UP]: { callback: handleKeyDownUp },
			};

			if (variant === 'readonly') {
				if (selection.length > 2) {
					callbacks[KEYS.TAB] = { callback: handleKeyDownTab };
				} else {
					callbacks[KEYS.TAB] = undefined;
				}
				callbacks.other = {
					callback: handleKeyDownOther,
					stopPropagation: false,
				};
			}

			const stopPropagation = getIsOpen();

			mapKeyEventCallbacks(event, { callbacks, stopPropagation });
		},
		[
			handleKeyDownDown,
			handleInputSubmit,
			requestClose,
			handleKeyDownUp,
			variant,
			selection.length,
			handleKeyDownTab,
			handleKeyDownOther,
			getIsOpen,
		]
	);

	const handleBlurPill = useCallback(() => {
		setListboxHasFocus(false);
	}, []);

	const handlePillFocus = useCallback(
		(
			event: React.FocusEvent,
			{ option, index }: { option: ComboboxOption; index: number }
		) => {
			if (!listboxHasFocus) {
				setActiveSelectedOption(option);
				setActiveSelectedOptionIndex(index);
				setListboxHasFocus(true);
			}
		},
		[listboxHasFocus]
	);

	const handleRemoveSelectedOption = useCallback(
		(
			event: React.SyntheticEvent,
			{ option, index }: { option: ComboboxOption; index?: number }
		) => {
			event.preventDefault();
			const onlyOnePillAndInputExists = selection.length === 1;
			const isReadOnlyAndTwoPillsExists =
				selection.length === 2 && variant === 'readonly' && multiple;
			const lastPillWasRemoved =
				index !== undefined && index + 1 === selection.length;

			if (
				(onlyOnePillAndInputExists || isReadOnlyAndTwoPillsExists) &&
				inputRef.current
			) {
				inputRef.current.focus();
			} else if (lastPillWasRemoved && index !== undefined) {
				setActiveSelectedOption(selection[index - 1]);
				setActiveSelectedOptionIndex(index - 1);
				setListboxHasFocus(true);
			} else if (index !== undefined) {
				setActiveSelectedOption(selection[index + 1]);
				setActiveSelectedOptionIndex(index);
				setListboxHasFocus(true);
			}

			if (events.onRequestRemoveSelectedOption) {
				events.onRequestRemoveSelectedOption(event, {
					selection: reject(selection, option),
				});
			}
		},
		[selection, variant, multiple, events]
	);

	const handleRequestFocusSelectedListbox = useCallback(
		(event: React.SyntheticEvent, { ref }: { ref: HTMLElement | null }) => {
			if (ref) {
				activeSelectedOptionRef.current = ref;
				activeSelectedOptionRef.current.focus();
			}
		},
		[]
	);

	// ===== Refs =====

	const setInputRefCallback = useCallback(
		(component: HTMLInputElement | null) => {
			inputRef.current = component;
			if (!inputRendered) {
				setInputRendered(true);
			}
			if (inputRefCallback) {
				inputRefCallback(component);
			}
		},
		[inputRendered, inputRefCallback]
	);

	const setSelectedListboxRefCallback = useCallback(
		(ref: HTMLUListElement | null) => {
			selectedListboxRef.current = ref;
			if (selectedListboxRefCallback) {
				selectedListboxRefCallback(ref);
			}
		},
		[selectedListboxRefCallback]
	);

	const setMenuRefCallback = useCallback((ref: HTMLUListElement | null) => {
		menuRef.current = ref;
	}, []);

	const getTargetElement = useCallback(() => inputRef.current, []);

	// ===== Effects =====

	// `events.onClose` fires when the menu really closes: after an
	// uncontrolled close, or when the parent sets a controlled `isOpen` to
	// `false`. It does not fire for a close request a controlled parent ignores.
	const wasOpenRef = useRef(isOpen);
	useEffect(() => {
		if (wasOpenRef.current !== isOpen) {
			wasOpenRef.current = isOpen;
			if (!isOpen) {
				if (
					currentOpenDropdown &&
					currentOpenDropdown.handleClose === requestClose
				) {
					currentOpenDropdown = undefined;
				}
				if (events.onClose) {
					events.onClose(closeEventRef.current, {});
				}
			}
		}
		closeEventRef.current = undefined;
	});

	// Handle options change - maintain active highlight
	useEffect(() => {
		const opts = getOptions();
		if (activeOption) {
			const index = findIndex(opts, (item) => isEqual(item, activeOption));
			if (index !== -1) {
				setActiveOptionIndex(index);
			} else {
				setActiveOption(undefined);
				setActiveOptionIndex(-1);
			}
		}
	}, [options, getOptions, activeOption]);

	// Handle selection change - keep the active selected option and its roving
	// tabindex in sync with `selection`. Besides seeding the initial active
	// pill, this clamps the active index when `selection` shrinks. Without the
	// clamp, a controlled parent removing a pill through any path other than
	// the built-in remove handler could leave the active index pointing past
	// the end of `selection`, so no pill receives tabindex=0 and the selected-
	// pill listbox becomes unreachable by keyboard (WCAG 2.1.1 / 2.4.3).
	useEffect(() => {
		if (selection.length === 0) {
			if (activeSelectedOption !== undefined) {
				setActiveSelectedOption(undefined);
				setActiveSelectedOptionIndex(0);
			}
			return;
		}

		if (!activeSelectedOption || !selection[activeSelectedOptionIndex]) {
			const clampedIndex =
				activeSelectedOptionIndex >= selection.length
					? selection.length - 1
					: activeSelectedOptionIndex;
			setActiveSelectedOption(selection[clampedIndex]);
			setActiveSelectedOptionIndex(clampedIndex);
		}
	}, [selection, activeSelectedOption, activeSelectedOptionIndex]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (
				currentOpenDropdown &&
				currentOpenDropdown.handleClose === requestClose
			) {
				currentOpenDropdown = undefined;
			}
		};
	}, [requestClose]);

	// ===== Render Helpers =====

	const getCustomPopoverProps = useCallback(
		(body: ReactNode) => {
			const popoverBody = (
				<div>
					<div className="slds-assistive-text" id={`${getId()}-label`}>
						{assistiveText.popoverLabel}
					</div>
					{body}
				</div>
			);

			const popoverFooter = (
				<div>
					<Button
						label={labels.cancelButton}
						onClick={(e: React.MouseEvent) => {
							requestClose(e, { trigger: 'cancel' });
						}}
					/>
					<Button
						label={labels.doneButton}
						variant="brand"
						onClick={(e: React.MouseEvent) => {
							requestClose(e);
						}}
					/>
				</div>
			);

			const defaultPopoverProps: Record<string, unknown> = {
				ariaLabelledby: `${getId()}-label`,
				align: 'bottom',
				body: popoverBody,
				className: 'slds-popover_full-width',
				footer: popoverFooter,
				footerClassName: 'slds-popover__footer_form',
				hasNoNubbin: true,
				id: getId(),
				isOpen,
				hasNoTriggerStyles: true,
				onOpen: handleOpen,
				// The combobox owns the popover's open state; `events.onClose` is
				// fired by the combobox itself when `isOpen` turns `false`.
				onRequestClose: (
					event: React.SyntheticEvent,
					data?: { trigger?: string }
				) => {
					requestClose(event, { trigger: data?.trigger });
				},
			};

			const popoverPropsFromProp = popover?.props as
				Record<string, unknown> | undefined;
			const popoverProps = assign(
				defaultPopoverProps,
				popoverPropsFromProp || {}
			);
			popoverProps.body = popoverBody;

			delete popoverProps.children;
			return popoverProps;
		},
		[
			getId,
			assistiveText.popoverLabel,
			labels.cancelButton,
			labels.doneButton,
			requestClose,
			isOpen,
			handleOpen,
			popover,
		]
	);

	const getDialog = useCallback(
		({ menuRenderer }: { menuRenderer: ReactNode }) => {
			const position = menuPosition;

			if (!disabled && getIsOpen()) {
				const dialogProps = {
					align: 'bottom left' as const,
					context: iconSettingsContext,
					hasStaticAlignment,
					inheritWidthOf,
					onMouseDown: (event: React.MouseEvent) => {
						event.preventDefault();
					},
					onOpen: handleOpen,
					onRequestTargetElement: getTargetElement,
					position,
					containerProps: {
						id: `${getId()}-listbox`,
						role: 'listbox',
					},
				};
				return (
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					<Dialog {...(dialogProps as any)}>{menuRenderer}</Dialog>
				);
			}
			return null;
		},
		[
			menuPosition,
			disabled,
			getIsOpen,
			iconSettingsContext,
			hasStaticAlignment,
			inheritWidthOf,
			handleOpen,
			getTargetElement,
			getId,
		]
	);

	// `onRenderMenuItem` and `menuItem` are deprecated: they take a component instead of a function
	const LegacyMenuItem = onRenderMenuItem || menuItem;
	let renderMenuItem: ((data: MenuRenderMenuItemData) => ReactNode) | undefined;
	if (renderMenuItemProp) {
		renderMenuItem = (data) => renderMenuItemProp({ ...data, assistiveText });
	} else if (LegacyMenuItem) {
		renderMenuItem = ({ isSelected, option }) => (
			<LegacyMenuItem
				assistiveText={assistiveText}
				selected={isSelected}
				option={option}
			/>
		);
	}

	const renderMenu = useCallback(() => {
		const menuVariant: Record<string, 'icon-title-subtitle' | 'checkbox'> = {
			base: 'icon-title-subtitle',
			'inline-listbox': 'icon-title-subtitle',
			readonly: 'checkbox',
		};

		const readonlyItemVisibleLength = variant === 'readonly' ? 5 : null;

		return (
			<Menu
				assistiveText={assistiveText}
				activeOption={activeOption}
				activeOptionIndex={activeOptionIndex}
				classNameMenu={classNameMenu}
				classNameMenuSubHeader={classNameMenuSubHeader}
				inheritWidthOf={inheritWidthOf}
				inputId={getId()}
				inputValue={value}
				isSelected={isSelected}
				itemVisibleLength={menuItemVisibleLength || readonlyItemVisibleLength}
				labels={{ noOptionsFound: labels.noOptionsFound || '' }}
				hasMenuSpinner={hasMenuSpinner}
				menuPosition={menuPosition}
				menuRef={setMenuRefCallback}
				maxWidth={menuMaxWidth}
				options={getOptions()}
				onSelect={
					handleSelect as (
						event: React.MouseEvent,
						data: { option: ComboboxOption; selection?: ComboboxOption[] }
					) => void
				}
				renderMenuItem={renderMenuItem}
				selection={selection}
				tooltipMenuItemDisabled={tooltipMenuItemDisabled}
				variant={menuVariant[variant]}
			/>
		);
	}, [
		variant,
		assistiveText,
		activeOption,
		activeOptionIndex,
		classNameMenu,
		classNameMenuSubHeader,
		inheritWidthOf,
		getId,
		value,
		isSelected,
		menuItemVisibleLength,
		labels.noOptionsFound,
		hasMenuSpinner,
		menuPosition,
		setMenuRefCallback,
		menuMaxWidth,
		getOptions,
		handleSelect,
		renderMenuItem,
		selection,
		tooltipMenuItemDisabled,
	]);

	// User defined props from input
	const userDefinedInputProps = input?.props || {};

	// ===== Sub-renders =====

	const renderBase = () => (
		<div className="slds-form-element__control">
			<div className="slds-combobox_container">
				<div
					className={classNames(
						'slds-combobox',
						'slds-dropdown-trigger',
						'slds-dropdown-trigger_click',
						'ignore-react-onclickoutside',
						{
							'slds-is-open': getIsOpen(),
							'slds-has-error': errorText,
						},
						className
					)}
					role="combobox"
					aria-expanded={getIsOpen()}
					aria-haspopup="listbox"
					aria-owns={getIsOpen() ? `${getId()}-listbox` : undefined}
				>
					<InnerInput
						aria-autocomplete="list"
						aria-controls={getIsOpen() ? `${getId()}-listbox` : undefined}
						aria-activedescendant={
							activeOption
								? `${getId()}-listbox-option-${activeOption.id}`
								: undefined
						}
						aria-describedby={getErrorId()}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							className: 'slds-combobox__form-element',
							role: 'none',
						}}
						hasSpinner={hasInputSpinner}
						iconRight={
							<InputIcon
								category="utility"
								name="search"
								title={labels.inputIconTitle}
							/>
						}
						id={getId()}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						onKeyDown={handleKeyDown}
						inputRef={setInputRefCallback}
						onClick={(event: React.MouseEvent) => requestOpen(event)}
						onChange={handleInputChange}
						placeholder={labels.placeholder}
						readOnly={!!(predefinedOptionsOnly && activeOption)}
						required={required}
						role="textbox"
						value={
							predefinedOptionsOnly
								? (activeOption?.label as string) || value
								: value
						}
						{...userDefinedInputProps}
					/>
					{getDialog({ menuRenderer: renderMenu() })}
				</div>
			</div>
			<SelectedListBox
				activeOption={activeSelectedOption as SelectedListBoxOption}
				activeOptionIndex={activeSelectedOptionIndex}
				assistiveText={
					assistiveText as unknown as {
						removePill?: string;
						selectedListboxLabel?: string;
						[key: string]: unknown;
					}
				}
				events={{
					onBlurPill: handleBlurPill,
					onPillFocus: handlePillFocus as (
						event: React.FocusEvent,
						data: { index: number; option: SelectedListBoxOption }
					) => void,
					onRequestFocus: handleRequestFocusSelectedListbox as (
						event: unknown,
						data: { ref: HTMLElement | null }
					) => void,
					onRequestFocusOnNextPill: handleNavigateSelectedListbox as (
						event: React.SyntheticEvent,
						data: { direction: 'next' | 'previous' }
					) => void,
					onRequestFocusOnPreviousPill: handleNavigateSelectedListbox as (
						event: React.SyntheticEvent,
						data: { direction: 'next' | 'previous' }
					) => void,
					onRequestRemove: handleRemoveSelectedOption as (
						event:
							React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent,
						data: { index?: number; option: SelectedListBoxOption }
					) => void,
				}}
				id={`${getId()}-selected-listbox`}
				labels={labels}
				selectedListboxRef={setSelectedListboxRefCallback}
				selection={selection as SelectedListBoxOption[]}
				listboxHasFocus={listboxHasFocus}
				multiselectable={multiple}
			/>
			{errorText && (
				<div className="slds-has-error">
					<div
						id={getErrorId()}
						className="slds-form-element__help slds-has-error"
					>
						{errorText}
					</div>
				</div>
			)}
		</div>
	);

	const renderInlineMultiple = () => (
		<div className="slds-form-element__control">
			<div
				className={classNames('slds-combobox_container', {
					'slds-has-inline-listbox': selection.length,
				})}
			>
				{selection.length ? (
					<SelectedListBox
						activeOption={activeSelectedOption as SelectedListBoxOption}
						activeOptionIndex={activeSelectedOptionIndex}
						assistiveText={
							assistiveText as unknown as {
								removePill?: string;
								selectedListboxLabel?: string;
								[key: string]: unknown;
							}
						}
						containerRole="listbox"
						containerAriaOrientation="horizontal"
						listboxRole="group"
						listboxAriaOrientation={null}
						events={{
							onBlurPill: handleBlurPill,
							onPillFocus: handlePillFocus as (
								event: React.FocusEvent,
								data: { index: number; option: SelectedListBoxOption }
							) => void,
							onRequestFocus: handleRequestFocusSelectedListbox as (
								event: unknown,
								data: { ref: HTMLElement | null }
							) => void,
							onRequestFocusOnNextPill: handleNavigateSelectedListbox as (
								event: React.SyntheticEvent,
								data: { direction: 'next' | 'previous' }
							) => void,
							onRequestFocusOnPreviousPill: handleNavigateSelectedListbox as (
								event: React.SyntheticEvent,
								data: { direction: 'next' | 'previous' }
							) => void,
							onRequestRemove: handleRemoveSelectedOption as (
								event:
									React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent,
								data: { index?: number; option: SelectedListBoxOption }
							) => void,
						}}
						id={`${getId()}-selected-listbox`}
						labels={labels}
						selectedListboxRef={setSelectedListboxRefCallback}
						selection={selection as SelectedListBoxOption[]}
						listboxHasFocus={listboxHasFocus}
						multiselectable={multiple}
					/>
				) : null}
				<div
					className={classNames(
						'slds-combobox',
						'slds-dropdown-trigger',
						'slds-dropdown-trigger_click',
						'ignore-react-onclickoutside',
						{
							'slds-is-open': getIsOpen(),
							'slds-has-error': errorText,
						},
						className
					)}
					role="combobox"
					aria-expanded={getIsOpen()}
					aria-haspopup="listbox"
				>
					<InnerInput
						aria-autocomplete="list"
						aria-controls={getIsOpen() ? `${getId()}-listbox` : undefined}
						aria-activedescendant={
							activeOption
								? `${getId()}-listbox-option-${activeOption.id}`
								: undefined
						}
						aria-describedby={getErrorId()}
						autoComplete="off"
						className="slds-combobox__input"
						containerProps={{
							className: 'slds-combobox__form-element',
							role: 'none',
						}}
						hasSpinner={hasInputSpinner}
						iconRight={
							<InputIcon
								category="utility"
								name="search"
								title={labels.inputIconTitle}
							/>
						}
						id={getId()}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						onKeyDown={handleKeyDown}
						inputRef={setInputRefCallback}
						onClick={(event: React.MouseEvent) => requestOpen(event)}
						onChange={handleInputChange}
						placeholder={labels.placeholder}
						readOnly={!!(predefinedOptionsOnly && activeOption)}
						required={required}
						role="textbox"
						value={
							predefinedOptionsOnly
								? (activeOption?.label as string) || value
								: value
						}
						{...userDefinedInputProps}
					/>
					{getDialog({ menuRenderer: renderMenu() })}
					{errorText && (
						<div id={getErrorId()} className="slds-form-element__help">
							{errorText}
						</div>
					)}
				</div>
			</div>
		</div>
	);

	const renderInlineSingle = () => {
		const selectedIcon = selection[0]?.icon;
		const iconLeft =
			selectedIcon && React.isValidElement(selectedIcon)
				? React.cloneElement(selectedIcon, {
						containerClassName: 'slds-combobox__input-entity-icon',
					} as Record<string, unknown>)
				: null;

		const inputValue = selection[0]?.label
			? (selection[0].label as string)
			: value;

		return (
			<div className="slds-form-element__control">
				<div
					className={classNames('slds-combobox_container', {
						'slds-has-inline-listbox': selection.length,
					})}
				>
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': getIsOpen(),
								'slds-has-error': errorText,
							},
							className
						)}
						role="combobox"
						aria-expanded={getIsOpen()}
						aria-haspopup="listbox"
					>
						<InnerInput
							aria-autocomplete="list"
							aria-controls={getIsOpen() ? `${getId()}-listbox` : undefined}
							aria-activedescendant={
								activeOption
									? `${getId()}-listbox-option-${activeOption.id}`
									: undefined
							}
							aria-describedby={getErrorId()}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								className: 'slds-combobox__form-element',
								role: 'none',
							}}
							disabled={singleInputDisabled}
							hasSpinner={hasInputSpinner}
							iconRight={
								selection.length ? (
									<InputIcon
										assistiveText={{
											icon: assistiveText.removeSingleSelectedOption,
										}}
										buttonRef={(component: HTMLButtonElement | null) => {
											buttonRef.current = component;
										}}
										category="utility"
										iconPosition="right"
										name="close"
										onClick={(event: React.MouseEvent) => {
											handleRemoveSelectedOption(event, {
												option: selection[0],
											});
										}}
									/>
								) : (
									<InputIcon category="utility" name="search" />
								)
							}
							iconLeft={iconLeft}
							id={getId()}
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							onKeyDown={handleKeyDown}
							inputRef={setInputRefCallback}
							onClick={(event: React.MouseEvent) => requestOpenMenu(event)}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								if (!selection.length) {
									handleInputChange(event);
								}
							}}
							placeholder={labels.placeholder}
							readOnly={
								!!(predefinedOptionsOnly && activeOption) || !!selection.length
							}
							required={required}
							role="textbox"
							value={
								predefinedOptionsOnly
									? (activeOption?.label as string) || value
									: inputValue
							}
							{...userDefinedInputProps}
						/>
						{getDialog({ menuRenderer: renderMenu() })}
					</div>
				</div>
				{errorText && (
					<div className="slds-has-error">
						<div id={getErrorId()} className="slds-form-element__help">
							{errorText}
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderPopover = () => {
		const popoverPropsFromProp = popover?.props as
			{ body?: ReactNode } | undefined;
		const popoverProps = getCustomPopoverProps(popoverPropsFromProp?.body);

		return (
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': getIsOpen(),
								'slds-has-error': errorText,
							},
							className
						)}
						role="combobox"
						aria-expanded={getIsOpen()}
						aria-haspopup="dialog"
					>
						{/* @ts-expect-error - popoverProps contains body from getCustomPopoverProps */}
						<Popover {...popoverProps}>
							<InnerInput
								aria-autocomplete="none"
								aria-controls={getIsOpen() ? `${getId()}-popover` : undefined}
								aria-describedby={getErrorId()}
								autoComplete="off"
								className="slds-combobox__input"
								containerProps={{
									className: 'slds-combobox__form-element',
									role: 'none',
								}}
								iconRight={
									<InputIcon
										category="utility"
										name="down"
										variant="combobox"
									/>
								}
								id={getId()}
								onFocus={handleInputFocus}
								onBlur={handleInputBlur}
								onKeyDown={handleKeyDown}
								inputRef={setInputRefCallback}
								onClick={(event: React.MouseEvent) => requestOpen(event)}
								onChange={handleInputChange}
								placeholder={labels.placeholder}
								readOnly
								required={required}
								role="textbox"
								value={value}
							/>
						</Popover>
					</div>
				</div>
				{errorText && (
					<div className="slds-has-error">
						<div
							id={getErrorId()}
							className="slds-form-element__help slds-has-error"
						>
							{errorText}
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderReadOnlyMultiple = () => {
		const displayValue =
			selection.length > 1
				? labels.multipleOptionsSelected ||
					`${selection.length} options selected`
				: (selection[0]?.label as string) || '';

		return (
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': getIsOpen(),
								'slds-has-error': errorText,
							},
							className
						)}
						role="combobox"
						aria-expanded={getIsOpen()}
						aria-haspopup="listbox"
					>
						<InnerInput
							aria-autocomplete="list"
							aria-controls={getIsOpen() ? `${getId()}-listbox` : undefined}
							aria-activedescendant={
								activeOption
									? `${getId()}-listbox-option-${activeOption.id}`
									: undefined
							}
							aria-describedby={getErrorId()}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								className: 'slds-combobox__form-element',
								role: 'none',
							}}
							iconRight={
								<InputIcon category="utility" name="down" variant="combobox" />
							}
							id={getId()}
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							onKeyDown={handleKeyDown}
							inputRef={setInputRefCallback}
							onClick={(event: React.MouseEvent) => requestOpenMenu(event)}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								if (!selection.length) {
									handleInputChange(event);
								}
							}}
							placeholder={labels.placeholderReadOnly}
							readOnly
							required={required}
							role="textbox"
							value={displayValue}
							{...userDefinedInputProps}
						/>
						{getDialog({ menuRenderer: renderMenu() })}
					</div>
				</div>
				<SelectedListBox
					activeOption={activeSelectedOption as SelectedListBoxOption}
					activeOptionIndex={activeSelectedOptionIndex}
					assistiveText={
						assistiveText as unknown as {
							removePill?: string;
							selectedListboxLabel?: string;
							[key: string]: unknown;
						}
					}
					events={{
						onBlurPill: handleBlurPill,
						onPillFocus: handlePillFocus as (
							event: React.FocusEvent,
							data: { index: number; option: SelectedListBoxOption }
						) => void,
						onRequestFocus: handleRequestFocusSelectedListbox as (
							event: unknown,
							data: { ref: HTMLElement | null }
						) => void,
						onRequestFocusOnNextPill: handleNavigateSelectedListbox as (
							event: React.SyntheticEvent,
							data: { direction: 'next' | 'previous' }
						) => void,
						onRequestFocusOnPreviousPill: handleNavigateSelectedListbox as (
							event: React.SyntheticEvent,
							data: { direction: 'next' | 'previous' }
						) => void,
						onRequestRemove: handleRemoveSelectedOption as (
							event:
								React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent,
							data: { index?: number; option: SelectedListBoxOption }
						) => void,
					}}
					id={`${getId()}-selected-listbox`}
					labels={labels}
					selectedListboxRef={setSelectedListboxRefCallback}
					selection={selection as SelectedListBoxOption[]}
					listboxHasFocus={listboxHasFocus}
					variant={variant}
					renderAtSelectionLength={2}
					multiselectable={multiple}
				/>
				{errorText && (
					<div className="slds-has-error">
						<div
							id={getErrorId()}
							className="slds-form-element__help slds-has-error"
						>
							{errorText}
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderReadOnlySingle = () => {
		const activeOptionLabel = activeOption?.label as string | undefined;
		const selectedOptionLabel = selection[0]?.label as string | undefined;
		let inputValue = activeOptionLabel || selectedOptionLabel || '';

		if (selection[0]?.value === '') {
			inputValue = '';
		}

		return (
			<div className="slds-form-element__control">
				<div className="slds-combobox_container">
					<div
						className={classNames(
							'slds-combobox',
							'slds-dropdown-trigger',
							'slds-dropdown-trigger_click',
							'ignore-react-onclickoutside',
							{
								'slds-is-open': getIsOpen(),
								'slds-has-error': errorText,
							},
							className
						)}
						role="combobox"
						aria-expanded={getIsOpen()}
						aria-haspopup="listbox"
					>
						<InnerInput
							aria-autocomplete="list"
							aria-controls={getIsOpen() ? `${getId()}-listbox` : undefined}
							aria-activedescendant={
								activeOption
									? `${getId()}-listbox-option-${activeOption.id}`
									: undefined
							}
							aria-describedby={getErrorId()}
							autoComplete="off"
							className="slds-combobox__input"
							containerProps={{
								className: 'slds-combobox__form-element',
								role: 'none',
							}}
							disabled={singleInputDisabled}
							iconRight={
								<InputIcon category="utility" name="down" variant="combobox" />
							}
							id={getId()}
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							onKeyDown={handleKeyDown}
							inputRef={setInputRefCallback}
							onClick={(event: React.MouseEvent) => requestOpenMenu(event)}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								if (!selection.length) {
									handleInputChange(event);
								}
							}}
							placeholder={labels.placeholderReadOnly}
							readOnly
							required={required}
							role="textbox"
							value={inputValue}
							{...userDefinedInputProps}
						/>
						{getDialog({ menuRenderer: renderMenu() })}
						{errorText && (
							<div id={getErrorId()} className="slds-form-element__help">
								{errorText}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	// ===== Main Render =====

	const hasRenderedLabel = labels.label || assistiveText?.label;

	const subRenders: Record<string, Record<string, () => ReactNode>> = {
		base: {
			multiple: renderBase,
			single: renderBase,
		},
		'inline-listbox': {
			multiple: renderInlineMultiple,
			single: renderInlineSingle,
		},
		popover: {
			multiple: renderPopover,
			single: renderPopover,
		},
		readonly: {
			multiple: renderReadOnlyMultiple,
			single: renderReadOnlySingle,
		},
	};

	const multipleOrSingle = multiple ? 'multiple' : 'single';
	const variantRenderer = subRenders[variant]?.[multipleOrSingle];

	const mainCombobox = (
		<div className={classNames('slds-form-element', classNameContainer)}>
			{entityCombobox ? null : (
				<Label
					assistiveText={
						assistiveText as unknown as {
							label?: string;
							[key: string]: unknown;
						}
					}
					htmlFor={getId()}
					label={labels.label}
					required={required}
				/>
			)}
			{fieldLevelHelpTooltip && hasRenderedLabel ? (
				<FieldLevelHelpTooltip
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					fieldLevelHelpTooltip={fieldLevelHelpTooltip as any}
				/>
			) : null}
			{variantRenderer ? variantRenderer() : subRenders.base.multiple()}
		</div>
	);

	return entityCombobox ? (
		<div className="slds-form-element">
			<Label
				assistiveText={
					assistiveText as unknown as { label?: string; [key: string]: unknown }
				}
				htmlFor={getId()}
				label={labels.label}
				required={required}
			/>
			<div className="slds-form-element__control">
				<div className="slds-combobox-group">
					<div className="slds-combobox_object-switcher slds-combobox-addon_start">
						{entityCombobox}
					</div>

					<div className="slds-combobox_container slds-combobox-addon_end">
						{mainCombobox}
					</div>
				</div>
			</div>
		</div>
	) : (
		mainCombobox
	);
};

Combobox.displayName = COMBOBOX;

export default Combobox;
