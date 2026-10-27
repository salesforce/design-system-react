/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useId,
	type ReactNode,
	type CSSProperties,
	type MouseEvent,
	type KeyboardEvent,
	type FocusEvent,
} from 'react';

import SelectedListBox from './private/selected-listbox';
import { PILL_CONTAINER } from '../../utilities/constants';
import checkProps from './check-props';
import componentDoc from './component.json';

/**
 * Pill option structure
 */
export interface PillOption {
	/** Avatar component or config */
	avatar?:
		| ReactNode
		| {
				imgSrc?: string;
				title?: string;
				variant?: string;
		  };
	/** Bare style */
	bare?: boolean;
	/** Error state */
	error?: boolean;
	/** Icon component or config */
	icon?:
		| ReactNode
		| {
				category?: string;
				name?: string;
		  };
	/** Unique identifier */
	id?: string;
	/** Display label */
	label?: ReactNode | string;
	/** Hover title */
	title?: string;
	/** Allow additional properties */
	[key: string]: unknown;
}

/**
 * Assistive text for PillContainer
 */
export interface PillContainerAssistiveText {
	/** Label for the listbox */
	listboxLabel?: string;
	/** Text for remove action */
	removePill?: string;
}

/**
 * Labels for PillContainer
 */
export interface PillContainerLabels {
	/** Title for remove button */
	removePillTitle?: string;
}

/**
 * Pill event data
 */
export interface PillEventData {
	index: number;
	option: PillOption;
}

/**
 * Event callbacks for PillContainer
 */
export interface PillContainerEvents {
	/** Called when a pill is clicked */
	onClickPill?: (
		event: MouseEvent | KeyboardEvent,
		data: PillEventData
	) => void;
	/** Called when a pill is requested to be removed via the Delete/Backspace key or the remove icon */
	onRequestRemovePill?: (
		event: MouseEvent | KeyboardEvent,
		data: PillEventData
	) => void;
}

/**
 * Props for the PillContainer component
 */
export interface PillContainerProps {
	/** Assistive text for accessibility */
	assistiveText?: PillContainerAssistiveText;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * **Event callbacks**
	 * * `onClickPill`: Called when a pill is clicked.
	 * * `onRequestRemovePill`: Called when a pill is requested to be removed via the Delete/Backspace key or the remove icon.
	 */
	events?: PillContainerEvents;
	/** HTML id */
	id?: string;
	/** Text labels */
	labels?: PillContainerLabels;
	/** Array of pill options */
	options?: PillOption[];
	/**
	 * Pill click handler. Ignored when `events.onClickPill` is provided.
	 * @deprecated use `events.onClickPill`
	 */
	onClickPill?: (
		event: MouseEvent | KeyboardEvent,
		data: PillEventData
	) => void;
	/**
	 * Remove request handler. Ignored when `events.onRequestRemovePill` is provided.
	 * @deprecated use `events.onRequestRemovePill`
	 */
	onRequestRemovePill?: (
		event: MouseEvent | KeyboardEvent,
		data: PillEventData
	) => void;
	/** Custom styles */
	style?: CSSProperties;
	/** Container variant */
	variant?: 'base' | 'bare';
}

const defaultAssistiveText: PillContainerAssistiveText = {
	listboxLabel: 'Selected Options:',
	removePill: 'Press delete or backspace to remove',
};

const defaultLabels: PillContainerLabels = {
	removePillTitle: 'Remove',
};

/**
 * A PillContainer is a container that holds one or more pills.
 * Use it for a list of pills in a container that resembles an input form field.
 */
