/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import {
	useState,
	useEffect,
	useRef,
	useCallback,
	useId,
	useMemo,
	type KeyboardEvent,
	type MouseEvent,
	type FocusEvent,
	type ReactElement,
	type ReactNode,
} from 'react';
import classNames from '../../utilities/class-names';
import { CAROUSEL } from '../../utilities/constants';
import {
	canUseDOM,
	canUseEventListeners,
} from '../../utilities/execution-environment';

import CarouselIndicators from './private/carousel-indicators';
import PreviousNextCarouselNavigator from './private/previous-next-carousel-navigator';
import CarouselItem, { type CarouselItemProps } from './private/carousel-item';
import AutoplayButton from './private/auto-play-button';
import checkProps from './check-props';
import componentDoc from './component.json';

import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';
import { useControllableState } from '../../utilities/hooks';

/**
 * Carousel item data structure
 */
export interface CarouselItemData {
	/** Unique identifier for the item */
	id: string;
	/** Primary heading text */
	heading?: string;
	/** Description text */
	description?: string;
	/** Button label for call to action */
	buttonLabel?: string;
	/** Image alt text */
	imageAssistiveText?: string;
	/** Link URL */
	href?: string;
	/** Image source URL */
	src?: string;
}

/**
 * Assistive text for Carousel
 */
export interface CarouselAssistiveText {
	/** Autoplay button assistive text */
	autoplayButton?: string;
	/** Next panel button assistive text */
	nextPanel?: string;
	/** Previous panel button assistive text */
	previousPanel?: string;
}

/**
 * Panel change event data
 */
export interface CarouselPanelChangeData {
	/** Current panel index */
	currentPanel: number;
	/** Requested panel index */
	requestedPanel: number;
}

/**
 * Autoplay toggle event data
 */
export interface CarouselAutoplayData {
	/** Requested (next) autoplay state: `true` to start autoplay, `false` to stop it */
	isAutoplayOn: boolean;
}

/**
 * Event passed to `onRequestPanelChange`: the click or key event that caused the request,
 * or `undefined` when autoplay advanced the panel.
 */
export type CarouselPanelChangeEvent = MouseEvent | KeyboardEvent | undefined;

/**
 * Event passed to `onRequestAutoplayToggle`: the click, key or focus event that caused the
 * request, or `undefined` when autoplay stopped itself at the last panel.
 */
export type CarouselAutoplayToggleEvent =
	MouseEvent | KeyboardEvent | FocusEvent | undefined;

/**
 * Item passed to `renderItem`: the item's fields plus the layout values the Carousel computed for it
 */
export type CarouselRenderItem = Omit<
	CarouselItemProps,
	'onClick' | 'renderItem'
>;

/**
 * Argument passed to `renderItem`
 */
export interface CarouselRenderItemData {
	/** The item to render */
	item: CarouselRenderItem;
}

/**
 * Item click event data
 */
export interface CarouselItemClickData {
	/** The clicked item */
	item: CarouselItemData;
}

/**
 * Props for the Carousel component
 */
