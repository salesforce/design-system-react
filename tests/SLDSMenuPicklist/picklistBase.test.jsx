import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash.assign';
import TestUtils from 'react-addons-test-utils';

import {SLDSMenuPicklist} from '../../components';
const { Simulate,
        scryRenderedDOMComponentsWithTag,
        findRenderedDOMComponentWithClass } = TestUtils

describe('SLDSMenuPicklist: ',  function(){
  let body;

  const options = [
    {label:'A Option Option Super Super Long',value:'A0', title: 'Greg'},
    {label:'B Option',value:'B0'}
  ]

  const renderPicklist = inst => {
    body = document.createElement('div');
    document.body.appendChild(body)
    return ReactDOM.render(inst, body)
  }

  const defaultProps = { modal: false,
                         options: options,
                         placeholder: "Select a contact",
                         value:'C0' }

  const createPicklist = props => React.createElement(SLDSMenuPicklist, assign({}, defaultProps, props))

  const getPicklist = props => renderPicklist(createPicklist(props))
  const getMenu = dom => dom.querySelector('.slds-dropdown--left')

  const clickOnItem = (cmp, index) => {
    const items = scryRenderedDOMComponentsWithTag(cmp, 'a');
    Simulate.click(items[index]);
  }

  describe('in modal mode', () => {
    let cmp, btn;

    beforeEach(() => {
      cmp = getPicklist({modal: true})
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
    })

    it('expands/contracts the dropdown on click', (done) => {
      expect(getMenu(document.body)).to.equal(null)
      Simulate.click(btn, {})
      setTimeout(() => {
        expect(getMenu(document.body).className).to.include('slds-dropdown--left')
        Simulate.click(btn, {})
        expect(getMenu(document.body)).to.equal(null)
        done()
      }, 600)
    })
  })


  describe('with click handler', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getPicklist({onClick: () => clicked = true })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
    })

    it('gives the button correct aria properties', () => {
      expect(btn.props['aria-haspopup']).to.equal("true")
    })

    it('sets the placeholder', () => {
      expect(btn.innerText).to.equal("Select a contact")
    })

    it('expands/contracts the dropdown on click', () => {
      expect(getMenu(body)).to.equal(null)
      Simulate.click(btn, {})
      expect(getMenu(body).className).to.include('slds-dropdown')
      Simulate.click(btn, {})
      expect(getMenu(body)).to.equal(null)
    })

    it('preserves click behavior', () => {
      expect(clicked).to.be.false
      Simulate.click(btn, {})
      expect(clicked).to.be.true
    })
  })

  describe('expanded with onSelect', () => {
    let cmp, btn, selected;

    beforeEach(() => {
      selected = false;
      cmp = getPicklist({onSelect: i => selected = i })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
      Simulate.click(btn, {})
    })

    it('selects an item', () => {
      expect(selected).to.be.false
      const items = getMenu(body).querySelectorAll('.slds-dropdown__item')
      Simulate.click(items[1].querySelector('a'), {})
      expect(selected.value).to.equal('B0')
    })

  })

  describe('disabled', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getPicklist({disabled: true, onClick: () => clicked = true })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button');
    })

    it("doesn't open", () => {
      Simulate.click(btn, {})
      expect(getMenu(body)).to.equal(null)
    })

    it('preserves click behavior', () => {
      expect(clicked).to.be.false
      Simulate.click(btn, {})
      expect(clicked).to.be.true
    })
  })


});