const PillContainer = ({
	assistiveText: propAssistiveText,
	className,
	events,
	id: propId,
	labels: propLabels,
	options = [],
	onClickPill: deprecatedOnClickPill,
	onRequestRemovePill: deprecatedOnRequestRemovePill,
	style,
	variant,
}: PillContainerProps): React.ReactElement | null => {
	const generatedId = useId();
	const id = propId || generatedId;

	// Check props in development
	useEffect(() => {
		checkProps(
			PILL_CONTAINER,
			{
				onClickPill: deprecatedOnClickPill,
				onRequestRemovePill: deprecatedOnRequestRemovePill,
			},
			componentDoc
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Only run on mount

	// `events.*` takes precedence over the deprecated flat props
	const onClickPill = events?.onClickPill ?? deprecatedOnClickPill;
	const onRequestRemovePill =
		events?.onRequestRemovePill ?? deprecatedOnRequestRemovePill;

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };
	const labels = { ...defaultLabels, ...propLabels };

	const [activeSelectedOption, setActiveSelectedOption] = useState<
		PillOption | undefined
	>(options[0] || undefined);
	const [activeSelectedOptionIndex, setActiveSelectedOptionIndex] = useState(0);
	const [listboxHasFocus, setListboxHasFocus] = useState(false);

	const activeSelectedOptionRef = useRef<HTMLElement | null>(null);
	const preserveFocusRef = useRef(false);

	// Reset active option when options change
	useEffect(() => {
		if (
			(options.length > 0 && !options[activeSelectedOptionIndex]) ||
			preserveFocusRef.current
		) {
			resetActiveSelectedOption();
			preserveFocusRef.current = false;
		}
	}, [options, activeSelectedOptionIndex]);

	const resetActiveSelectedOption = useCallback(() => {
		let newIndex = activeSelectedOptionIndex;

		if (!options[newIndex]) {
			if (options.length > 0 && newIndex >= options.length) {
				newIndex = options.length - 1;
			} else {
				newIndex = 0;
			}
		}

		setActiveSelectedOption(options[newIndex] || undefined);
		setActiveSelectedOptionIndex(newIndex);
		setListboxHasFocus(!!options[newIndex]);
	}, [options, activeSelectedOptionIndex]);

	const getNewActiveOptionIndex = useCallback(
		(currentIndex: number, offset: number): number => {
			const nextIndex = currentIndex + offset;
			return options.length > nextIndex && nextIndex >= 0
				? nextIndex
				: currentIndex;
		},
		[options.length]
	);

	const handleBlurPill = useCallback(() => {
		if (!preserveFocusRef.current) {
			setListboxHasFocus(false);
		} else {
			preserveFocusRef.current = false;
		}
	}, []);

	const handleClickPill = useCallback(
		(
			event: MouseEvent | KeyboardEvent,
			data: { index: number; option: PillOption }
		) => {
			if (onClickPill) {
				onClickPill(event, { index: data.index, option: data.option });
			}
		},
		[onClickPill]
	);

	const handlePillFocus = useCallback(
		(_event: FocusEvent, data: { index: number; option: PillOption }) => {
			if (!listboxHasFocus) {
				setActiveSelectedOption(data.option);
				setActiveSelectedOptionIndex(data.index);
				setListboxHasFocus(true);
			}
		},
		[listboxHasFocus]
	);

	const handleNavigatePillContainer = useCallback(
		(
			_event: React.SyntheticEvent | React.KeyboardEvent,
			{ direction }: { direction: 'next' | 'previous' }
		) => {
			const offsets = { next: 1, previous: -1 };
			const isLastOptionAndRightIsPressed =
				activeSelectedOptionIndex + 1 === options.length &&
				direction === 'next';
			const isFirstOptionAndLeftIsPressed =
				activeSelectedOptionIndex === 0 && direction === 'previous';

			let newIndex: number;
			let newOption: PillOption;

			if (isLastOptionAndRightIsPressed) {
				newIndex = 0;
				newOption = options[0];
			} else if (isFirstOptionAndLeftIsPressed) {
				newIndex = options.length - 1;
				newOption = options[options.length - 1];
			} else {
				newIndex = getNewActiveOptionIndex(
					activeSelectedOptionIndex,
					offsets[direction]
				);
				newOption = options[newIndex];
			}

			preserveFocusRef.current = true;
			setActiveSelectedOption(newOption);
			setActiveSelectedOptionIndex(newIndex);
			setListboxHasFocus(true);
		},
		[activeSelectedOptionIndex, options, getNewActiveOptionIndex]
	);

	const handleRequestFocusPillContainer = useCallback(
		(_event: unknown, { ref }: { ref: HTMLElement | null }) => {
			if (ref) {
				activeSelectedOptionRef.current = ref;
				activeSelectedOptionRef.current.focus();
			}
		},
		[]
	);

	const handleRequestRemove = useCallback(
		(
			event: MouseEvent | KeyboardEvent | React.SyntheticEvent,
			data: { index?: number; option: PillOption }
		) => {
			if (onRequestRemovePill && data.index !== undefined) {
				preserveFocusRef.current = true;
				onRequestRemovePill(event as MouseEvent | KeyboardEvent, {
					index: data.index,
					option: data.option,
				});
			}
		},
		[onRequestRemovePill]
	);

	if (options.length === 0) {
		return null;
	}

	return (
		<SelectedListBox
			activeOption={activeSelectedOption}
			activeOptionIndex={activeSelectedOptionIndex}
			assistiveText={{
				removePill: assistiveText.removePill,
				selectedListboxLabel: assistiveText.listboxLabel,
			}}
			className={className}
			events={{
				onBlurPill: handleBlurPill,
				onClickPill: handleClickPill,
				onPillFocus: handlePillFocus,
				onRequestFocus: handleRequestFocusPillContainer,
				onRequestFocusOnNextPill: handleNavigatePillContainer,
				onRequestFocusOnPreviousPill: handleNavigatePillContainer,
				onRequestRemove: handleRequestRemove,
			}}
			id={`${id}-listbox-of-pill-options`}
			isBare={variant === 'bare'}
			isPillContainer
			labels={labels}
			listboxHasFocus={listboxHasFocus}
			multiselectable
			renderAtSelectionLength={0}
			selection={options}
			style={style}
		/>
	);
};

PillContainer.displayName = PILL_CONTAINER;

export default PillContainer;
