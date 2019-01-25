/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import shortid from 'shortid';
import LetterKeys from '~/utilities/letter-key-code';
import Keys from '~/utilities/key-code';
import Group from './private/group';
import {
	areItemsAtEdgeOfCategory,
	areItemsInCategory,
	getNewSelection,
	getNewSelectionFromDragAndDropOntoCategory,
	getNewSelectionFromDragAndDropOntoOption,
	getOrderedSelection,
	getRange,
	moveItemsInCategory,
	selectionChanged,
} from './private/utility';
import { AriaLiveMoveContexts } from './private/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility** Tested with Mocha framework.
	 * This object is merged with the default props object on every render.
	 * * `optionDragLabel`: Instructions on how to drag and drop with a keyboard.
	 * * `itemLocked`: Used as title for locked items.
	 * * `itemsSelected`: Used in Aria Live area to inform user that items were moved to selected.
	 * * `itemsDeselected`: Used in Aria Live area to inform user that items were removed from selected.
	 * * `lockedItemCannotBeMoved`: Used to label locked items.
	 * * `selectedItemsReordered`: Used in Aria Live area to inform user that selected items were reordered.
	 * * `moveSelectionDown`: Used by "down" reordering button.
	 * * `moveSelectionUp`: Used by "up" reordering button.
	 * * `moveSelectionToSelected`: Used by "right" button, which moves items to selected.
	 * * `moveSelectionToOptions`: Used by "left" button, which removes items from selection.
	 */
	assistiveText: PropTypes.shape({
		optionDragLabel: PropTypes.string,
		itemLocked: PropTypes.string,
		itemsSelected: PropTypes.string,
		itemsDeselected: PropTypes.string,
		lockedItemCannotBeMoved: PropTypes.string,
		selectedItemsReordered: PropTypes.string,
		moveSelectionDown: PropTypes.string,
		moveSelectionUp: PropTypes.string,
		moveSelectionToOptions: PropTypes.string,
		moveSelectionToSelected: PropTypes.string,
	}),

	/**
	 * Event Callbacks
	 * * `onChange`: Called when items are added or removed from `selection`. Tested with Mocha framework.
	 */
	events: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
	}).isRequired,

	/**
	 * When true, the height of both listboxes will be the smallest height needed to show all items without having to scroll. Tested with Mocha framework.
	 */

	hasAutomaticHeightMinimization: PropTypes.bool,

	/**
	 * Element id prefixes (used for accessibility). If not provided, ids will be generated with shortid. Tested with Mocha framework.
	 * * `picklistGroupLabel`: id for labeling the `<DuelingPicklist />` component.
	 * * `dragLiveRegion`: id for Aria Live element.
	 * * `optionDragLabel`: id for describing how to use keyboard interactions.
	 * * `optionsLabel`: id for options listbox.
	 * * `selectedLabel`: id for selection listbox.
	 */
	ids: PropTypes.shape({
		picklistGroupLabel: PropTypes.string,
		dragLiveRegion: PropTypes.string,
		optionDragLabel: PropTypes.string,
		optionsLabel: PropTypes.string,
		selectedLabel: PropTypes.string,
	}),

	/**
	 * When true, all interactions are disabled. Tested with snapshot testing.
	 */
	isDisabled: PropTypes.bool,

	/**
	 * When true, component renders in view mode. Tested with Mocha framework.
	 */
	isViewOnly: PropTypes.bool,

	/**
	 * allows the user to reorder the second listbox of options. Tested with Mocha framework.
	 */
	isReorderable: PropTypes.bool,

	/**
	 * When true, a red asterisk will render, visually marking the item as required. Tested with snapshot testing.
	 */
	isRequired: PropTypes.bool,
	/**
	 * When true, the component will be render with responsive css classes applied. Any items longer than the space available will truncate with ellipses. Tested with Mocha framework.
	 */
	isResponsive: PropTypes.bool,

	/**
	 * Labels. Tested with Mocha framework.
	 * * `group`: A `DuelingPicklist` should have a group label, similar to using a `fieldset` HTML element.
	 * * `options`: Label for options.
	 * * `selected`: Label for selected.
	 * * `viewModeSelectedItems`: Labels selected items in View Mode.
	 */
	labels: PropTypes.shape({
		group: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		options: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		selected: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		viewModeSelectedItems: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string,
		]),
	}),

	/**
	 * Manually sets the height of both listboxes. Tested with Mocha framework.
	 */
	listboxHeight: PropTypes.string,

	/**
	 * Items in the first listbox. Tested with Mocha framework.
	 * * `label`: Item label.
	 * * `id`: Unique id for the item.
	 */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	).isRequired,

	/**
	 * Items in the second listbox. Tested with Mocha framework.
	 * * `label`: Item label.
	 * * `id`: Unique id for the item.
	 * * `isLocked`: When true, a lock icon renders on the item, and the item cannot be removed from the selection.
	 */
	selected: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			isLocked: PropTypes.bool,
		})
	).isRequired,

	/**
	 * Component that provides contextual information next to the `group.label. Tested with snapshot testing.`
	 */
	tooltip: PropTypes.node,
};

