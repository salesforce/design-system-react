import classNames from 'classnames';
import { AriaLiveMoveContexts, AriaLiveMessages } from './constants';

function getIds(items) {
	return items.map((o) => o.id);
}

// MAGIC NUMBER BELOW - MAY CHANGE WITH STYLES
const HEIGHT_OF_AN_OPTION = 2.25;

/*
 * Calculates the height, in rems, based off of the maximum number of items in a
 * listbox. MAY CHANGE WITH STYLES.
 * Formula used: (2.25rem * maxItems) + 1rem
*/
export function getHeightForListboxBasedOnNumberOfOptions(maxItems) {
	return `${HEIGHT_OF_AN_OPTION * maxItems + 1}rem`;
}

export function filterNonSelectedItems(category, selectedItems) {
	const selectedIds = getIds(selectedItems);
	return category.filter((o) => !selectedIds.includes(o.id));
}

export function moveItemsInCategory(selectedItems, items, numSpaces) {
	const ids = getIds(selectedItems);
	const newOptions = items.filter((o) => !ids.includes(o.id));

	for (let i = 0; i < selectedItems.length; i++) {
		const selectedItem = selectedItems[i];
		const currentIndex = items.findIndex((o) => o.id === selectedItem.id);
		const newIndex = currentIndex + numSpaces;
		newOptions.splice(newIndex, 0, selectedItem);
	}

	return newOptions;
}

export function getRange(items, lastSelectedItem, item) {
	let indexOfLastSelected = null;
	let indexOfCurrentSelected = null;

	for (let i = 0; i < items.length; i++) {
		const currentId = items[i].id;
		if (currentId === item.id) {
			indexOfCurrentSelected = i;
		}
		if (currentId === lastSelectedItem.id) {
			indexOfLastSelected = i;
		}

		if (indexOfCurrentSelected !== null && indexOfLastSelected !== null) {
			break;
		}
	}

	const first = Math.min(indexOfCurrentSelected, indexOfLastSelected);
	const last = Math.max(indexOfCurrentSelected, indexOfLastSelected);
	return items.slice(first, last + 1);
}
export function getOrderedSelection(items, selectedItems) {
	const ids = getIds(selectedItems);
	return items.filter(({ id }) => ids.includes(id));
}

export function areItemsInCategory(items, category) {
	const ids = getIds(items);
	return category.some((o) => ids.includes(o.id));
}

export function areItemsAtEdgeOfCategory(isUp, items, category) {
	const ids = getIds(items);
	const first = category[0];
	const last = category.slice(-1)[0];

	return ids.some(
		(id) => (isUp && id === first.id) || (!isUp && id === last.id)
	);
}

export function getNewSelectionFromDragAndDropOntoCategory(
	selection,
	selectedItems
) {
	return [
		...filterNonSelectedItems(selection, selectedItems),
		...selectedItems,
	];
}

export function getNewSelectionFromDragAndDropOntoOption(
	selection,
	selectedItems,
	dropTargetItem,
	sourceIsAboveTarget
) {
	const indexPad = sourceIsAboveTarget ? 0 : 1;
	const dropTargetIndex = selection.findIndex(
		(s) => s.id === dropTargetItem.id
	);

	return [
		...filterNonSelectedItems(
			selection.slice(0, dropTargetIndex + indexPad),
			selectedItems
		),
		...selectedItems,
		...filterNonSelectedItems(
			selection.slice(dropTargetIndex + indexPad),
			selectedItems
		),
	];
}

export function getNewSelection(isRemoving, items, selection) {
	if (isRemoving) {
		const ids = getIds(items.filter(({ isLocked }) => !isLocked));
		return selection.filter((o) => !ids.includes(o.id));
	} else if (areItemsInCategory(items, selection)) {
		return selection;
	}
	return [...selection, ...items];
}

export function selectionChanged(selection, prevSelection) {
	if (selection.length !== prevSelection.length) {
		return true;
	}
	for (let i = 0; i < selection.length; i++) {
		if (selection[i].id !== prevSelection[i].id) {
			return true;
		}
	}
	return false;
}

export function wrapItemAndAddIsSelected(options, selected) {
	return options.map((option) => ({
		item: option,
		selected: selected.some((o) => o.id === option.id),
	}));
}

function getAriaLiveLabel(message, labels, selection) {
	const itemLabels = selection.map((item) => item.label);

	let words;
	if (itemLabels.length > 1) {
		words = `${itemLabels.slice(0, -1).join(', ')}, and ${
			itemLabels.slice(-1)[0]
		}`;
	} else {
		words = itemLabels[0];
	}

	return `${words} ${message} ${labels.selected}`;
}

export function getAriaLiveMessage({
	ariaLiveContext,
	assistiveText,
	labels,
	selection,
}) {
	if (!ariaLiveContext) {
		return null;
	}

	const {
		itemsSelected,
		itemsDeselected,
		selectedItemsReordered,
	} = assistiveText;

	switch (ariaLiveContext) {
		case AriaLiveMoveContexts.ItemsMovedToSelected:
			return (
				itemsSelected ||
				getAriaLiveLabel(AriaLiveMessages.MovedTo, labels, selection)
			);
		case AriaLiveMoveContexts.ItemsRemovedFromSelected:
			return (
				itemsDeselected ||
				getAriaLiveLabel(AriaLiveMessages.RemovedFrom, labels, selection)
			);
		case AriaLiveMoveContexts.ItemsReorderedInSelected:
			return (
				selectedItemsReordered ||
				getAriaLiveLabel(AriaLiveMessages.ReorderedIn, labels, selection)
			);
		default:
			return null;
	}
}

export function getColumnClassName(isResponsive) {
	return classNames('slds-dueling-list__column', {
		'slds-dueling-list__column_responsive': isResponsive,
	});
}
