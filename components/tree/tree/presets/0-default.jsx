// eslint-disable-next-line filenames/match-regex
import * as React from 'react';
import Tree from '../tree';


const sampleNodes = {
	0: {
		id: 0,
		nodes: [1, 2, 3, 7],
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
		_iconClass: 'glyphicon-file',
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
		_iconClass: 'glyphicon-file',
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
		_iconClass: 'glyphicon-file',
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
		_iconClass: 'glyphicon-file',
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

export default (
	<Tree id="slds-tree" nodes={sampleNodes} />
)