const defaultProps = {
	labels: {
		group: 'Select Options',
		options: 'First Category',
		selected: 'Second Category',
		viewModeSelectedItems: 'Selected Items',
	},
	assistiveText: {
		optionDragLabel:
			'Press space bar when on an item, to move it within the list. CMD plus left and right arrow keys, to move items between lists.',
		moveSelectionUp: 'Move Selection Up',
		moveSelectionDown: 'Move Selection Down',
		itemLocked: 'Locked item',
		lockedItemCannotBeMoved: 'Item cannot be moved',
	},
	ids: {},
};

/**
 * A DuelingPicklist is used to move options between two lists and is often
 * referred to as a multi-select. Sometimes, the list options can then be
 * re-ordered, depending on the use case.
 */
class DuelingPicklist extends React.Component {
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	constructor(props) {
		super(props);
		this.state = {
			selection: [],
			firstSelected: null,
			lastSelectedId: null,
			dragAndDropWithArrowKeys: false,
			shiftKey: null,
			metaKey: null,
			ariaLiveContext: null,
			focusedOptionId: null,
		};
		this.generatedIds = {
			picklistGroupLabel: shortid.generate(),
			dragLiveRegion: shortid.generate(),
			optionDragLabel: shortid.generate(),
			optionsLabel: shortid.generate(),
			selectedLabel: shortid.generate(),
		};
		this.optionRefs = [...this.props.options, ...this.props.selected].reduce(
			(acc, curr) => ({
				...acc,
				[curr.id]: React.createRef(),
			}),
			{}
		);
	}

	componentDidUpdate(prevProps, prevState) {
		const { selected } = this.props;
		const { ariaLiveContext, selection } = this.state;
		const prevSelected = prevProps.selected;

		if (selectionChanged(selected, prevSelected)) {
			let newAriaLiveContext;

			if (prevSelected.length < selected.length) {
				newAriaLiveContext = AriaLiveMoveContexts.ItemsMovedToSelected;
			} else if (prevSelected.length > selected.length) {
				newAriaLiveContext = AriaLiveMoveContexts.ItemsRemovedFromSelected;
			} else {
				newAriaLiveContext = AriaLiveMoveContexts.ItemsReorderedInSelected;
			}

			this.updateAriaLiveContext(newAriaLiveContext);
		} else if (
			ariaLiveContext &&
			selectionChanged(selection, prevState.selection)
		) {
			this.updateAriaLiveContext(null);
		}
	}

	getId(idName) {
		return this.props.ids[idName] || this.generatedIds[idName];
	}

	getIds() {
		return {
			picklistGroupLabel: `${this.getId(
				'picklistGroupLabel'
			)}-picklist-group-label`,
			dragLiveRegion: `${this.getId('dragLiveRegion')}-drag-live-region`,
			optionDragLabel: `${this.getId('optionDragLabel')}-option-drag-label`,
			optionsLabel: `${this.getId('optionsLabel')}-options-label`,
			selectedLabel: `${this.getId('selectedLabel')}-selected-label`,
		};
	}

	getDefaultedPropObj(propName) {
		return {
			...defaultProps[propName],
			...this.props[propName],
		};
	}

	findItem(id) {
		const { options, selected } = this.props;
		return [...options, ...selected].find((item) => item.id === id);
	}

	findCategory(item) {
		const { options, selected } = this.props;
		return selected.some((s) => s.id === item.id) ? selected : options;
	}

	deselectLockedItems(callback) {
		const nonLockedSelection = this.state.selection.filter((s) => !s.isLocked);
		if (nonLockedSelection.length > 0) {
			this.setState(
				{
					selection: nonLockedSelection,
				},
				callback
			);
		} else {
			callback();
		}
	}

	beginDrag = () => this.setState({ isDragging: true });

	deselect = (callback = null) => {
		const newState = {
			selection: [],
			firstSelected: null,
			lastSelectedId: null,
			focusedOptionId: null,
		};

		if (typeof callback === 'function') {
			this.setState(newState, callback);
		} else {
			this.setState(newState);
		}
	};

