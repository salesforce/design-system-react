import React from 'react';
import PropTypes from 'prop-types';
import Group from './private/group';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import shortid from 'shortid';
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
import { KeyCodes, AriaLiveMoveContexts } from './private/constants';

const propTypes = {
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `itemDragLabel`: Instructions on how to drag and drop with a keyboard.
	 * * `itemLocked`: Used to label locked items.
	 * * `itemsSelected`: Used in Aria Live area to inform user that items were moved to selected.
	 * * `itemsDeselected`: Used in Aria Live area to inform user that items were removed from selected.
	 * * `selectedItemsReordered`: Used in Aria Live area to inform user that selected items were reordered.
	 * * `moveSelectionDown`: Used by "down" reordering button.
	 * * `moveSelectionUp`: Used by "up" reordering button.
	 * * `moveSelectionToSelected`: Used by "right" button, which moves items to selected.
	 * * `moveSelectionToOptions`: Used by "left" button, which removes items from selection.
	 */

	assistiveText: PropTypes.shape({
		itemDragLabel: PropTypes.string,
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
	 * * `onChange`: Called when items are added or removed from `selection`
	 */
	events: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
	}).isRequired,

	/**
	 * When true, the height of both listboxes will be the smallest height needed to show all items without having to scroll.
	 */

	hasAutomaticHeightMinimization: PropTypes.bool,

	/**
	 * Element id prefixes (used for accessibility). If not provided, ids will be generated with shortid.
	 * * `picklistGroupLabel`: id for labeling the `<DuelingPicklist />` component.
	 * * `dragLiveRegion`: id for Aria Live element.
	 * * `itemDragLabel`: id for describing how to use keyboard interactions.
	 * * `optionsLabel`: id for options listbox.
	 * * `selectedLabel`: id for selection listbox.
	 */
	ids: PropTypes.shape({
		picklistGroupLabel: PropTypes.string,
		dragLiveRegion: PropTypes.string,
		itemDragLabel: PropTypes.string,
		optionsLabel: PropTypes.string,
		selectedLabel: PropTypes.string,
	}),

	/**
	 * When true, all interactions are disabled.
	 */
	isDisabled: PropTypes.bool,

	/**
	 * When true, component renders in view mode.
	 */
	isViewOnly: PropTypes.bool,

	/**
	 * allows the user to reorder the second listbox of options
	 */
	isReorderable: PropTypes.bool,

	/**
	 * When true, a red asterisk will render, visually marking the item as required.
	 */
	isRequired: PropTypes.bool,
	/**
	 * When true, the component will be render with responsive css classes applied. Any items longer than the space available will truncate with ellipses.
	 */
	isResponsive: PropTypes.bool,

	/**
	 * Labels
	 * * `group`: A `DuelingPicklist` should have a group label, similar to using a `fieldset` HTML element.
	 * * `options`: Label for options.
	 * * `selected`: Label for selected.
	 * * `selectedItems`: Labels selected items in View Mode.
	 */
	labels: PropTypes.shape({
		group: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		options: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		selected: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		selectedItems: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	}),

	/**
	 * Manually sets the height of both listboxes.
	 */
	listboxHeight: PropTypes.string,

	/**
	 * Items in the first listbox
	 * * `label`: Item label.
	 * * `id`: Unique id for the item.
	 * * `isLocked`: When true, a lock icon renders on the item, and the item cannot be moved to or from selected.
	 */
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			isLocked: PropTypes.bool,
		})
	).isRequired,

	/**
	 * Items in the second listbox
	 * * `label`: Item label.
	 * * `id`: Unique id for the item.
	 * * `isLocked`: When true, a lock icon renders on the item, and the item cannot be moved to or from the selection.
	 */
	selected: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			isLocked: PropTypes.bool,
		})
	).isRequired,

	/**
	 * Component that provides contextual information next to the `group.label`
	 */
	tooltip: PropTypes.node,
};

const defaultProps = {
	labels: {
		group: 'Select Options',
		options: 'First Category',
		selected: 'Second Category',
		selectedItems: 'Selected Items',
	},
	assistiveText: {
		itemDragLabel:
			'Press space bar when on an item, to move it within the list. CMD plus left and right arrow keys, to move items between lists.',
		moveSelectionUp: 'Move Selection Up',
		moveSelectionDown: 'Move Selection Down',
		itemLocked: 'Locked item',
		lockedItemCannotBeMoved: 'Item cannot be moved',
	},
	ids: {},
};

