import React from 'react';
import TreeCore from '../../core/tree';
import * as Lib from '../../core/lib';
import classNames from 'classnames';
import ReactHelpers from '../mixins/helpers';
import TreeBranch from './tree-branch';
import TreeItem from './tree-item';

const Tree = React.createClass(Lib.extend({}, TreeCore, {
  mixins: [ReactHelpers],
  getInitialState () {
		return Lib.extend(this.__getInitialState(), {
			wrapperClasses: {}
		});
	},

  render () {
    var contents = this.props.collection.map(model => {
      if (this.accessors.getType(model) === 'folder') {
        return <TreeBranch key={Lib.getProp(model, 'id')} item={model} onItemClick={this._handleItemClick} accessors={this.accessors} />;
      } else {
        return <TreeItem key={Lib.getProp(model, 'id')} item={model} accessors={this.accessors} />;
      }
    });
    // bind the context of the accessors so that the children don't have to worry about scope.
    Object.keys(this.accessors).forEach(accessorName => {
      this.accessors[accessorName] = this.accessors[accessorName].bind(this);
    });

    return (
      <ul className={classNames(this.cssClasses.CONTROL, this.cssClasses.BTN_GROUP, this.state.wrapperClasses)} role="tree">
        {contents}
      </ul>
    );
  },

  _handleItemClick(item) {
    if (this.accessors.getType(item) === 'folder') {
      this.__toggleFolder(item);
    }
  }
}));

export default Tree;
