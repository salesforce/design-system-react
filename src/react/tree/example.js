import React from 'react';
import Tree from './tree';

var collection = [
  {
    text: 'Waterfall',
    _itemType: 'item',
    id: 1
  },
  {
    text: 'Bscending and Descending',
    _itemType: 'folder',
    _isExpandable: true,
    id: 2,
    children: [
      {
        text: 'Waterfall',
        _itemType: 'item',
        id: 3
      },
      {
        text: 'Ascending and Descending',
        _itemType: 'folder',
        _isExpandable: true,
        id: 4,
        children: [
          {
            text: 'Waterfall',
            _itemType: 'item',
            id: 5
          },
          {
            text: 'Sky and Water I (with custom icon)',
            _itemType: 'item',
            _iconClass: 'glyphicon-file',
            id: 6
          }
        ]
      },
      {
        text: 'Sky and Water I (with custom icon)',
        _itemType: 'item',
        _iconClass: 'glyphicon-file',
        id: 7
      }
    ]
  },
  {
    text: 'Sky and Water I (with custom icon)',
    _itemType: 'item',
    _iconClass: 'glyphicon-file',
    id: 8
  }
];

export default function (element) {
  var TreeExample = React.createClass({
    render () {
      return <Tree collection={collection}/>;
    }
  });

  React.render(<TreeExample/>, element);
};
