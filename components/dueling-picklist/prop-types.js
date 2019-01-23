import PropTypes from 'prop-types';

export const propTypes = {
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
	 * * `selectedItems`: Labels selected items in View Mode.
	 */
	labels: PropTypes.shape({
		group: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		options: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		selected: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
		selectedItems: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
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

export const defaultProps = {
	labels: {
		group: 'Select Options',
		options: 'First Category',
		selected: 'Second Category',
		selectedItems: 'Selected Items',
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
