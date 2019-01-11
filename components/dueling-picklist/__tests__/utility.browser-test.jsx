import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
	moveItemsInCategory,
	getRange,
	getOrderedSelection,
	areItemsInCategory,
	areItemsAtEdgeOfCategory,
	getNewSelectionFromDragAndDropOntoCategory,
	getNewSelectionFromDragAndDropOntoOption,
	getNewSelection,
	selectionChanged,
} from '~/components/dueling-picklist/private/utility';
chai.use(chaiEnzyme());

describe('moveItemsInCategory', () => {
	function testMoveItemsInCategory({ selectedItems, options, numSpaces, expected }) {
		const result = moveItemsInCategory(selectedItems, options, numSpaces);
		expect(result).to.eql(expected);
	}

	const options = [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
	];

	it('moves a single item', () => {
		testMoveItemsInCategory({
			options,
			selectedItems: [
				{ id: 1 }
			],
			numSpaces: 1,
			expected: [
				{ id: 2 },
				{ id: 1 },
				{ id: 3 },
				{ id: 4 },
			]
		});
	});
	
	it('moves 2 selectedItems', () => {
		testMoveItemsInCategory({
			options,
			selectedItems: [
				{ id: 2 },
				{ id: 3 },
			],
			numSpaces: 1,
			expected: [
				{ id: 1 },
				{ id: 4 },
				{ id: 2 },
				{ id: 3 },
			]
		});
	});

	it('moves selectedItems backwards', () => {
		testMoveItemsInCategory({
			options,
			selectedItems: [
				{ id: 3 },
				{ id: 4 },
			],
			numSpaces: -1,
			expected: [
				{ id: 1 },
				{ id: 3 },
				{ id: 4 },
				{ id: 2 },
			]
		});
	});
});

describe('getRange', () => {
	function testGetRange({ items, lastSelectedItem, item, expected }) {
		const result = getRange(items, lastSelectedItem, item, expected);
		expect(result).to.eql(expected);
	}
	
	const items = [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
	];

	it('selects a range with 1 item', () => {
		testGetRange({
			items,
			lastSelectedItem: { id: 2 },
			item: { id: 2 },
			expected: [
				{ id: 2 },
			],
		});
	});

	it('selects a range with 2 items', () => {
		testGetRange({
			items,
			lastSelectedItem: { id: 1 },
			item: { id: 2 },
			expected: [
				{ id: 1 },
				{ id: 2 },
			],
		});
	});
	
	it('selects entire items', () => {
		testGetRange({
			items,
			lastSelectedItem: { id: 3 },
			item: { id: 1 },
			expected: items,
		});
	});
});

describe('getOrderedSelection', () => {
	const items = [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
	];
	
	function testGetOrderedSelection({ items, selectedItems, expected }) {
		const result = getOrderedSelection(items, selectedItems, expected);
		expect(result).to.eql(expected);
	}
	
	it('works with 1 selected item', () => {
		testGetOrderedSelection({
			items,
			selectedItems: [
				{ id: 1 },
			],
			expected: [
				{ id: 1 },
			]
		});
	});

	it('works with 2 adjacent items', () => {
		testGetOrderedSelection({
			items,
			selectedItems: [
				{ id: 2 },
				{ id: 3 },
			],
			expected: [
				{ id: 2 },
				{ id: 3 },
			]
		});
	});

	it('works with 2 non-adjacent items, selected out of order', () => {
		testGetOrderedSelection({
			items,
			selectedItems: [
				{ id: 3 },
				{ id: 1 },
			],
			expected: [
				{ id: 1 },
				{ id: 3 },
			]
		});
	});

	it('works with many items, selected in any order', () => {
		testGetOrderedSelection({
			items: [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
				{ id: 5 },
				{ id: 6 },
				{ id: 7 },
			],
			selectedItems: shuffle([
				{ id: 6 },
				{ id: 1 },
				{ id: 7 },
				{ id: 4 },
				{ id: 2 },
			]),
			expected: [
				{ id: 1 },
				{ id: 2 },
				{ id: 4 },
				{ id: 6 },
				{ id: 7 },
			]
		});
	});
});