export interface CarouselProps {
	/** Assistive text for accessibility */
	assistiveText?: CarouselAssistiveText;
	/** Autoplay interval in milliseconds */
	autoplayInterval?: number;
	/** CSS classes */
	className?: string | string[] | Record<string, boolean>;
	/**
	 * Current panel index when the panel is controlled. When set, the carousel only changes panel when
	 * this prop changes: update it from `onRequestPanelChange`. Leave it `undefined` for an uncontrolled
	 * carousel (see `defaultCurrentPanel`).
	 */
	currentPanel?: number;
	/** Initial panel index of an uncontrolled carousel (`currentPanel` is `undefined`). Defaults to `0`. */
	defaultCurrentPanel?: number;
	/**
	 * Enables autoplay and shows the autoplay (play / pause) button. Whether autoplay is running comes
	 * from `isAutoplayOn` / `defaultIsAutoplayOn`; when neither is set, autoplay starts on mount.
	 */
	hasAutoplay?: boolean;
	/** Show previous/next navigation buttons */
	hasPreviousNextPanelNavigation?: boolean;
	/** HTML id */
	id?: string;
	/**
	 * Autoplay state when it is controlled (only has an effect with `hasAutoplay`). When set, autoplay
	 * only starts and stops when this prop changes: update it from `onRequestAutoplayToggle`. Leave it
	 * `undefined` for uncontrolled autoplay (see `defaultIsAutoplayOn`).
	 */
	isAutoplayOn?: boolean;
	/**
	 * Initial autoplay state when uncontrolled (`isAutoplayOn` is `undefined`; only has an effect with
	 * `hasAutoplay`). When not set, it follows `hasAutoplay`, so autoplay starts on mount.
	 */
	defaultIsAutoplayOn?: boolean;
	/** Enable infinite loop navigation */
	isInfinite?: boolean;
	/** Array of carousel items */
	items: CarouselItemData[];
	/** Number of items per panel */
	itemsPerPanel?: number;
	/** @deprecated Use `renderItem` instead. */
	onRenderItem?: (data: CarouselRenderItemData) => ReactNode;
	/**
	 * Called when autoplay toggle is requested, controlled or not. `data.isAutoplayOn` is the requested
	 * (next) state. `event` is `undefined` when autoplay stops itself at the last panel.
	 */
	onRequestAutoplayToggle?: (
		event: CarouselAutoplayToggleEvent,
		data: CarouselAutoplayData
	) => void;
	/**
	 * Called when panel change is requested, controlled or not. `data.requestedPanel` is the requested
	 * (next) panel. `event` is `undefined` when autoplay advanced the panel.
	 */
	onRequestPanelChange?: (
		event: CarouselPanelChangeEvent,
		data: CarouselPanelChangeData
	) => void;
	/** Called when an item is clicked */
	onItemClick?: (event: MouseEvent, data: CarouselItemClickData) => void;
	/** Renders the content of each item in place of the default image, heading and description. Receives `{ item }`. */
	renderItem?: (data: CarouselRenderItemData) => ReactNode;
}