class DuelingPicklist extends React.Component {
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	beginDrag = () => this.setState({ isDragging: true });

	constructor(props) {
		super(props);
		this.state = {
			selection: [],
			firstSelected: null,
			lastSelected: null,
			dragAndDropWithArrowKeys: false,
			shiftKey: null,
			metaKey: null,
			ariaLiveContext: null,
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
			let ariaLiveContext;

			if (prevSelected.length < selected.length) {
				ariaLiveContext = AriaLiveMoveContexts.ItemsMovedToSelection;
			} else if (prevSelected.length > selected.length) {
				ariaLiveContext = AriaLiveMoveContexts.ItemsRemovedFromSelection;
			} else {
				ariaLiveContext = AriaLiveMoveContexts.ItemsReorderedInSelection;
			}

			this.setState({ ariaLiveContext });
		} else if (
			ariaLiveContext &&
			selectionChanged(selection, prevState.selection)
		) {
			this.setState({ ariaLiveContext: null });
		}
	}

	deselect = (callback = null) => {
		const newState = {
			selection: [],
			firstSelected: null,
			lastSelected: null,
		};

		if (typeof callback === 'function') {
			this.setState(newState, callback);
		} else {
			this.setState(newState);
		}
	};

	deselectLockedItems(callback) {
		const nonLockedSelection = this.state.selection.filter((s) => !s.locked);
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

	endDrag = () => this.setState({ isDragging: false });

	findCategoryForOption(option) {
		const { options, selected } = this.props;

		return selected.some((s) => s.id === option.item.id) ? selected : options;
	}

	focus = () => {
		const option = this.state.lastSelected;
		const selection = this.state.selection.slice();
		const ref = this.optionRefs[option.id];

		if (ref && ref.current && ref.current !== document.activeElement) {
			ref.current.focus();
			this.setState({ selection });
		}
	};

	getDefaultedPropObj(propName) {
		return {
			...defaultProps[propName],
			...this.props[propName],
		};
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
			itemDragLabel: `${this.getId('itemDragLabel')}-item-drag-label`,
			optionsLabel: `${this.getId('optionsLabel')}-options-label`,
			selectedLabel: `${this.getId('selectedLabel')}-selected-label`,
		};
	}

	handleDropIntoCategory = (dragSource) => {
		const newSelected = getNewSelectionFromDragAndDropOntoCategory(
			this.props.selected,
			this.state.selection
		);

		this.triggerOnChange(newSelected);
	};

	handleDropOntoOption = (dropTarget, sourceIsAboveTarget) => {
		const { allowReordering, selected } = this.props;
		const { selection } = this.state;

		const newSelected = getNewSelectionFromDragAndDropOntoOption(
			selected,
			selection,
			dropTarget.item,
			sourceIsAboveTarget
		);

		this.triggerOnChange(newSelected);
	};

	handleKeyUp = (event) => {
		const { shiftKey, metaKey } = this.state;

		if (shiftKey || metaKey) {
			this.setState({
				shiftKey: null,
				metaKey: null,
			});
		}
	};