describe('areItemsInCategory', () => {
	function testAreItemsInCategory({ items, category, expected }) {
		const result = areItemsInCategory(items, category);
		expect(result).to.equal(expected);
	}

	it('handles 1 item', () => {
		testAreItemsInCategory({
			items: [
				{ id: 1 },
			],
			category: [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
			],
			expected: true,
		});
		testAreItemsInCategory({
			items: [
				{ id: 7 },
			],
			category: [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
			],
			expected: false,
		});
	});

	it('handles many items', () => {
		const category = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
		testAreItemsInCategory({
			category,
			items: [
				{ id: 1 },
				{ id: 3 },
			],
			expected: true,
		});
		testAreItemsInCategory({
			category,
			items: [
				{ id: 6 },
				{ id: 7 },
			],
			expected: false,
		});
	});
});

describe('areItemsAtEdgeOfCategory', () => {
	function testAreItemsAtEdgeOfCategory({ isUp, items, category, expected }) {
		const result = areItemsAtEdgeOfCategory(isUp, items, category);
		expect(result).to.equal(expected);
	}
	
	it('works with 1 item', () => {
		const category = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
		const runTest = (isUp, itemId, expected) => testAreItemsAtEdgeOfCategory({
			category,
			items: [ { id: itemId } ],
			isUp,
			expected
		});

		runTest(true, 1, true);
		runTest(false, 1, false);
		runTest(true, 2, false);
		runTest(false, 2, false);
		runTest(true, 3, false);
		runTest(false, 3, true);
	});
	
	it('works with multiple items', () => {
		const category = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
		
		const runTest = (isUp, itemIds, expected) => testAreItemsAtEdgeOfCategory({
			category,
			items: itemIds.map(id => ({ id })),
			isUp,
			expected
		});
		
		runTest(true, [1, 2], true);
		runTest(false, [1, 2], false);
		runTest(true, [2, 3], false);
		runTest(false, [2, 3], true);
		runTest(true, [1, 3], true);
		runTest(false, [1, 3], true);
	});
});

describe('getNewSelectionFromDragAndDropOntoCategory', () => {
	function testGetNewSelectionFromDragAndDropOntoCategory({ selection, selectedItems, expected }) {
		const result = getNewSelectionFromDragAndDropOntoCategory(selection, selectedItems);
		expect(result).to.eql(expected);
	}
	
	it('moves 1 item', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];

		testGetNewSelectionFromDragAndDropOntoCategory({
			selection,
			selectedItems: [
				{ id: 1 },
			],
			expected: [
				{ id: 2 },
				{ id: 3 },
				{ id: 1 },
			],
		});
		testGetNewSelectionFromDragAndDropOntoCategory({
			selection,
			selectedItems: [
				{ id: 2 },
			],
			expected: [
				{ id: 1 },
				{ id: 3 },
				{ id: 2 },
			],
		});

		testGetNewSelectionFromDragAndDropOntoCategory({
			selection,
			selectedItems: [
				{ id: 3 },
			],
			expected: selection,
		});
	});
	
	it('moves multiple items', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];

		testGetNewSelectionFromDragAndDropOntoCategory({
			selection,
			selectedItems: selection,
			expected: selection,
		});

		testGetNewSelectionFromDragAndDropOntoCategory({
			selection,
			selectedItems: [
				{ id: 2 },
				{ id: 3 },
			],
			expected: selection,
		});

		testGetNewSelectionFromDragAndDropOntoCategory({
			selection,
			selectedItems: [
				{ id: 1 },
				{ id: 2 },
			],
			expected: [
				{ id: 3 },
				{ id: 1 },
				{ id: 2 },
			],
		});
	});
});

