import React from 'react';
import TreeItem from './tree-item';
import classNames from 'classnames';
import * as Lib from '../../core/lib';

let InnerTreeBranch;

const TreeBranch = React.createClass({
  propTypes: {
    onItemClick: React.PropTypes.func.isRequired
  },
  componentWillMount() {
    if (!InnerTreeBranch) {
      InnerTreeBranch = require('./tree-branch');
    }
  },

  getInitialState() {
    return {
      children: []
    }
  },

  componentWillMount () {
    this.props.accessors.getChildren(this.props.item).then(resolvedChildren => {
      this.setState({
        children: resolvedChildren
      });
    });
  },

  render () {
    let accessors = this.props.accessors;
    let itemState = (accessors.getItemState(this.props.item));
    let children = [];

    this.state.children.forEach(model => {
      if (accessors.getType(model) === 'folder') {
        children.push(<TreeBranch key={model.get('id')} item={model} accessors={accessors} onItemClick={this._handleFolderClick.bind(this, model)}/>);
      } else {
        children.push(<TreeItem key={model.get('id')} item={model} accessors={accessors} />);
      }
    });

    return (
      <li className={classNames("tree-branch", itemState.open ? 'tree-open' : '')} dataTemplate="treebranch" role="treeitem" aria-expanded={itemState.open ? 'false' : 'true'}>
        <div className="tree-branch-header">
          <button type="button" className="tree-branch-name" onClick={this._handleFolderClick.bind(this, this.props.item)}>
            <span className="glyphicon icon-caret glyphicon-play"></span>
            <span className={classNames('glyphicon icon-folder', 'glyphicon-folder-' + (itemState.open ? 'open' : 'close'))}></span>
            <span className="tree-label">{accessors.getText(this.props.item)}</span>
          </button>
        </div>
        <ul className={classNames("tree-branch-children", {hidden: !itemState.open})} role="group">
          {itemState.open ? children : undefined}
        </ul>
        <div className={classNames('tree-loader', {hidden: !itemState.loading})} role="alert">Loading...</div>
      </li>
    );
  },

  _handleFolderClick (item) {
    if (this.props.onItemClick) {
      this.props.onItemClick(item);
    }
  }
});

export default TreeBranch;
