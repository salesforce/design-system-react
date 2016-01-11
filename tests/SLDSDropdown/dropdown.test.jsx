const React = require('react/addons')
const TestUtils = React.addons.TestUtils
const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithClass } = TestUtils
import {SLDSDropdown} from '../../components'

describe('SLDSDropdown: ',  function(){

  let body;
  const options = [
    {label:'A Option Option Super Super Long',value:'A0'},
    {label:'B Option',value:'B0'},
    {label:'C Option',value:'C0'},
    {label:'D Option',value:'D0'},
    {label:'E Option',value:'E0'},
    {label:'A1 Option',value:'A1'},
    {label:'B2 Option',value:'B1'},
    {label:'C2 Option',value:'C1'},
    {label:'D2 Option',value:'D1'},
    {label:'E2 Option Super Super Long',value:'E1'}
  ]

  const renderDropdown = inst => {
    body = document.createElement('div');
    document.body.appendChild(body)
    return React.render(inst, body)
  }

  const defaultProps = {label: "Contacts",
                        modal: false,
                        options: options,
                        placeholder: "Select a contact",
                        value: 'C0'}

  const createDropdown = props => React.createElement(SLDSDropdown, defaultProps)

  const dropItDown = ps => renderDropdown(createDropdown(ps))

  describe('Rendering', () => {
    let cmp, btn;
    const getMenu = () => body.querySelector('.slds-dropdown--menu')

    beforeEach(() => {
      cmp = dropItDown({})
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
    })

    it('gives the button correct aria properties', () => {
      expect(btn.props['aria-haspopup']).to.equal("true")
    })

    it('expands the dropdown on hover', () => {
      expect(getMenu()).to.equal(null)
      Simulate.mouseEnter(btn, {})
      expect(getMenu().className).to.include('slds-dropdown')
    })
  })
})