describe('getNewSelectionFromDragAndDropOntoOption', () => {
	function testGetNewSelectionFromDragAndDropOntoOption({ selection, selectedItems, dropTargetItem, sourceIsAboveTarget, expected }) {
		const result = getNewSelectionFromDragAndDropOntoOption(selection, selectedItems, dropTargetItem, sourceIsAboveTarget);
		expect(result).to.eql(expected);
	}
	
	it('works with 1 item', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
		const runTest = (selectedItemId, dropTargetItemId, sourceIsAboveTarget, expectedIds) => testGetNewSelectionFromDragAndDropOntoOption({
			selection,
			sourceIsAboveTarget,
			selectedItems: [{ id: selectedItemId }],
			dropTargetItem: { id: dropTargetItemId },
			expected: expectedIds.map(id => ({ id })),
		});
		
		runTest(1, 3, false, [2, 3, 1]);
		runTest(2, 3, false, [1, 3, 2]);
		runTest(1, 2, true, [1, 2, 3]);
		runTest(1, 2, false, [2, 1, 3]);
		runTest(3, 1, true, [3, 1, 2]);
	});

	it('works with multiple items', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
		];
		const runTest = (selectedItemIds, dropTargetItemId, sourceIsAboveTarget, expectedIds) => testGetNewSelectionFromDragAndDropOntoOption({
			selection,
			sourceIsAboveTarget,
			selectedItems: selectedItemIds.map(id => ({ id })),
			dropTargetItem: { id: dropTargetItemId },
			expected: expectedIds.map(id => ({ id })),
		});

		runTest([1, 2, 3], 5, false, [4, 5, 1, 2, 3, 6]);
		runTest([1, 3, 5], 6, true, [2, 4, 1, 3, 5, 6]);
		runTest([3, 5, 6], 1, true, [3, 5, 6, 1, 2, 4]);
		runTest([4, 5], 2, false, [1, 2, 4, 5, 3, 6]);
		runTest([1, 2, 3, 4], 2, false, [1, 2, 3, 4, 5, 6]);
	});
});

describe('getNewSelection', () => {
	function testGetNewSelection({ isRemoving, items, selection, expected }) {
		const result = getNewSelection(isRemoving, items, selection);
		expect(result).to.eql(expected);
	}
	
	it('works with 1 item', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
		];
		const runTest = (isRemoving, itemId, expectedIds) => testGetNewSelection({
			selection,
			isRemoving,
			items: [{ id: itemId }],
			expected: expectedIds.map(id => ({ id })),
		});
		
		runTest(true, 1, [2, 3]);
		runTest(true, 2, [1, 3]);
		runTest(true, 3, [1, 2]);
		runTest(true, 4, [1, 2, 3]);
		runTest(false, 4, [1, 2, 3, 4]);
	});

	it('works with multiple items', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
		];
		const runTest = (isRemoving, itemIds, expectedIds) => testGetNewSelection({
			selection,
			isRemoving,
			items: itemIds.map(id => ({ id })),
			expected: expectedIds.map(id => ({ id })),
		});
		
		runTest(true, [1, 2], [3, 4, 5, 6]);
		runTest(false, [1, 2], [1, 2, 3, 4, 5, 6]);
		runTest(true, [2, 4, 6], [1, 3, 5]);
		runTest(false, [7, 8], [1, 2, 3, 4, 5, 6, 7, 8]);
	});
});

describe('selectionChanged', () => {
	it('detects no changes', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
		];
		const prevSelection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
		];
		expect(
			selectionChanged(selection, prevSelection)
		).to.equal(false);
	});
	
	it('detects additions', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
		];
		const prevSelection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
		];
		expect(
			selectionChanged(selection, prevSelection)
		).to.equal(true);
	});
	
	it('detects removals', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
		];
		const prevSelection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
			{ id: 5 },
			{ id: 6 },
		];
		expect(
			selectionChanged(selection, prevSelection)
		).to.equal(true);
	});
	
	it('detects reordering', () => {
		const selection = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
		];
		const prevSelection = [
			{ id: 1 },
			{ id: 3 },
			{ id: 2 },
			{ id: 4 },
		];
		expect(
			selectionChanged(selection, prevSelection)
		).to.equal(true);
	});
});

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
