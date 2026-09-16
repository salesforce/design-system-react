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
} from 'react';
import classNames from '../../utilities/class-names';
import { CAROUSEL } from '../../utilities/constants';
import {
	canUseDOM,
	canUseEventListeners,
} from '../../utilities/execution-environment';

import CarouselIndicators from './private/carousel-indicators';
import PreviousNextCarouselNavigator from './private/previous-next-carousel-navigator';
import CarouselItem from './private/carousel-item';
import AutoplayButton from './private/auto-play-button';

import KEYS from '../../utilities/key-code';
import EventUtil from '../../utilities/event';

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
	/** Current autoplay state */
	isAutoplayOn: boolean;
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
	/** Controlled current panel index */
	currentPanel?: number;
	/** Show autoplay button */
	hasAutoplay?: boolean;
	/** Show previous/next navigation buttons */
	hasPreviousNextPanelNavigation?: boolean;
	/** HTML id */
	id?: string;
	/** Controlled autoplay state */
	isAutoplayOn?: boolean;
	/** Enable infinite loop navigation */
	isInfinite?: boolean;
	/** Array of carousel items */
	items: CarouselItemData[];
	/** Number of items per panel */
	itemsPerPanel?: number;
	/** Custom item renderer */
	onRenderItem?: (item: CarouselItemData) => ReactElement;
	/** Called when autoplay toggle is requested */
	onRequestAutoplayToggle?: (
		event: MouseEvent | KeyboardEvent | FocusEvent | Record<string, unknown>,
		data: CarouselAutoplayData
	) => void;
	/** Called when panel change is requested */
	onRequestPanelChange?: (
		event: MouseEvent | KeyboardEvent | FocusEvent | Record<string, unknown>,
		data: CarouselPanelChangeData
	) => void;
	/** Called when an item is clicked */
	onItemClick?: (event: MouseEvent, data: CarouselItemClickData) => void;
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
	hasAutoplay = false,
	hasPreviousNextPanelNavigation = false,
	id: propId,
	isAutoplayOn: controlledIsAutoplayOn,
	isInfinite = false,
	items,
	itemsPerPanel = 1,
	onRenderItem,
	onRequestAutoplayToggle,
	onRequestPanelChange,
	onItemClick,
}: CarouselProps): ReactElement => {
	const generatedId = useId();
	const id = propId || generatedId;

	const assistiveText = { ...defaultAssistiveText, ...propAssistiveText };

	// Calculate number of panels
	const nrOfPanels = useMemo(
		() => Math.ceil(items.length / itemsPerPanel),
		[items.length, itemsPerPanel]
	);

	// Internal state (for uncontrolled mode)
	const [internalCurrentPanel, setInternalCurrentPanel] = useState(
		controlledCurrentPanel ?? 0
	);
	const [internalIsAutoplayOn, setInternalIsAutoplayOn] = useState(
		controlledIsAutoplayOn ?? hasAutoplay
	);
	const [indicatorsHaveFocus, setIndicatorsHaveFocus] = useState(false);
	const [stageWidth, setStageWidth] = useState(0);
	const [translateX, setTranslateX] = useState(-1000000);

	// Refs
	const stageRef = useRef<HTMLDivElement>(null);
	const autoplayIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const initialStageWidthRef = useRef<number>(0);

	// Derived state - use controlled values if provided
	const currentPanel =
		controlledCurrentPanel !== undefined
			? controlledCurrentPanel
			: internalCurrentPanel;
	const isAutoplayOn =
		controlledIsAutoplayOn !== undefined
			? controlledIsAutoplayOn
			: internalIsAutoplayOn;

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

	// Set current panel (internal or via callback)
	const setCurrentPanel = useCallback(
		(
			event: MouseEvent | KeyboardEvent | FocusEvent | Record<string, unknown>,
			panel: number,
			callback?: () => void
		) => {
			if (onRequestPanelChange) {
				onRequestPanelChange(event, {
					currentPanel,
					requestedPanel: panel,
				});
			} else {
				setInternalCurrentPanel(panel);
				// Use setTimeout to ensure state is updated before callback
				if (callback) {
					setTimeout(callback, 0);
				}
			}
		},
		[currentPanel, onRequestPanelChange]
	);

	// Stop autoplay
	const stopAutoplay = useCallback(
		(
			event: MouseEvent | KeyboardEvent | FocusEvent | Record<string, unknown>,
			ignoreCallbacksAndStateUpdates = false
		) => {
			if (autoplayIdRef.current) {
				clearInterval(autoplayIdRef.current);
				autoplayIdRef.current = null;
			}

			if (!ignoreCallbacksAndStateUpdates) {
				if (onRequestAutoplayToggle) {
					onRequestAutoplayToggle(event, { isAutoplayOn });
				} else {
					setInternalIsAutoplayOn(false);
				}
			}
		},
		[isAutoplayOn, onRequestAutoplayToggle]
	);

	// Start autoplay
	const startAutoplay = useCallback(
		(event: MouseEvent | KeyboardEvent | FocusEvent | Record<string, unknown>) => {
			autoplayIdRef.current = setInterval(() => {
				if (currentPanel < nrOfPanels - 1) {
					// Go to next panel
					let next = currentPanel + 1;
					if (next > nrOfPanels - 1) {
						next = 0;
					}
					setCurrentPanel(event, next, changeTranslationAutomatically);
				} else if (isInfinite) {
					// Loop back to start
					setCurrentPanel(event, 0, changeTranslationAutomatically);
				} else {
					// Stop at end
					stopAutoplay(event);
				}
			}, autoplayInterval);
		},
		[
			autoplayInterval,
			currentPanel,
			nrOfPanels,
			isInfinite,
			setCurrentPanel,
			changeTranslationAutomatically,
			stopAutoplay,
		]
	);

	// Panel navigation handlers
	const onNextPanelHandler = useCallback(
		(event: MouseEvent | KeyboardEvent) => {
			let next = currentPanel + 1;
			if (next > nrOfPanels - 1) {
				next = 0;
			}
			setCurrentPanel(event, next, changeTranslationAutomatically);
		},
		[currentPanel, nrOfPanels, setCurrentPanel, changeTranslationAutomatically]
	);

	const onPreviousPanelHandler = useCallback(
		(event: MouseEvent | KeyboardEvent) => {
			let prev = currentPanel - 1;
			if (prev < 0) {
				prev = nrOfPanels - 1;
			}
			setCurrentPanel(event, prev, changeTranslationAutomatically);
		},
		[currentPanel, nrOfPanels, setCurrentPanel, changeTranslationAutomatically]
	);

	// Indicator handlers
	const onIndicatorBlur = useCallback(() => {
		setIndicatorsHaveFocus(false);
	}, []);

	const onIndicatorClickHandler = useCallback(
		(event: MouseEvent, panel: number) => {
			setCurrentPanel(event, panel, changeTranslationAutomatically);
			setIndicatorsHaveFocus(true);
			if (isAutoplayOn) {
				stopAutoplay(event);
			}
		},
		[
			setCurrentPanel,
			changeTranslationAutomatically,
			isAutoplayOn,
			stopAutoplay,
		]
	);

	const onIndicatorFocus = useCallback(
		(event: FocusEvent) => {
			setIndicatorsHaveFocus(true);
			if (isAutoplayOn) {
				stopAutoplay(event);
			}
		},
		[isAutoplayOn, stopAutoplay]
	);

	// Autoplay button handler
	const onAutoplayBtnClick = useCallback(
		(event: MouseEvent) => {
			if (onRequestAutoplayToggle) {
				onRequestAutoplayToggle(event, { isAutoplayOn });
			} else {
				const actionToTake = isAutoplayOn ? stopAutoplay : startAutoplay;
				setInternalIsAutoplayOn(!isAutoplayOn);
				actionToTake(event);
			}
		},
		[isAutoplayOn, onRequestAutoplayToggle, stopAutoplay, startAutoplay]
	);

	// Keyboard handler
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const keyDownCallbacks: Record<number, () => void> = {
				[KEYS.LEFT]: () => {
					if (isInfinite || canGoToPrevious()) {
						onPreviousPanelHandler(event);
						setIndicatorsHaveFocus(true);
						if (isAutoplayOn) {
							stopAutoplay(event);
						}
					}
				},
				[KEYS.RIGHT]: () => {
					if (isInfinite || canGoToNext()) {
						onNextPanelHandler(event);
						setIndicatorsHaveFocus(true);
						if (isAutoplayOn) {
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
			isAutoplayOn,
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
			// Clean up autoplay on unmount
			if (autoplayIdRef.current) {
				clearInterval(autoplayIdRef.current);
			}
		};
	}, [setDimensions]);

	// Effect: Update translation when currentPanel or stageWidth changes
	useEffect(() => {
		changeTranslationAutomatically();
	}, [changeTranslationAutomatically]);

	// Effect: Handle autoplay state changes (controlled mode)
	useEffect(() => {
		if (controlledIsAutoplayOn !== undefined) {
			if (controlledIsAutoplayOn && !autoplayIdRef.current) {
				startAutoplay({});
			} else if (!controlledIsAutoplayOn && autoplayIdRef.current) {
				stopAutoplay({}, true);
			}
		}
	}, [controlledIsAutoplayOn, startAutoplay, stopAutoplay]);

	// Effect: Start autoplay on mount if enabled
	useEffect(() => {
		if (isAutoplayOn && !autoplayIdRef.current) {
			startAutoplay({});
		}
		// Only run on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Computed values
	const isPreviousBtnDisabled = !(isInfinite || canGoToPrevious());
	const isNextBtnDisabled = !(isInfinite || canGoToNext());
	const itemWidth = (stageWidth || initialStageWidthRef.current) / itemsPerPanel;
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
								if (isAutoplayOn) {
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
										if (isAutoplayOn) {
											stopAutoplay(event);
										}
									}}
									onRenderItem={onRenderItem}
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
								if (isAutoplayOn) {
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