	handleKeyDown = (event) => {
		const { shiftKey, which, metaKey, ctrlKey } = event;

		const { isReorderable } = this.props;
		const {
			firstSelected,
			lastSelected,
			dragAndDropWithArrowKeys,
		} = this.state;

		if (!lastSelected) {
			return;
		}

		const modifierUsed = ctrlKey || metaKey;

		const option = { item: lastSelected };
		const haltEvent = (stopPropagation = false) => {
			event.preventDefault();
			stopPropagation && event.stopPropagation();
		};

		switch (which) {
			case KeyCodes.Space:
				if (modifierUsed) {
					haltEvent(true);
					return this.deselect();
				}
				if (!isReorderable) {
					return;
				}
				haltEvent(true);
				return this.setState({
					dragAndDropWithArrowKeys: !dragAndDropWithArrowKeys,
				});
			case KeyCodes.Up:
				haltEvent();
				return this.handleVerticalArrowKeyUp(option, true, shiftKey);
			case KeyCodes.Down:
				haltEvent();
				return this.handleVerticalArrowKeyUp(option, false, shiftKey);
			case KeyCodes.Left:
				if (modifierUsed) {
					haltEvent();
					this.moveSelectedItemsHorizontally(true, false);
				}
				return;
			case KeyCodes.Right:
				if (modifierUsed) {
					haltEvent();
					this.moveSelectedItemsHorizontally(false, false);
				}
				return;
			case KeyCodes.A:
				if (modifierUsed) {
					haltEvent(true);
					this.selectAllInCategory(option);
				}
				return;
			case KeyCodes.MetaLeft:
			case KeyCodes.MetaRight:
			case KeyCodes.Ctrl:
				return this.setState({
					metaKey: true,
				});
			case KeyCodes.Shift:
				haltEvent();
				return this.setState({
					shiftKey: true,
				});
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
		option,
		selectRange,
		selectAdditionalItem,
		handledFromFocus = false
	) => {
		const {
			selection,
			firstSelected,
			lastSelected,
			metaKey,
			shiftKey,
			ctrlKey,
		} = this.state;
		const { item } = option;

		if (handledFromFocus) {
			if (lastSelected && item.id === lastSelected.id) {
				return;
			}
			if (!selectRange) {
				selectRange = shiftKey;
			}
			if (!selectAdditionalItem) {
				selectAdditionalItem = metaKey || ctrlKey;
			}
		}

		const category = this.findCategoryForOption(option);
		let inSameCategory = true;
		if (lastSelected) {
			inSameCategory = category.some((o) => o.id === lastSelected.id);
		}
		let newSelection;
		let newFirstSelected = firstSelected || item;

		const previousSelected = firstSelected || lastSelected;
		if (selectRange && previousSelected && inSameCategory) {
			newSelection = getRange(category, previousSelected, item);
		} else if (selectAdditionalItem && inSameCategory) {
			newSelection = getOrderedSelection(category, selection.concat(item));
		} else {
			newSelection = [item];
			newFirstSelected = item;
		}

		this.setState(
			{
				selection: newSelection,
				firstSelected: newFirstSelected,
				lastSelected: item,
			},
			this.focus
		);
	};

	handleVerticalArrowKeyUp(option, isUp, selectRange) {
		const { selected } = this.props;
		const { dragAndDropWithArrowKeys } = this.state;
		const category = this.findCategoryForOption(option);
		const index = category.findIndex((o) => o.id === option.item.id);

		const isFirstItem = index === 0;
		const isLastItem = index === category.length - 1;
		if ((isUp && isFirstItem) || (!isUp && isLastItem)) {
			return;
		}

		if (dragAndDropWithArrowKeys && category === selection) {
			this.moveItemsVertically(isUp);
		} else {
			const adjacentOption = {
				item: category[index + (isUp ? -1 : 1)],
			};
			this.handleSelect(adjacentOption, selectRange, false);
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

	render() {
		return (
			<Group
				{...this.props}
				{...this.state}
				assistiveText={this.getDefaultedPropObj('assistiveText')}
				labels={this.getDefaultedPropObj('labels')}
				ids={this.getIds()}
				refs={this.optionRefs}
				onBeginDrag={this.beginDrag}
				onEndDrag={this.endDrag}
				onDropOntoOption={this.handleDropOntoOption}
				onDropIntoCategory={this.handleDropIntoCategory}
				onKeyUp={this.handleKeyUp}
				onKeyDown={this.handleKeyDown}
				onFocus={this.focus}
				onMoveSelectionLeftClick={this.handleMoveSelectedItemsLeftClick}
				onMoveSelectionRightClick={this.handleMoveSelectedItemsRightClick}
				onMoveSelectionUpClick={this.handleMoveItemUpClick}
				onMoveSelectionDownClick={this.handleMoveItemDownClick}
				onSelect={this.handleSelect}
			/>
		);
	}

	selectAllInCategory(option) {
		const selection = this.findCategoryForOption(option);
		this.setState({
			selection,
			firstSelected: selection[0],
			lastSelected: selection[selection.length - 1],
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
}

export default DragDropContext(HTML5Backend)(DuelingPicklist);