const defaultAssistiveText: CarouselAssistiveText = {
	autoplayButton: 'Start / Stop auto-play',
	nextPanel: 'Next Panel',
	previousPanel: 'Previous Panel',
};

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
const Carousel = ({
	assistiveText: propAssistiveText,
	autoplayInterval = 4000,
	className,
	currentPanel: controlledCurrentPanel,
	defaultCurrentPanel = 0,
	hasAutoplay = false,
	hasPreviousNextPanelNavigation = false,
	id: propId,
	isAutoplayOn: controlledIsAutoplayOn,
	defaultIsAutoplayOn,
	isInfinite = false,
	items,
	itemsPerPanel = 1,
	onRenderItem,
	onRequestAutoplayToggle,
	onRequestPanelChange,
	onItemClick,
	renderItem: renderItemProp,
}: CarouselProps): ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;
	// `onRenderItem` is deprecated
	const renderItem = renderItemProp ?? onRenderItem;

	// Check props in development
	useEffect(() => {
		checkProps(CAROUSEL, { onRenderItem }, componentDoc);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Only run on mount

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	// Calculate number of panels
	const nrOfPanels = useMemo(
		() => Math.ceil(items.length / itemsPerPanel),
		[items.length, itemsPerPanel]
	);

	// Panel and autoplay state: controlled when the value prop is set, otherwise internal
	const [currentPanel, setCurrentPanelState] = useControllableState(
		controlledCurrentPanel,
		defaultCurrentPanel
	);
	// Back-compat: with neither `isAutoplayOn` nor `defaultIsAutoplayOn`, `hasAutoplay` starts autoplay
	const [isAutoplayOn, setIsAutoplayOn] = useControllableState(
		controlledIsAutoplayOn,
		defaultIsAutoplayOn ?? hasAutoplay
	);
	// Autoplay only runs when the feature (and its pause button) is enabled
	const isAutoplayRunning = hasAutoplay && isAutoplayOn;
	const [indicatorsHaveFocus, setIndicatorsHaveFocus] = useState(false);
	const [stageWidth, setStageWidth] = useState(0);
	const [translateX, setTranslateX] = useState(-1000000);

	// Refs
	const stageRef = useRef<HTMLDivElement>(null);
	const initialStageWidthRef = useRef<number>(0);

	// Helper functions
	const canGoToNext = useCallback(
		() => currentPanel < nrOfPanels - 1,
		[currentPanel, nrOfPanels]
	);

	const canGoToPrevious = useCallback(() => currentPanel > 0, [currentPanel]);

	const getPanelId = useCallback(
		({ carouselId, itemId }: { carouselId: string; itemId: string }) =>
			`content-id-${carouselId}-${itemId}`,
		[]
	);

	// Update translation based on current panel
	const changeTranslationAutomatically = useCallback(() => {
		const width = stageWidth || initialStageWidthRef.current;
		setTranslateX(-(width * currentPanel));
	}, [stageWidth, currentPanel]);

	// Request a panel change: updates internal state when uncontrolled, always reports the request
	const setCurrentPanel = useCallback(
		(event: CarouselPanelChangeEvent, panel: number) => {
			setCurrentPanelState(panel);
			onRequestPanelChange?.(event, {
				currentPanel,
				requestedPanel: panel,
			});
		},
		[currentPanel, onRequestPanelChange, setCurrentPanelState]
	);

	// Request an autoplay change: updates internal state when uncontrolled, always reports the request
	const requestAutoplay = useCallback(
		(event: CarouselAutoplayToggleEvent, nextIsAutoplayOn: boolean) => {
			setIsAutoplayOn(nextIsAutoplayOn);
			onRequestAutoplayToggle?.(event, { isAutoplayOn: nextIsAutoplayOn });
		},
		[onRequestAutoplayToggle, setIsAutoplayOn]
	);

	const stopAutoplay = useCallback(
		(event: CarouselAutoplayToggleEvent) => {
			requestAutoplay(event, false);
		},
		[requestAutoplay]
	);

	// One autoplay step. Panel changes and the final stop come from the timer, so they carry no event.
	const autoplayStep = () => {
		if (currentPanel < nrOfPanels - 1) {
			setCurrentPanel(undefined, currentPanel + 1);
		} else if (isInfinite) {
			// Loop back to start
			setCurrentPanel(undefined, 0);
		} else {
			// Stop at end
			stopAutoplay(undefined);
		}
	};
	// Latest step, so the interval never acts on a stale panel
	const autoplayStepRef = useRef(autoplayStep);
	useEffect(() => {
		autoplayStepRef.current = autoplayStep;
	});

	// Panel navigation handlers
	const onNextPanelHandler = useCallback(
		(event: MouseEvent | KeyboardEvent) => {
			let next = currentPanel + 1;
			if (next > nrOfPanels - 1) {
				next = 0;
			}
			setCurrentPanel(event, next);
		},
		[currentPanel, nrOfPanels, setCurrentPanel]
	);

	const onPreviousPanelHandler = useCallback(
		(event: MouseEvent | KeyboardEvent) => {
			let prev = currentPanel - 1;
			if (prev < 0) {
				prev = nrOfPanels - 1;
			}
			setCurrentPanel(event, prev);
		},
		[currentPanel, nrOfPanels, setCurrentPanel]
	);

	// Indicator handlers
	const onIndicatorBlur = useCallback(() => {
		setIndicatorsHaveFocus(false);
	}, []);

	const onIndicatorClickHandler = useCallback(
		(event: MouseEvent, panel: number) => {
			setCurrentPanel(event, panel);
			setIndicatorsHaveFocus(true);
			if (isAutoplayRunning) {
				stopAutoplay(event);
			}
		},
		[setCurrentPanel, isAutoplayRunning, stopAutoplay]
	);

	const onIndicatorFocus = useCallback(
		(event: FocusEvent) => {
			setIndicatorsHaveFocus(true);
			if (isAutoplayRunning) {
				stopAutoplay(event);
			}
		},
		[isAutoplayRunning, stopAutoplay]
	);

	// Autoplay button handler
	const onAutoplayBtnClick = useCallback(
		(event: MouseEvent) => {
			requestAutoplay(event, !isAutoplayOn);
		},
		[isAutoplayOn, requestAutoplay]
	);

	// Keyboard handler
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const keyDownCallbacks: Record<number, () => void> = {
				[KEYS.LEFT]: () => {
					if (isInfinite || canGoToPrevious()) {
						onPreviousPanelHandler(event);
						setIndicatorsHaveFocus(true);
						if (isAutoplayRunning) {
							stopAutoplay(event);
						}
					}
				},
				[KEYS.RIGHT]: () => {
					if (isInfinite || canGoToNext()) {
						onNextPanelHandler(event);
						setIndicatorsHaveFocus(true);
						if (isAutoplayRunning) {
							stopAutoplay(event);
						}
					}
				},
			};

			if (keyDownCallbacks[event.keyCode]) {
				EventUtil.trapImmediate(event);
				keyDownCallbacks[event.keyCode]();
			}
		},
		[
			isInfinite,
			canGoToPrevious,
			canGoToNext,
			onPreviousPanelHandler,
			onNextPanelHandler,
			isAutoplayRunning,
			stopAutoplay,
		]
	);

	// Set dimensions on resize
	const setDimensions = useCallback(() => {
		if (canUseDOM && stageRef.current?.offsetWidth !== undefined) {
			setStageWidth(stageRef.current.offsetWidth);
		}
	}, []);

	// Effect: Mount - measure stage width and set up resize listener
	useEffect(() => {
		if (canUseDOM && stageRef.current?.offsetWidth !== undefined) {
			initialStageWidthRef.current = stageRef.current.offsetWidth;
			setStageWidth(stageRef.current.offsetWidth);
		}

		if (canUseEventListeners) {
			window.addEventListener('resize', setDimensions, false);
		}

		return () => {
			if (canUseEventListeners) {
				window.removeEventListener('resize', setDimensions, false);
			}
		};
	}, [setDimensions]);

	// Effect: Update translation when currentPanel or stageWidth changes
	useEffect(() => {
		changeTranslationAutomatically();
	}, [changeTranslationAutomatically]);

	// Effect: run the autoplay timer while autoplay is on (controlled or not); cleared on stop and unmount
	useEffect(() => {
		if (!isAutoplayRunning) {
			return undefined;
		}
		const autoplayId = setInterval(() => {
			autoplayStepRef.current();
		}, autoplayInterval);
		return () => clearInterval(autoplayId);
	}, [isAutoplayRunning, autoplayInterval]);

	// Computed values
	const isPreviousBtnDisabled = !(isInfinite || canGoToPrevious());
	const isNextBtnDisabled = !(isInfinite || canGoToNext());
	const itemWidth =
		(stageWidth || initialStageWidthRef.current) / itemsPerPanel;
	const carouselMargins = hasPreviousNextPanelNavigation
		? { marginLeft: '44px', marginRight: '44px' }
		: {};

	return (
		<div
			className={classNames('slds-carousel', className as string)}
			id={id}
			onKeyDown={handleKeyDown}
		>
			<div className="slds-grid_vertical slds-col slds-path__scroller">
				{hasAutoplay && (
					<AutoplayButton
						assistiveText={assistiveText.autoplayButton}
						isAutoplayOn={isAutoplayOn}
						onClick={onAutoplayBtnClick}
					/>
				)}
				<div className="slds-is-relative" style={carouselMargins}>
					{hasPreviousNextPanelNavigation && (
						<PreviousNextCarouselNavigator
							assistiveText={assistiveText.previousPanel}
							iconName="chevronleft"
							isDisabled={isPreviousBtnDisabled}
							onClick={(event: MouseEvent) => {
								if (isAutoplayRunning) {
									stopAutoplay(event);
								}
								onPreviousPanelHandler(event);
							}}
							inlineStyle={{ left: '-38px' }}
						/>
					)}
					<div ref={stageRef} className="slds-carousel__stage slds-show">
						<div
							className="slds-carousel__panels slds-is-relative"
							style={{
								transform: `translateX(${translateX}px)`,
							}}
						>
							{items.map((item, index) => (
								<CarouselItem
									key={item.id}
									carouselId={id}
									getPanelId={getPanelId}
									onClick={(event: MouseEvent) => {
										onItemClick?.(event, { item });
									}}
									onFocus={(event: FocusEvent) => {
										if (isAutoplayRunning) {
											stopAutoplay(event);
										}
									}}
									renderItem={renderItem}
									{...item}
									isInCurrentPanel={
										index >= currentPanel * itemsPerPanel &&
										index < currentPanel * itemsPerPanel + itemsPerPanel
									}
									itemWidth={itemWidth}
									panelIndex={Math.ceil((index + 1) / itemsPerPanel) - 1}
								/>
							))}
						</div>
					</div>
					{hasPreviousNextPanelNavigation && (
						<PreviousNextCarouselNavigator
							assistiveText={assistiveText.nextPanel}
							iconName="chevronright"
							isDisabled={isNextBtnDisabled}
							onClick={(event: MouseEvent) => {
								if (isAutoplayRunning) {
									stopAutoplay(event);
								}
								onNextPanelHandler(event);
							}}
							inlineStyle={{ right: '-38px' }}
						/>
					)}
				</div>
				<CarouselIndicators
					noOfIndicators={nrOfPanels}
					carouselId={id}
					currentIndex={currentPanel}
					getPanelId={getPanelId}
					hasFocus={indicatorsHaveFocus}
					onBlur={onIndicatorBlur}
					onClick={onIndicatorClickHandler}
					onFocus={onIndicatorFocus}
					items={items}
					itemsPerPanel={itemsPerPanel}
				/>
			</div>
		</div>
	);
};

Carousel.displayName = CAROUSEL;

export default Carousel;
