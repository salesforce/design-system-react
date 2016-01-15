const collection = [
	{
		text: 'Grains',
		_itemType: 'item',
		id: 1
	},
	{
		text: 'Fruits',
		_itemType: 'folder',
		_isExpandable: true,
		id: 2,
		children: [
			{
				text: 'Watermelon',
				_itemType: 'item',
				id: 3
			},
			{
				text: 'Tree Fruits',
				_itemType: 'folder',
				_isExpandable: true,
				id: 4,
				children: [
					{
						text: 'Peaches',
						_itemType: 'item',
						id: 5
					},
					{
						text: 'Pears',
						_itemType: 'item',
						_iconClass: 'glyphicon-file',
						id: 6
					},
					{
						text: 'Citrus',
						_itemType: 'folder',
						_isExpandable: true,
						id: 11,
						children: [
							{
								text: 'Orange',
								_itemType: 'item',
								id: 12
							},
							{
								text: 'Grapefruit',
								_itemType: 'item',
								id: 13
							},
							{
								text: 'Lemon',
								_itemType: 'item',
								id: 14
							},
							{
								text: 'Lime',
								_itemType: 'item',
								id: 15
							}
						]
					},
					{
						text: 'Apples',
						_itemType: 'folder',
						_isExpandable: true,
						id: 16,
						children: [
							{
								text: 'Granny Smith',
								_itemType: 'item',
								id: 17
							},
							{
								text: 'Pinklady',
								_itemType: 'item',
								_iconClass: 'glyphicon-file',
								id: 18
							},
							{
								text: 'Rotten',
								_itemType: 'item',
								id: 19
							},
							{
								text: 'Jonathan',
								_itemType: 'item',
								id: 20
							}
						]
					}

				]
			},
			{
				text: 'Cherries',
				_itemType: 'item',
				id: 7
			},
			{
				text: 'Empty folder',
				_itemType: 'folder',
				_isExpandable: false,
				id: 10
			}
		]
	},
	{
		text: 'Nuts',
		_itemType: 'item',
		_iconClass: 'glyphicon-file',
		id: 8
	}
];

module.exports = {
	default: {
		collection
	}
};
