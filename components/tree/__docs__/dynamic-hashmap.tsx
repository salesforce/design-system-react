/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * Sample tree data in normalized hashmap format.
 * This replaces the previous normalizr-based implementation.
 * 
 * Hashmaps or hash tables more easily allow immutability because only one hash
 * entry needs to be overwritten by changes. This prevents anti-patterns like 
 * `_.deepClone` or `forceUpdate` renders which update the whole tree instead 
 * of limiting the re-render to only the node that changed.
 */

import { TreeNode } from '../types';

type TreeHashMap = Record<string | number, TreeNode & { nodes?: number[] }>;

// Base tree structure - food categories
const base: TreeHashMap = {
	0: {
		id: 0,
		nodes: [1, 2, 3, 7],
		label: 'Root',
		type: 'branch',
	},
	1: {
		label: 'Grains',
		type: 'item',
		id: 1,
	},
	2: {
		label: 'Fruits',
		type: 'branch',
		id: 2,
		nodes: [4, 5],
	},
	3: {
		label: 'Nuts',
		type: 'branch',
		id: 3,
		nodes: [8, 9, 10, 11],
	},
	4: {
		assistiveText: 'Ground Fruits',
		label: 'Ground Fruits',
		type: 'branch',
		id: 4,
		nodes: [12, 13, 14],
	},
	5: {
		label: 'Tree Fruits',
		type: 'branch',
		id: 5,
		nodes: [15, 16, 17, 18, 19, 6],
	},
	6: {
		label: 'Raspberries',
		type: 'item',
		id: 6,
	},
	7: {
		label: 'Empty folder',
		type: 'branch',
		id: 7,
	},
	8: {
		label: 'Almonds',
		type: 'item',
		id: 8,
	},
	9: {
		label: 'Cashews',
		type: 'item',
		id: 9,
	},
	10: {
		label: 'Pecans',
		type: 'item',
		id: 10,
	},
	11: {
		label: 'Walnuts',
		type: 'item',
		id: 11,
	},
	12: {
		label: 'Watermelon',
		type: 'item',
		id: 12,
	},
	13: {
		label: 'Canteloupe',
		type: 'item',
		id: 13,
	},
	14: {
		label: 'Strawberries',
		type: 'item',
		id: 14,
	},
	15: {
		label: 'Peaches',
		type: 'item',
		id: 15,
	},
	16: {
		label: 'Pears',
		type: 'item',
		id: 16,
	},
	17: {
		label: 'Citrus',
		type: 'branch',
		id: 17,
		nodes: [20, 21, 22, 23],
	},
	18: {
		label: 'Apples',
		type: 'branch',
		id: 18,
		nodes: [24, 25, 26, 27],
	},
	19: {
		label: 'Cherries',
		type: 'branch',
		id: 19,
		nodes: [28, 29, 30, 31, 32, 33],
	},
	20: {
		label: 'Orange',
		type: 'item',
		id: 20,
	},
	21: {
		label: 'Grapefruit',
		type: 'item',
		id: 21,
	},
	22: {
		label: 'Lemon',
		type: 'item',
		id: 22,
	},
	23: {
		label: 'Lime',
		type: 'item',
		id: 23,
	},
	24: {
		label: 'Granny Smith',
		type: 'item',
		id: 24,
	},
	25: {
		label: 'Pinklady',
		type: 'item',
		id: 25,
	},
	26: {
		label: 'Rotten',
		type: 'item',
		id: 26,
	},
	27: {
		label: 'Jonathan',
		type: 'item',
		id: 27,
	},
	28: {
		label: 'Balaton',
		type: 'item',
		id: 28,
	},
	29: {
		label: 'Erdi Botermo',
		type: 'item',
		id: 29,
	},
	30: {
		label: 'Montmorency',
		type: 'item',
		id: 30,
	},
	31: {
		label: 'Queen Ann',
		type: 'item',
		id: 31,
	},
	32: {
		label: 'Ulster',
		type: 'item',
		id: 32,
	},
	33: {
		label: 'Viva',
		type: 'item',
		id: 33,
	},
};

// Initial state with some nodes expanded and selected
const initialExpandedSelected: TreeHashMap = {
	...base,
	2: { ...base[2], expanded: true },
	5: { ...base[5], expanded: true },
	15: { ...base[15], selected: true },
};

// Generate a larger dataset for performance testing
const generateLargeDataset = (): TreeHashMap => {
	const result: TreeHashMap = { ...base };
	let nextId = 100;
	
	// Add many more items under existing branches
	const categories = ['Vegetables', 'Herbs', 'Spices', 'Dairy', 'Meats'];
	const items = [
		'Carrot', 'Potato', 'Onion', 'Garlic', 'Basil', 'Oregano', 
		'Thyme', 'Pepper', 'Salt', 'Cumin', 'Milk', 'Cheese',
		'Yogurt', 'Butter', 'Chicken', 'Beef', 'Pork', 'Fish'
	];
	
	// Add new category branches to root
	const rootNodes = [...(result[0].nodes || [])];
	
	categories.forEach((category, catIndex) => {
		const branchId = nextId++;
		const itemIds: number[] = [];
		
		// Add 10 items per category
		for (let i = 0; i < 10; i++) {
			const itemId = nextId++;
			itemIds.push(itemId);
			result[itemId] = {
				id: itemId,
				label: `${items[(catIndex * 3 + i) % items.length]} ${i + 1}`,
				type: 'item',
			};
		}
		
		result[branchId] = {
			id: branchId,
			label: category,
			type: 'branch',
			nodes: itemIds,
		};
		
		rootNodes.push(branchId);
	});
	
	// Add sub-branches with more items
	for (let i = 0; i < 5; i++) {
		const branchId = nextId++;
		const itemIds: number[] = [];
		
		for (let j = 0; j < 8; j++) {
			const itemId = nextId++;
			itemIds.push(itemId);
			result[itemId] = {
				id: itemId,
				label: `Extra Item ${i}-${j}`,
				type: 'item',
			};
		}
		
		result[branchId] = {
			id: branchId,
			label: `Category ${i + 1}`,
			type: 'branch',
			nodes: itemIds,
		};
		
		rootNodes.push(branchId);
	}
	
	result[0] = { ...result[0], nodes: rootNodes };
	
	return result;
};

const large = generateLargeDataset();

const hashmap = {
	base,
	large,
	initialExpandedSelected,
};

export default hashmap;



