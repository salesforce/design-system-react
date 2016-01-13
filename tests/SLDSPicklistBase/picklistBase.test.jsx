const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const assign = require('lodash.assign')
const { Simulate,
        scryRenderedDOMComponentsWithTag,
        findRenderedDOMComponentWithClass } = TestUtils
import {SLDSPicklistBase} from '../../components';

describe('SLDSPicklistBase: ',  function() {
  let body;

  const options = [
    {label:'A Option Option Super Super Long',value:'A0', title: 'Greg'},
    {label:'B Option',value:'B0'}
  ]

  const renderPicklist = inst => {
    body = document.createElement('div');
    document.body.appendChild(body)
    return React.render(inst, body)
  }

  const defaultProps = { modal: false,
                         options: options,
                         placeholder: "Select a contact",
                         value:'C0' }

  const createPicklist = props => React.createElement(SLDSPicklistBase, assign({}, defaultProps, props))

  const getPicklist = props => renderPicklist(createPicklist(props))
  const getMenu = dom => dom.querySelector('.slds-dropdown--menu')

  const clickOnItem = (cmp, index) => {
    const items = scryRenderedDOMComponentsWithTag(cmp, 'a');
    Simulate.click(items[index]);
  }

  describe.only('in modal mode', () => {
    let cmp, btn;

    beforeEach(() => {
      cmp = getPicklist({modal: true})
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
    })

    it('expands/contracts the dropdown on click', () => {
      expect(getMenu(document.body)).to.equal(null)
      console.log('\n\n\n\n\n-------BODY1-----', document.body)
      Simulate.click(btn, {})
      console.log('\n\n\n\n\n-------BODY2-----', document.body)
      expect(getMenu(document.body).className).to.include('slds-dropdown--small')
      Simulate.click(btn, {})
      expect(getMenu(document.body)).to.equal(null)
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
