import React from 'react';
import classNames from 'classnames';

const TreeItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    accessors: React.PropTypes.shape({
      getText: React.PropTypes.func.isRequired,
      getIconClass: React.PropTypes.func.isRequired,
      getItemState: React.PropTypes.func.isRequired
    })
  },

  render () {
    return (
      <li className="tree-item" data-template="treeitem" role="treeitem">
        <button type="button" className="tree-item-name">
          <span className={classNames("glyphicon icon-item", this.props.accessors.getIconClass(this.props.item) || "fueluxicon-bullet")}></span>
          <span className="tree-label">{this.props.accessors.getText(this.props.item)}</span>
        </button>
      </li>
    );
  }
});

export default TreeItem;