	endDrag = () => this.setState({ isDragging: false });

	focus = (preserveSelection = false) => {
		const { lastSelectedId } = this.state;
		const ref = this.optionRefs[lastSelectedId];

		if (ref && ref.current && ref.current !== document.activeElement) {
			ref.current.focus();
		}

		const changes = {
			focusedOptionId: lastSelectedId,
		};

		if (!preserveSelection) {
			changes.selection = this.state.selection.slice();
		}
		this.setState(changes);
	};

	handleDropIntoCategory = () => {
		const newSelected = getNewSelectionFromDragAndDropOntoCategory(
			this.props.selected,
			this.state.selection
		);

		this.triggerOnChange(newSelected);
	};

	handleDropOntoOption = (dropTarget, sourceIsAboveTarget) => {
		const { selected } = this.props;
		const { selection } = this.state;

		const newSelected = getNewSelectionFromDragAndDropOntoOption(
			selected,
			selection,
			dropTarget.item,
			sourceIsAboveTarget
		);

		this.triggerOnChange(newSelected);
	};

	handleKeyUp = () => {
		const { shiftKey, metaKey } = this.state;

		if (shiftKey || metaKey) {
			this.setState({
				shiftKey: null,
				metaKey: null,
			});
		}
	};

	handleKeyDown = (event) => {
		const { isReorderable } = this.props;
		const { lastSelectedId, dragAndDropWithArrowKeys } = this.state;

		if (lastSelectedId === null || lastSelectedId === undefined) {
			return;
		}

		const item = this.findItem(lastSelectedId);
		const { shiftKey, which, metaKey, ctrlKey } = event;
		const modifierUsed = ctrlKey || metaKey;

		const haltEvent = (stopPropagation = false) => {
			event.preventDefault();
			if (stopPropagation) {
				event.stopPropagation();
			}
		};

		const isUp = which === Keys.UP;
		const isLeft = which === Keys.LEFT;

		switch (which) {
			case Keys.SPACE:
				if (modifierUsed) {
					haltEvent(true);
					this.toggleFocusedSelection();
					break;
				}
				if (!isReorderable) {
					break;
				}
				haltEvent(true);
				this.setState({
					dragAndDropWithArrowKeys: !dragAndDropWithArrowKeys,
				});
				break;
			case Keys.UP:
			case Keys.DOWN:
				haltEvent();
				this.handleVerticalArrowKeyUp(item, isUp, shiftKey, modifierUsed);
				break;
			case Keys.LEFT:
			case Keys.RIGHT:
				if (modifierUsed) {
					haltEvent();
					this.moveSelectedItemsHorizontally(isLeft, false);
				}
				break;
			case LetterKeys.A:
				if (modifierUsed) {
					haltEvent(true);
					this.selectAllInCategory(item);
				}
				break;
			case Keys.METALEFT:
			case Keys.METARIGHT:
			case Keys.CTRL:
				this.setState({
					metaKey: true,
				});
				break;
			case Keys.SHIFT:
				haltEvent();
				this.setState({
					shiftKey: true,
				});
				break;
			default:
				break;
		}
	};

	handleMoveItemDownClick = () => {
		this.moveItemsVertically(false);
	};

	handleMoveItemUpClick = () => {
		this.moveItemsVertically(true);
	};

	handleMoveSelectedItemsLeftClick = () => {
		this.moveSelectedItemsHorizontally(true);
	};

	handleMoveSelectedItemsRightClick = () => {
		this.moveSelectedItemsHorizontally(false);
	};

	handleSelect = (
		item,
		selectRange,
		toggleOption,
		handledFromFocus = false
	) => {
		const {
			selection,
			firstSelected,
			lastSelectedId,
			metaKey,
			shiftKey,
			ctrlKey,
		} = this.state;

		let isSelectRange = selectRange;
		let isToggleOption = toggleOption;

		if (handledFromFocus) {
			if (item.id === lastSelectedId) {
				return;
			}
			if (!isSelectRange) {
				isSelectRange = shiftKey;
			}
			if (!isToggleOption) {
				isToggleOption = metaKey || ctrlKey;
			}
		}

		const category = this.findCategory(item);
		let inSameCategory = true;
		if (lastSelectedId) {
			inSameCategory = category.some((o) => o.id === lastSelectedId);
		}
		let newSelection;
		let newFirstSelected = firstSelected || item;

		const previousSelected =
			firstSelected || (lastSelectedId && this.findItem(lastSelectedId));
		if (isSelectRange && previousSelected && inSameCategory) {
			newSelection = getRange(category, previousSelected, item);
		} else if (isToggleOption && inSameCategory) {
			newSelection = getOrderedSelection(category, selection.concat(item));
		} else {
			newSelection = [item];
			newFirstSelected = item;
		}

		this.setState(
			{
				selection: newSelection,
				firstSelected: newFirstSelected,
				lastSelectedId: item.id,
			},
			this.focus
		);
	};

