import React from 'react';
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
import { AriaLiveMoveContexts } from './private/constants';
import LetterKeys from '~/utilities/letter-key-code';
import Keys from '~/utilities/key-code';
import { propTypes, defaultProps } from './prop-types';

/**
 * A DuelingPicklist is used to move options between two lists and is often
 * referred to as a multi-select. Sometimes, the list options can then be
 * re-ordered, depending on the use case.
 */
class DuelingPicklist extends React.Component {
	static propTypes = propTypes;
	static defaultProps = defaultProps;

	beginDrag = () => this.setState({ isDragging: true });

	constructor (props) {
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

	componentDidUpdate (prevProps, prevState) {
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
			lastSelectedId: null,
			focusedOptionId: null,
		};

		if (typeof callback === 'function') {
			this.setState(newState, callback);
		} else {
			this.setState(newState);
		}
	};

	deselectLockedItems (callback) {
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

	endDrag = () => this.setState({ isDragging: false });

	findItem (id) {
		const { options, selected } = this.props;
		return [...options, ...selected].find((item) => item.id === id);
	}

	findCategory (item) {
		const { options, selected } = this.props;
		return selected.some((s) => s.id === item.id) ? selected : options;
	}

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

	getDefaultedPropObj (propName) {
		return {
			...defaultProps[propName],
			...this.props[propName],
		};
	}

	getId (idName) {
		return this.props.ids[idName] || this.generatedIds[idName];
	}

	getIds () {
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
		const { isReorderable } = this.props;
		const {
			firstSelected,
			lastSelectedId,
			dragAndDropWithArrowKeys,
		} = this.state;

		if (lastSelectedId === null || lastSelectedId === undefined) {
			return;
		}

		const item = this.findItem(lastSelectedId);
		const { shiftKey, which, metaKey, ctrlKey } = event;
		const modifierUsed = ctrlKey || metaKey;

		const haltEvent = (stopPropagation = false) => {
			event.preventDefault();
			stopPropagation && event.stopPropagation();
		};

		switch (which) {
			case Keys.SPACE:
				if (modifierUsed) {
					haltEvent(true);
					return this.toggleFocusedSelection();
				}
				if (!this.props.isReorderable) {
					return;
				}
				haltEvent(true);
				return this.setState({
					dragAndDropWithArrowKeys: !dragAndDropWithArrowKeys,
				});
			case Keys.UP:
			case Keys.DOWN:
				haltEvent();
				const isUp = which === Keys.UP;
				return this.handleVerticalArrowKeyUp(
					item,
					isUp,
					shiftKey,
					modifierUsed
				);
			case Keys.LEFT:
			case Keys.RIGHT:
				if (modifierUsed) {
					haltEvent();
					const isLeft = which === Keys.LEFT;
					this.moveSelectedItemsHorizontally(isLeft, false);
				}
				return;
			case LetterKeys.A:
				if (modifierUsed) {
					haltEvent(true);
					this.selectAllInCategory(item);
				}
				return;
			case Keys.METALEFT:
			case Keys.METARIGHT:
			case Keys.CTRL:
				return this.setState({
					metaKey: true,
				});
			case Keys.SHIFT:
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

		if (handledFromFocus) {
			if (item.id === lastSelectedId) {
				return;
			}
			if (!selectRange) {
				selectRange = shiftKey;
			}
			if (!toggleOption) {
				toggleOption = metaKey || ctrlKey;
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
		if (selectRange && previousSelected && inSameCategory) {
			newSelection = getRange(category, previousSelected, item);
		} else if (toggleOption && inSameCategory) {
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

	handleVerticalArrowKeyUp (item, isUp, selectRange, moveFocus) {
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

	moveSelectedItemsHorizontally (isLeft, shouldDeselect = true) {
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

	moveItemsVertically (isUp) {
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

	render () {
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

	selectAllInCategory (item) {
		const selection = this.findCategory(item);
		this.setState({
			selection,
			firstSelected: selection[0],
			lastSelectedId: selection[selection.length - 1].id,
		});
	}

	toggleFocusedSelection () {
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

	triggerOnChange (newSelected, isLeft = false, shouldDeselect = false) {
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
