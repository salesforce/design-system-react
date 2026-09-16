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
import isFunction from 'lodash.isfunction';

import classNames from 'classnames';

import Button from '../button';
import Dialog from '../utilities/dialog';
import InnerInput from '../input/private/inner-input';
import InputIcon from '../icon/input-icon';
import Menu, { type ComboboxOption } from './private/menu';
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
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: { value: string }) => void;
	onClose?: (event: React.SyntheticEvent | undefined, data: Record<string, unknown>) => void;
	onFocus?: (event: React.FocusEvent, data: Record<string, unknown>) => void;
	onOpen?: (event: React.SyntheticEvent | undefined, data: Record<string, unknown>) => void;
	onRequestClose?: (event: React.SyntheticEvent, data: Record<string, unknown>) => void;
	onRequestOpen?: () => void;
	onRequestRemoveSelectedOption?: (event: React.SyntheticEvent, data: { selection: ComboboxOption[] }) => void;
	onSelect?: (event: React.SyntheticEvent, data: { selection: ComboboxOption[] }) => void;
	onSubmit?: (event: React.KeyboardEvent, data: { value: string }) => void;
}

export interface ComboboxProps {
	/** Assistive text for accessibility */
	assistiveText?: ComboboxAssistiveText;
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
	/** Default input value for uncontrolled usage */
	defaultValue?: string;
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
	/** Whether the dropdown is open (controlled) */
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
	/** Custom menu item renderer */
	onRenderMenuItem?: React.ComponentType<{
		assistiveText?: ComboboxAssistiveText;
		selected: boolean;
		option: ComboboxOption;
	}>;
	/** Menu options */
	options?: ComboboxOption[];
	/** Options to add items */
	optionsAddItem?: Array<{ id?: string; icon?: ReactNode; label?: string | ((searchTerm: string) => ReactNode) }>;
	/** Options for search entity */
	optionsSearchEntity?: Array<{ id?: string; icon?: ReactNode; label?: string | ((searchTerm: string) => ReactNode) }>;
	/** Popover component for popover variant */
	popover?: ReactElement;
	/** Whether only predefined options are allowed */
	predefinedOptionsOnly?: boolean;
	/** Whether field is required */
	required?: boolean;
	/** Selected options */
	selection: ComboboxOption[];
	/** Callback to get selected listbox ref */
	selectedListboxRef?: (ref: HTMLUListElement | null) => void;
	/** Whether single input is disabled */
	singleInputDisabled?: boolean;
	/** Tooltip for disabled menu items */
	tooltipMenuItemDisabled?: ReactElement;
	/** Input value (controlled) */
	value?: string;
	/** Combobox variant */
	variant?: 'base' | 'inline-listbox' | 'popover' | 'readonly';
	/** @deprecated Use menuItem instead */
	menuItem?: React.ComponentType<{
		assistiveText?: ComboboxAssistiveText;
		selected: boolean;
		option: ComboboxOption;
	}>;
}

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
		defaultValue,
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
	const [activeOption, setActiveOption] = useState<ComboboxOption | undefined>(undefined);
	const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
	const [activeSelectedOption, setActiveSelectedOption] = useState<ComboboxOption | undefined>(
		selection?.[0]
	);
	const [activeSelectedOptionIndex, setActiveSelectedOptionIndex] = useState(0);
	const [listboxHasFocus, setListboxHasFocus] = useState(false);
	const [isOpenState, setIsOpenState] = useState(typeof isOpenProp === 'boolean' ? isOpenProp : false);
	const [inputRendered, setInputRendered] = useState(false);

	// Check props on mount
	useEffect(() => {
		checkProps(COMBOBOX, props as unknown as Record<string, unknown>, componentDoc);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Derived state
	const getIsOpen = useCallback(() => {
		return !!(typeof isOpenProp === 'boolean' ? isOpenProp : isOpenState);
	}, [isOpenProp, isOpenState]);

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

		const localOptionsSearchEntity = optionsSearchEntity.map((entity) => ({
			...entity,
			type: 'header' as const,
			id: entity.id || '',
		}));

		const localOptionsAddItem = optionsAddItem.map((entity) => ({
			...entity,
			type: 'footer' as const,
			id: entity.id || '',
		}));

		return [
			...(localOptionsSearchEntity.length > 0 ? localOptionsSearchEntity : []),
			...(hasDeselect ? [deselectOption] : []),
			...(options && options.length > 0 ? options : []),
			...(localOptionsAddItem.length > 0 ? localOptionsAddItem : []),
		];
	}, [deselectId, labels.deselectOption, optionsSearchEntity, optionsAddItem, hasDeselect, options]);

	const isSelected = useCallback(({ selection: sel, option }: { selection: ComboboxOption[]; option: ComboboxOption }) => {
		return !!find(sel, option);
	}, []);

	// Get new active option index (for navigation)
	const getNewActiveOptionIndex = useCallback(({
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
	}, []);

	// ===== Event Handlers =====

	const handleClose = useCallback((event?: React.SyntheticEvent, { trigger }: { trigger?: string } = {}) => {
		const isOpen = getIsOpen();

		if (isOpen) {
			if (currentOpenDropdown && currentOpenDropdown.handleClose === handleClose) {
				currentOpenDropdown = undefined;
			}

			setActiveOption(undefined);
			setActiveOptionIndex(-1);
			setIsOpenState(false);

			if (variant === 'popover' && trigger === 'cancel') {
				const popoverProps = popover?.props as { onClose?: (event: unknown, data: { trigger: string }) => void } | undefined;
				if (popoverProps?.onClose) {
					popoverProps.onClose(event, { trigger });
				}
			}

			if (events.onClose) {
				events.onClose(event, {});
			}
		}
	}, [getIsOpen, variant, popover, events]);

	const handleOpen = useCallback((event?: React.SyntheticEvent, data?: Record<string, unknown>) => {
		const isOpen = getIsOpen();

		if (!isOpen) {
			if (currentOpenDropdown && isFunction(currentOpenDropdown.handleClose)) {
				currentOpenDropdown.handleClose();
			}
		} else {
			currentOpenDropdown = { handleClose };

			setIsOpenState(true);

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
		}
	}, [getIsOpen, handleClose, events, variant, getOptions, selection]);

	const handleRequestClose = useCallback((event: React.SyntheticEvent, data: Record<string, unknown>) => {
		if (events.onRequestClose) {
			events.onRequestClose(event, data);
		}
		if (getIsOpen()) {
			handleClose(event, { trigger: 'cancel' });
		}
	}, [events, getIsOpen, handleClose]);

	const openDialog = useCallback(() => {
		if (events.onRequestOpen) {
			events.onRequestOpen();
		} else {
			setIsOpenState(true);
		}
	}, [events]);

	const requestOpenMenu = useCallback(() => {
		const isInlineSingleSelectionAndIsNotSelected =
			!multiple &&
			selection.length === 0 &&
			variant === 'inline-listbox';

		if (
			isInlineSingleSelectionAndIsNotSelected ||
			multiple ||
			variant === 'readonly'
		) {
			openDialog();
		}
	}, [multiple, selection.length, variant, openDialog]);

	const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
		handleRequestClose(event as unknown as React.SyntheticEvent, {});
	}, [handleRequestClose]);

	const handleSelect = useCallback((event: React.SyntheticEvent, { selection: sel, option }: { selection: ComboboxOption[]; option: ComboboxOption }) => {
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

		handleClose();
	}, [isSelected, multiple, deselectId, selection, events, handleClose]);

	const handleInputBlur = useCallback((event: React.FocusEvent) => {
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
				handleClose(event);
			}
		}, 200);

		if (events.onBlur) {
			events.onBlur(event);
		}
	}, [getId, popover, handleClose, events]);

	const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		requestOpenMenu();
		if (events.onChange) {
			events.onChange(event, { value: event.target.value });
		}
	}, [requestOpenMenu, events]);

	const handleInputFocus = useCallback((event: React.FocusEvent) => {
		if (events.onFocus) {
			events.onFocus(event, {});
		}
	}, [events]);

	const handleInputSubmit = useCallback((event: React.KeyboardEvent) => {
		if (activeOption === undefined && activeOptionIndex === -1) {
			if (!isOpenState) {
				if (!event.shiftKey) {
					openDialog();
				}
			} else {
				handleRequestClose(event, {});
			}
		}

		if (activeOption?.disabled) {
			return;
		}

		if (
			activeOption &&
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
	}, [activeOption, activeOptionIndex, isOpenState, openDialog, handleRequestClose, getIsActiveOption, handleSelect, selection, predefinedOptionsOnly, events]);

	const handleNavigateListboxMenu = useCallback((event: React.KeyboardEvent, { direction }: { direction: 'next' | 'previous' }) => {
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
	}, [getOptions, getNewActiveOptionIndex, activeOptionIndex, getIsOpen]);

	const handleNavigateSelectedListbox = useCallback((event: React.SyntheticEvent, { direction }: { direction: 'next' | 'previous' }) => {
		const offsets = { next: 1, previous: -1 };
		const isLastOptionAndRightIsPressed =
			activeSelectedOptionIndex + 1 === selection.length && direction === 'next';
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
	}, [activeSelectedOptionIndex, selection, getNewActiveOptionIndex]);

	const handleKeyDownDown = useCallback((event: React.KeyboardEvent) => {
		if (!event.shiftKey) {
			openDialog();
		}

		if (variant !== 'popover') {
			handleNavigateListboxMenu(event, { direction: 'next' });
		}
	}, [openDialog, variant, handleNavigateListboxMenu]);

	const handleKeyDownUp = useCallback((event: React.KeyboardEvent) => {
		if (!event.shiftKey && getIsOpen()) {
			handleNavigateListboxMenu(event, { direction: 'previous' });
		}
	}, [getIsOpen, handleNavigateListboxMenu]);

	const handleKeyDownTab = useCallback(() => {
		if (selectedListboxRef.current) {
			setListboxHasFocus(true);
		}
	}, []);

	const handleKeyDownOther = useCallback((event: React.KeyboardEvent) => {
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
	}, [getOptions, getIsOpen]);

	const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
		const callbacks: Record<number | string, { callback: (e: React.KeyboardEvent) => void; stopPropagation?: boolean } | undefined> = {
			[KEYS.DOWN]: { callback: handleKeyDownDown },
			[KEYS.ENTER]: { callback: handleInputSubmit },
			[KEYS.ESCAPE]: { callback: handleClose as (e: React.KeyboardEvent) => void },
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
	}, [handleKeyDownDown, handleInputSubmit, handleClose, handleKeyDownUp, variant, selection.length, handleKeyDownTab, handleKeyDownOther, getIsOpen]);

	const handleBlurPill = useCallback(() => {
		setListboxHasFocus(false);
	}, []);

	const handlePillFocus = useCallback((event: React.FocusEvent, { option, index }: { option: ComboboxOption; index: number }) => {
		if (!listboxHasFocus) {
			setActiveSelectedOption(option);
			setActiveSelectedOptionIndex(index);
			setListboxHasFocus(true);
		}
	}, [listboxHasFocus]);

	const handleRemoveSelectedOption = useCallback((event: React.SyntheticEvent, { option, index }: { option: ComboboxOption; index?: number }) => {
		event.preventDefault();
		const onlyOnePillAndInputExists = selection.length === 1;
		const isReadOnlyAndTwoPillsExists =
			selection.length === 2 && variant === 'readonly' && multiple;
		const lastPillWasRemoved = index !== undefined && index + 1 === selection.length;

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
	}, [selection, variant, multiple, events]);

	const handleRequestFocusSelectedListbox = useCallback((event: React.SyntheticEvent, { ref }: { ref: HTMLElement | null }) => {
		if (ref) {
			activeSelectedOptionRef.current = ref;
			activeSelectedOptionRef.current.focus();
		}
	}, []);

	// ===== Refs =====

	const setInputRefCallback = useCallback((component: HTMLInputElement | null) => {
		inputRef.current = component;
		if (!inputRendered) {
			setInputRendered(true);
		}
		if (inputRefCallback) {
			inputRefCallback(component);
		}
	}, [inputRendered, inputRefCallback]);

	const setSelectedListboxRefCallback = useCallback((ref: HTMLUListElement | null) => {
		selectedListboxRef.current = ref;
		if (selectedListboxRefCallback) {
			selectedListboxRefCallback(ref);
		}
	}, [selectedListboxRefCallback]);

	const setMenuRefCallback = useCallback((ref: HTMLUListElement | null) => {
		menuRef.current = ref;
	}, []);

	const getTargetElement = useCallback(() => inputRef.current, []);

	// ===== Effects =====

	// Sync controlled isOpen prop
	useEffect(() => {
		if (typeof isOpenProp === 'boolean') {
			setIsOpenState(isOpenProp);
			if (!isOpenProp) {
				setActiveOption(undefined);
				setActiveOptionIndex(-1);
			}
		}
	}, [isOpenProp]);

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

	// Handle selection change - update active selected option
	useEffect(() => {
		if (selection.length > 0 && !activeSelectedOption) {
			setActiveSelectedOption(selection[0]);
			setActiveSelectedOptionIndex(0);
		}
	}, [selection, activeSelectedOption]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (currentOpenDropdown && currentOpenDropdown.handleClose === handleClose) {
				currentOpenDropdown = undefined;
			}
		};
	}, [handleClose]);

	// ===== Render Helpers =====

	const getCustomPopoverProps = useCallback((body: ReactNode) => {
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
						handleClose(e, { trigger: 'cancel' });
					}}
				/>
				<Button
					label={labels.doneButton}
					variant="brand"
					onClick={handleClose as unknown as (event: React.MouseEvent<HTMLButtonElement>) => void}
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
			isOpen: isOpenState,
			hasNoTriggerStyles: true,
			onOpen: handleOpen,
			onClose: handleClose,
			onRequestClose: handleClose,
		};

		const popoverPropsFromProp = popover?.props as Record<string, unknown> | undefined;
		const popoverProps = assign(
			defaultPopoverProps,
			popoverPropsFromProp || {}
		);
		popoverProps.body = popoverBody;

		delete popoverProps.children;
		return popoverProps;
	}, [getId, assistiveText.popoverLabel, labels.cancelButton, labels.doneButton, handleClose, isOpenState, handleOpen, popover]);

	const getDialog = useCallback(({ menuRenderer }: { menuRenderer: ReactNode }) => {
		const position = menuPosition;

		if (!disabled && getIsOpen()) {
			const dialogProps = {
				align: 'bottom left' as const,
				context: iconSettingsContext,
				hasStaticAlignment,
				inheritWidthOf,
				onClose: handleClose,
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
				<Dialog {...(dialogProps as any)}>
					{menuRenderer}
				</Dialog>
			);
		}
		return null;
	}, [menuPosition, disabled, getIsOpen, iconSettingsContext, hasStaticAlignment, inheritWidthOf, handleClose, handleOpen, getTargetElement, getId]);

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
				onSelect={handleSelect as (event: React.MouseEvent, data: { option: ComboboxOption; selection?: ComboboxOption[] }) => void}
				onRenderMenuItem={onRenderMenuItem || menuItem}
				selection={selection}
				tooltipMenuItemDisabled={tooltipMenuItemDisabled}
				variant={menuVariant[variant]}
			/>
		);
	}, [variant, assistiveText, activeOption, activeOptionIndex, classNameMenu, classNameMenuSubHeader, inheritWidthOf, getId, value, isSelected, menuItemVisibleLength, labels.noOptionsFound, hasMenuSpinner, menuPosition, setMenuRefCallback, menuMaxWidth, getOptions, handleSelect, onRenderMenuItem, menuItem, selection, tooltipMenuItemDisabled]);

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
						onClick={() => openDialog()}
						onChange={handleInputChange}
						placeholder={labels.placeholder}
						defaultValue={defaultValue}
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
				assistiveText={assistiveText as unknown as { removePill?: string; selectedListboxLabel?: string; [key: string]: unknown }}
				events={{
					onBlurPill: handleBlurPill,
					onPillFocus: handlePillFocus as (event: React.FocusEvent, data: { index: number; option: SelectedListBoxOption }) => void,
					onRequestFocus: handleRequestFocusSelectedListbox as (event: unknown, data: { ref: HTMLElement | null }) => void,
					onRequestFocusOnNextPill: handleNavigateSelectedListbox as (event: React.SyntheticEvent, data: { direction: 'next' | 'previous' }) => void,
					onRequestFocusOnPreviousPill: handleNavigateSelectedListbox as (event: React.SyntheticEvent, data: { direction: 'next' | 'previous' }) => void,
					onRequestRemove: handleRemoveSelectedOption as (event: React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent, data: { index?: number; option: SelectedListBoxOption }) => void,
				}}
				id={`${getId()}-selected-listbox`}
				labels={labels}
				selectedListboxRef={setSelectedListboxRefCallback}
				selection={selection as SelectedListBoxOption[]}
				listboxHasFocus={listboxHasFocus}
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
						assistiveText={assistiveText as unknown as { removePill?: string; selectedListboxLabel?: string; [key: string]: unknown }}
						containerRole="listbox"
						containerAriaOrientation="horizontal"
						listboxRole="group"
						listboxAriaOrientation={null}
						events={{
							onBlurPill: handleBlurPill,
							onPillFocus: handlePillFocus as (event: React.FocusEvent, data: { index: number; option: SelectedListBoxOption }) => void,
							onRequestFocus: handleRequestFocusSelectedListbox as (event: unknown, data: { ref: HTMLElement | null }) => void,
							onRequestFocusOnNextPill: handleNavigateSelectedListbox as (event: React.SyntheticEvent, data: { direction: 'next' | 'previous' }) => void,
							onRequestFocusOnPreviousPill: handleNavigateSelectedListbox as (event: React.SyntheticEvent, data: { direction: 'next' | 'previous' }) => void,
							onRequestRemove: handleRemoveSelectedOption as (event: React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent, data: { index?: number; option: SelectedListBoxOption }) => void,
						}}
						id={`${getId()}-selected-listbox`}
						labels={labels}
						selectedListboxRef={setSelectedListboxRefCallback}
						selection={selection as SelectedListBoxOption[]}
						listboxHasFocus={listboxHasFocus}
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
						defaultValue={defaultValue}
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
						onClick={() => openDialog()}
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

		const inputValue =
			selection[0]?.label
				? selection[0].label as string
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
							defaultValue={defaultValue}
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
							onClick={() => requestOpenMenu()}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								if (!selection.length) {
									handleInputChange(event);
								}
							}}
							placeholder={labels.placeholder}
							readOnly={
								!!(predefinedOptionsOnly && activeOption) ||
								!!selection.length
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
		const popoverPropsFromProp = popover?.props as { body?: ReactNode } | undefined;
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
								aria-controls={
									getIsOpen() ? `${getId()}-popover` : undefined
								}
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
								onClick={() => openDialog()}
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
							defaultValue={defaultValue}
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
							onClick={() => requestOpenMenu()}
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
					assistiveText={assistiveText as unknown as { removePill?: string; selectedListboxLabel?: string; [key: string]: unknown }}
					events={{
						onBlurPill: handleBlurPill,
						onPillFocus: handlePillFocus as (event: React.FocusEvent, data: { index: number; option: SelectedListBoxOption }) => void,
						onRequestFocus: handleRequestFocusSelectedListbox as (event: unknown, data: { ref: HTMLElement | null }) => void,
						onRequestFocusOnNextPill: handleNavigateSelectedListbox as (event: React.SyntheticEvent, data: { direction: 'next' | 'previous' }) => void,
						onRequestFocusOnPreviousPill: handleNavigateSelectedListbox as (event: React.SyntheticEvent, data: { direction: 'next' | 'previous' }) => void,
						onRequestRemove: handleRemoveSelectedOption as (event: React.MouseEvent | React.KeyboardEvent | React.SyntheticEvent, data: { index?: number; option: SelectedListBoxOption }) => void,
					}}
					id={`${getId()}-selected-listbox`}
					labels={labels}
					selectedListboxRef={setSelectedListboxRefCallback}
					selection={selection as SelectedListBoxOption[]}
					listboxHasFocus={listboxHasFocus}
					variant={variant}
					renderAtSelectionLength={2}
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
							defaultValue={defaultValue}
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
							onClick={() => requestOpenMenu()}
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
		<div
			className={classNames('slds-form-element', classNameContainer)}
		>
			{entityCombobox ? null : (
				<Label
					assistiveText={assistiveText as unknown as { label?: string; [key: string]: unknown }}
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
			{variantRenderer
				? variantRenderer()
				: subRenders.base.multiple()}
		</div>
	);

	return entityCombobox ? (
		<div className="slds-form-element">
			<Label
				assistiveText={assistiveText as unknown as { label?: string; [key: string]: unknown }}
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

