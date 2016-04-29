import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import {SLDSIcon} from '../../components';
const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithTag,
        findRenderedDOMComponentWithClass } = TestUtils
const handleClick = (x) => console.log(x, ' was clicked.');

describe('SLDSIcon: ',  function(){
  const defaultProps = {};
  let body;

  const renderIcon = inst => {
    body = document.createElement('div');
    document.body.appendChild(body);
    return ReactDOM.render(inst, body);
  }

  function removeIcon () {
    ReactDOM.unmountComponentAtNode(body);
    document.body.removeChild(body);
  }

  const createIcon = (props) => React.createElement(SLDSIcon, assign({}, defaultProps, props));
  const getIcon = (ps) => renderIcon(createIcon(ps));

  describe('Standard Icon Props Render', () => {
    let cmp, svg, asstText;

    beforeEach(() => {
      cmp = getIcon({assistiveText: "Accounts", category: "standard", name: "account", size: "large"});
      svg = findRenderedDOMComponentWithTag(cmp, 'svg');
      asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
    })

    afterEach(() => {
      removeIcon();
    })

    it('renders assistive text', () => {
      expect(asstText.innerText).to.equal("Accounts");
    })

    it('renders icon name class', () => {
      expect(svg.className.baseVal).to.include("slds-icon-standard-account");
    })

    it('renders icon size class', () => {
      expect(svg.className.baseVal).to.include("slds-icon--large");
    })
  });

  describe('Custom Icon Props Render', () => {
    let cmp, svg, asstText;

    beforeEach(() => {
      cmp = getIcon({assistiveText: "Heart", category: "custom", name: "custom1", size: "small"});
      svg = findRenderedDOMComponentWithTag(cmp, 'svg');
      asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
    })

    afterEach(() => {
      removeIcon();
    })

    it('renders assistive text', () => {
      expect(asstText.innerText).to.equal("Heart");
    })

    it('renders icon name class', () => {
      expect(svg.className.baseVal).to.include("slds-icon-custom-1");
    })

    it('renders icon size class', () => {
      expect(svg.className.baseVal).to.include("slds-icon--small");
    })

  });

  describe('Action Icon Props Render', () => {
    let cmp, iconContainer, svg, asstText;

    beforeEach(() => {
      cmp = getIcon({assistiveText: "Announcements", category: "action", name: "announcement", size: "large", className: "slds-m-around--x-small"});
      iconContainer = findRenderedDOMComponentWithClass(cmp, 'slds-icon__container');
      svg = findRenderedDOMComponentWithTag(cmp, 'svg');
      asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
    })

    afterEach(() => {
      removeIcon();
    })

    it('renders assistive text', () => {
      expect(asstText.innerText).to.equal("Announcements");
    })

    it('renders name class on container', () => {
      expect(iconContainer.className).to.include("slds-icon-action-announcement");
    })

    it('renders icon size class', () => {
      expect(svg.className.baseVal).to.include("slds-icon--large");
    })

  });

  describe('Utility Icon Props Render', () => {
    let cmp, icon;

    afterEach(() => {
      removeIcon();
    })

    beforeEach(() => {
      cmp = getIcon({assistiveText: "", category: "utility", inverse: false, name: "open_folder"});
      icon = findRenderedDOMComponentWithClass(cmp, 'slds-icon');
    })

    it('renders icon custom classes', () => {
      expect(icon.className.baseVal).to.include("slds-icon-text-default");
    })

  });

});
