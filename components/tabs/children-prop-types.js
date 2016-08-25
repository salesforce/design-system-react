import React from 'react';
import { TABS, TABS_LIST, TAB, TAB_ITEM, TAB_PANEL } from '../../utilities/constants';
import TabsList from './tabs-list';
import Tab from './tab';
// import TabItem from './tab-item';
import TabPanel from './tab-panel';
import util from 'util';

module.exports = function childrenPropTypes(props, propName) {
  let error;
  let tabsCount = 0;
  let panelsCount = 0;
  const children = props[propName];

  React.Children.forEach(children, (child) => {
    // null happens when conditionally rendering TabPanel/Tab
    // see https://github.com/rackt/react-tabs/issues/37
    if (child === null) {
      return;
    }

    if (child.type === TabsList) {
      React.Children.forEach(child.props.children, (c) => {
        // null happens when conditionally rendering TabPanel/Tab
        // see https://github.com/rackt/react-tabs/issues/37
        if (c === null) {
          return;
        }

        if (c.type === Tab) {
          tabsCount++;
        } else {
          error = new Error(
            `Expected 'Tab' but found '${c.type.displayName || c.type}'`
          );
        }
      });
    } else if (child.type.displayName === 'TabPanel') {
      panelsCount++;
    } else {
      error = new Error(
        `Expected 'TabsList' or 'TabPanel' but found '${child.type.displayName || child.type}'`
      );
    }
  });

  if (tabsCount !== panelsCount) {
    console.log("tabsCount", tabsCount);
    console.log("panelsCount", panelsCount);

    error = new Error(
      "There should be an equal number of 'Tabs' and 'TabPanels'." +
      `Received ${tabsCount} 'Tabs' and ${panelsCount} 'TabPanels'.`
    );
  }

  // return error;
  return;
};
