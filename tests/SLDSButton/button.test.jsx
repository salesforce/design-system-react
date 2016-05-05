/* global describe, it, before, after, beforeEach, afterEach */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithTag,
        findRenderedDOMComponentWithClass } = TestUtils

import {SLDSButton} from '../../components';

const handleClick = itemClicked => console.log(itemClicked, ' was clicked.');

describe('SLDSButton: ', () => {
  let body;

  const defaultProps = {
    label: 'Neutral',
    onClick: handleClick,
    variant: 'neutral'
  };

  const renderButton = inst => {
    body = document.createElement('div');
    document.body.appendChild(body);
    return ReactDOM.render(inst, body);
  };

  function removeButton () {
    ReactDOM.unmountComponentAtNode(body);
    document.body.removeChild(body);
  }

  const createButton = (props) => React.createElement(SLDSButton, assign({}, defaultProps, props));
  const getButton = (props) => renderButton(createButton(props));

  describe('Basic Button Props Render', () => {
    let cmp;
    let btn;
    let clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({
        text: 'Brand',
        theme: 'brand',
        onClick: () => clicked = true });
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
    });

    afterEach(() => {
      removeButton(btn);
    });

    it('renders correct label', () => {
      expect(btn.textContent).to.equal('Neutral');
    });

    it('renders correct variant styles', () => {
      expect(btn.className).to.include('slds-button--neutral');
    });
  });

  describe('Icon with Label Button Props Render', () => {
    let cmp;
    let btn;
    let clicked;
    let svg;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({
        label: 'Neutral with Icon', 
        iconName: 'download',
        iconCategory: 'action',
        iconPosition: 'right',
        variant: 'neutral',
        onClick: () => clicked = true });
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
      svg = findRenderedDOMComponentWithClass(cmp, 'slds-button__icon');
    })

    afterEach(() => {
      removeButton(btn);
    })

    it('renders label', () => {
      expect(btn.textContent).to.equal("Neutral with Icon");
    })

    it('renders icon', () => {
      expect(svg.className.baseVal).to.include("slds-button__icon--right");
    })

  });

  describe('Icon Button Props render', () => {
    let cmp, btn, asstText, svg, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({assistiveText: "my settings",
                      variant: "icon",
                      iconName: "settings",
                      iconSize: "small",
                      iconVariant: "bare",
                      onClick: () => clicked = true });
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
      asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text');
      svg = findRenderedDOMComponentWithTag(cmp, 'svg');
    })

    afterEach(() => {
      removeButton(btn);
    })

    it('renders label', () => {
      expect(asstText.textContent).to.equal("my settings");
    })

    it('renders icon styles', () => {
      expect(svg.className.baseVal).to.include("slds-button__icon");
    })
  });


  describe('Button Clickable', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({label: "Neutral", variant: "neutral", onClick: () => clicked = true });
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
    })

    afterEach(() => {
      removeButton(btn);
    })

    it('can be clicked', () => {
      expect(clicked).to.be.false;
      Simulate.click(btn, {});
      expect(clicked).to.be.true;
    })

  });

});