	handleVerticalArrowKeyUp(item, isUp, selectRange, moveFocus) {
		const { selected } = this.props;
		const { dragAndDropWithArrowKeys } = this.state;
		const category = this.findCategory(item);
		const index = category.findIndex((o) => o.id === item.id);

		const isFirstItem = index === 0;
		const isLastItem = index === category.length - 1;
		if ((isUp && isFirstItem) || (!isUp && isLastItem)) {
			return;
		}

		if (dragAndDropWithArrowKeys && category === selected) {
			this.moveItemsVertically(isUp);
			return;
		}

		const adjacentItem = category[index + (isUp ? -1 : 1)];
		if (moveFocus) {
			const { id } = adjacentItem;
			this.setState({ lastSelectedId: id, focusedOptionId: id }, () => {
				this.focus(true);
			});
		} else {
			this.handleSelect(adjacentItem, selectRange, false);
		}
	}

	moveSelectedItemsHorizontally(isLeft, shouldDeselect = true) {
		const { selection } = this.state;
		if (selection.length === 0) {
			return;
		}

		const { options, selected } = this.props;
		const category = isLeft ? options : selected;

		const allSelectedItemsInCategory = selection.every((a) =>
			category.some((b) => a.id === b.id)
		);
		if (!allSelectedItemsInCategory) {
			const newSelected = getNewSelection(isLeft, selection, selected);
			this.triggerOnChange(newSelected, isLeft, shouldDeselect);
		}
	}

	moveItemsVertically(isUp) {
		const { options, selected, isReorderable } = this.props;
		if (!isReorderable) {
			return;
		}
		const { selection } = this.state;

		const inFirstCategory = areItemsInCategory(selection, options);
		const atEdge = areItemsAtEdgeOfCategory(isUp, selection, selected);
		if (inFirstCategory || atEdge) {
			return;
		}

		const numSpaces = isUp ? -1 : 1;
		const newSelected = moveItemsInCategory(selection, selected, numSpaces);

		this.triggerOnChange(newSelected);
	}

	updateAriaLiveContext(ariaLiveContext) {
		this.setState({ ariaLiveContext });
	}

	selectAllInCategory(item) {
		const selection = this.findCategory(item);
		this.setState({
			selection,
			firstSelected: selection[0],
			lastSelectedId: selection[selection.length - 1].id,
		});
	}

	toggleFocusedSelection() {
		const { focusedOptionId, selection } = this.state;
		const item = this.findItem(focusedOptionId);
		let newSelection;
		if (selection.some(({ id }) => id === focusedOptionId)) {
			newSelection = selection.filter(({ id }) => id !== focusedOptionId);
		} else {
			newSelection = selection.concat(item);
		}
		const category = this.findCategory(item);
		this.setState({
			selection: getOrderedSelection(category, newSelection),
		});
	}

	triggerOnChange(newSelected, isLeft = false, shouldDeselect = false) {
		const trigger = () => this.props.events.onChange(newSelected);

		if (shouldDeselect) {
			this.deselect(trigger);
		} else if (isLeft) {
			this.deselectLockedItems(trigger);
		} else {
			trigger();
		}
	}

	render() {
		return (
			<Group
				{...this.props}
				{...this.state}
				assistiveText={this.getDefaultedPropObj('assistiveText')}
				labels={this.getDefaultedPropObj('labels')}
				ids={this.getIds()}
				refs={this.optionRefs}
				events={{
					onBeginDrag: this.beginDrag,
					onEndDrag: this.endDrag,
					onDropOntoOption: this.handleDropOntoOption,
					onDropIntoCategory: this.handleDropIntoCategory,
					onKeyUp: this.handleKeyUp,
					onKeyDown: this.handleKeyDown,
					onFocus: this.focus,
					onMoveSelectionLeftClick: this.handleMoveSelectedItemsLeftClick,
					onMoveSelectionRightClick: this.handleMoveSelectedItemsRightClick,
					onMoveSelectionUpClick: this.handleMoveItemUpClick,
					onMoveSelectionDownClick: this.handleMoveItemDownClick,
					onSelect: this.handleSelect,
				}}
			/>
		);
	}
}

export default DragDropContext(HTML5Backend)(DuelingPicklist);
