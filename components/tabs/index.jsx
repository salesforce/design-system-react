/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// # Tabs Component

// Implements the [Tabs design pattern](https://www.lightningdesignsystem.com/components/tabs/) in React.

// ## Dependencies

// ### React
import React, { PropTypes, cloneElement } from 'react';

// Child components
// import TabsList from './tabs-list';
// import Tab from './tab';
// import TabItem from './tab-item';
// import TabPanel from './tab-panel';

// ### classNames
import classNames from 'classnames';

// Similar to React's PropTypes check. When in development mode, it issues errors in the console about properties.
import childrenPropTypes from './children-prop-types';

// ## Constants
import { TABS, TABS_LIST, TAB, TAB_PANEL } from '../../utilities/constants';
import uuid from '../../utilities/uuid';

import { findDOMNode } from 'react-dom';

// Determine if a node from event.target is a Tab element
function isTabNode(node) {
  return (node.nodeName === 'A' && node.getAttribute('role') === 'tab' || node.nodeName === 'LI' && node.getAttribute('role') === 'tab');
}

// Determine if a tab node is disabled
function isTabDisabled(node) {
  return node.getAttribute('aria-disabled') === 'true';
}

// let useDefaultStyles = true;

module.exports = React.createClass({
  displayName: TABS,

  propTypes: {
    className: PropTypes.string,
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    focus: PropTypes.bool,
    children: childrenPropTypes,
    forceRenderTabPanel: PropTypes.bool,
  },

  childContextTypes: {
    forceRenderTabPanel: PropTypes.bool,
  },

  statics: {
    setUseDefaultStyles(use) {
      // useDefaultStyles = use;
    },
  },

  getDefaultProps() {
    return {
      selectedIndex: -1,
      focus: false,
      forceRenderTabPanel: false,
    };
  },

  getInitialState() {
    return this.copyPropsToState(this.props, this.state);
  },

  getChildContext() {
    return {
      forceRenderTabPanel: this.props.forceRenderTabPanel,
    };
  },

  // componentDidMount() {
  //   if (useDefaultStyles) {
  //     jss(require('../helpers/styles.js')); // eslint-disable-line global-require
  //   }
  // },

  componentWillReceiveProps(newProps) {
    // Use a transactional update to prevent race conditions
    // when reading the state in copyPropsToState
    // See https://github.com/reactjs/react-tabs/issues/51
    this.setState(state => this.copyPropsToState(newProps, state));
  },

  setSelected(index, focus) {
    // Don't do anything if nothing has changed
    if (index === this.state.selectedIndex) return;
    // Check index boundary
    if (index < 0 || index >= this.getTabsCount()) return;

    // Keep reference to last index for event handler
    const last = this.state.selectedIndex;

    // Check if the change event handler cancels the tab change
    let cancel = false;

    // Call change event handler
    if (typeof this.props.onSelect === 'function') {
      cancel = this.props.onSelect(index, last) === false;
    }

    if (!cancel) {
      // Update selected index
      this.setState({ selectedIndex: index, focus: focus === true });
    }
  },

  getNextTab(index) {
    const count = this.getTabsCount();

    // Look for non-disabled tab from index to the last tab on the right
    for (let i = index + 1; i < count; i++) {
      const tab = this.getTab(i);
      if (!isTabDisabled(findDOMNode(tab))) {
        return i;
      }
    }

    // If no tab found, continue searching from first on left to index
    for (let i = 0; i < index; i++) {
      const tab = this.getTab(i);
      if (!isTabDisabled(findDOMNode(tab))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },

  getPrevTab(index) {
    let i = index;

    // Look for non-disabled tab from index to first tab on the left
    while (i--) {
      const tab = this.getTab(i);
      if (!isTabDisabled(findDOMNode(tab))) {
        return i;
      }
    }

    // If no tab found, continue searching from last tab on right to index
    i = this.getTabsCount();
    while (i-- > index) {
      const tab = this.getTab(i);
      if (!isTabDisabled(findDOMNode(tab))) {
        return i;
      }
    }

    // No tabs are disabled, return index
    return index;
  },

  getTabsCount() {
    return this.props.children && this.props.children[0] ?
            React.Children.count(this.props.children[0].props.children) :
            0;
  },

  getPanelsCount() {
    return React.Children.count(this.props.children.slice(1));
  },

  getTabList() {
    return this.refs.tabslist;
  },

  getTab(index) {
    return this.refs[`tabs-${index}`];
  },

  getPanel(index) {
    return this.refs[`panels-${index}`];
  },

  getChildren() {
    let index = 0;
    let count = 0;
    const children = this.props.children;
    const state = this.state;
    const tabIds = this.tabIds = this.tabIds || [];
    const panelIds = this.panelIds = this.panelIds || [];
    let diff = this.tabIds.length - this.getTabsCount();

    // Add ids if new tabs have been added
    // Don't bother removing ids, just keep them in case they are added again
    // This is more efficient, and keeps the uuid counter under control
    while (diff++ < 0) {
      tabIds.push(uuid('slds-tabs--tab'));
      panelIds.push(uuid('slds-tabs--panel'));
    }

    // Map children to dynamically setup refs
    return React.Children.map(children, (child) => {
      // null happens when conditionally rendering TabPanel/Tab
      // see https://github.com/rackt/react-tabs/issues/37
      if (child === null) {
        return null;
      }

      let result = null;

      // Clone TabsList and Tab components to have refs
      if (count++ === 0) {
        // TODO try setting the uuid in the "constructor" for `Tab`/`TabPanel`
        result = cloneElement(child, {
          ref: 'tabslist',
          children: React.Children.map(child.props.children, (tab) => {
            // null happens when conditionally rendering TabPanel/Tab
            // see https://github.com/rackt/react-tabs/issues/37
            if (tab === null) {
              return null;
            }

            const ref = `tabs-${index}`;
            const id = tabIds[index];
            const panelId = panelIds[index];
            const selected = state.selectedIndex === index;
            const focus = selected && state.focus;

            index++;

            return cloneElement(tab, {
              ref,
              id,
              panelId,
              selected,
              focus,
            });
          }),
        });

        // Reset index for panels
        index = 0;
      }
      // Clone TabPanel components to have refs
      else {
        const ref = `panels-${index}`;
        const id = panelIds[index];
        const tabId = tabIds[index];
        const selected = state.selectedIndex === index;

        index++;

        result = cloneElement(child, {
          ref,
          id,
          tabId,
          selected,
        });
      }

      return result;
    });
  },

  handleKeyDown(e) {
    if (this.isTabFromContainer(e.target)) {
      let index = this.state.selectedIndex;
      let preventDefault = false;

      // Select next tab to the left
      if (e.keyCode === 37 || e.keyCode === 38) {
        index = this.getPrevTab(index);
        preventDefault = true;
      }
      // Select next tab to the right
      /* eslint brace-style:0 */
      else if (e.keyCode === 39 || e.keyCode === 40) {
        index = this.getNextTab(index);
        preventDefault = true;
      }

      // This prevents scrollbars from moving around
      if (preventDefault) {
        e.preventDefault();
      }

      this.setSelected(index, true);
    }
  },

  handleClick(e) {
    let node = e.target;
    do { // eslint-disable-line no-cond-assign
      if (this.isTabFromContainer(node)) {
        if (isTabDisabled(node)) {
          return;
        }

        const index = [].slice.call(node.parentNode.children).indexOf(node);
        this.setSelected(index);
        return;
      }
    } while ((node = node.parentNode) !== null);
  },

  // This is an anti-pattern, so sue me
  copyPropsToState(props, state) {
    let selectedIndex = props.selectedIndex;

    // If no selectedIndex prop was supplied, then try
    // preserving the existing selectedIndex from state.
    // If the state has not selectedIndex, default
    // to the first tab in the TabsList.
    //
    // TODO: Need automation testing around this
    // Manual testing can be done using examples/focus
    // See 'should preserve selectedIndex when typing' in specs/Tabs.spec.js
    if (selectedIndex === -1) {
      if (state && state.selectedIndex) {
        selectedIndex = state.selectedIndex;
      } else {
        selectedIndex = 0;
      }
    }

    return {
      selectedIndex,
      focus: props.focus,
    };
  },

  /**
   * Determine if a node from event.target is a Tab element for the current Tabs container.
   * If the clicked element is not a Tab, it returns false.
   * If it finds another Tabs container between the Tab and `this`, it returns false.
   */
  isTabFromContainer(node) {
    // return immediately if the clicked element is not a Tab.
    if (!isTabNode(node)) {
      return false;
    }

    // Check if the first occurrence of a Tabs container is `this` one.
    let nodeAncestor = node.parentElement;
    const tabsNode = findDOMNode(this);
    do {
      if (nodeAncestor === tabsNode) return true;
      else if (nodeAncestor.getAttribute('data-tabs')) break;

      nodeAncestor = nodeAncestor.parentElement;
    } while (nodeAncestor);

    return false;
  },

  render() {
    // This fixes an issue with focus management.
    //
    // Ultimately, when focus is true, and an input has focus,
    // and any change on that input causes a state change/re-render,
    // focus gets sent back to the selected tab, and input loses focus.
    //
    // Since the focus state only needs to be remembered
    // for the current render, we can reset it once the
    // render has happened.
    //
    // Don't use setState, because we don't want to re-render.
    //
    // See https://github.com/rackt/react-tabs/pull/7
    if (this.state.focus) {
      setTimeout(() => {
        this.state.focus = false;
      }, 0);
    }

    const { className, ...attributes } = this.props;

    // Delete all known props, so they don't get added to DOM
    delete attributes.selectedIndex;
    delete attributes.onSelect;
    delete attributes.focus;
    delete attributes.children;
    delete attributes.forceRenderTabPanel;
    delete attributes.onClick;
    delete attributes.onKeyDown;

    return (
      <div
        {...attributes}
        className={classNames(
          'slds-tabs--default',
          className
        )}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        data-tabs
      >
        {this.getChildren()}
      </div>
    );
  },
});
