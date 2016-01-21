import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithTag,
        findRenderedDOMComponentWithClass } = TestUtils
import {SLDSButton} from '../../components';
const handleClick = x => console.log(x, ' was clicked.');

describe('SLDSButton: ',  function(){

  const defaultProps = {
    label: "Neutral",
    onClick: handleClick,
    variant: "neutral",
  };

  const renderButton = inst => {
    body = document.createElement('div');
    document.body.appendChild(body)
    return ReactDOM.render(inst, body)
  }
  const createButton = props => React.createElement(SLDSButton, assign({}, defaultProps, props));
  const getButton = ps => renderButton(createButton(ps));

  describe('Basic Button Props Render', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({label: "Brand", variant: "brand", onClick: () => clicked = true })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
    })

    it('renders label', () => {
      expect(btn.innerText).to.equal("Brand");
    })

    it('renders variant styles', () => {
      expect(btn.className).to.include("slds-button--brand");
    })

  });

  describe('Icon with Label Button Props Render', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({label: "Neutral with Icon", iconName:"download", iconPosition:"right", variant: "neutral", onClick: () => clicked = true })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
      svg = findRenderedDOMComponentWithClass(cmp, 'slds-button__icon');
    })

    it('renders label', () => {
      expect(btn.innerText).to.equal("Neutral with Icon");
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

    it('renders label', () => {
      expect(asstText.innerText).to.equal("my settings");
    })

    it('renders icon styles', () => {
      expect(svg.className.baseVal).to.include("slds-button__icon");
    })
  });


  describe('Button Clickable', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getButton({label: "Neutral", variant: "neutral", onClick: () => clicked = true })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
    })

    it('can be clicked', () => {
      expect(clicked).to.be.false
      Simulate.click(btn, {})
      expect(clicked).to.be.true
    })

  });

});
