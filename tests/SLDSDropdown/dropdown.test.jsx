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
    const cls = props => <div>{inst}</div>
    return React.render(React.createElement(cls), body)
  }

  const defaultProps = {label: "Contacts",
                        modal: false,
                        options: options,
                        placeholder: "Select a contact",
                        value: 'C0'}

  const createDropdown = props => React.createElement(SLDSDropdown, defaultProps)

  const dropItDown = ps => renderDropdown(createDropdown(ps))

  describe('Rendering', () => {
    let btn;
    const getMenu = () => body.querySelector('.slds-dropdown--menu')

    beforeEach(() => {
      dropItDown({})
      console.log('\n\n\n\n\n\n\n\n ------cmp', body, '\n\n\n\n\n\n')
      btn = body.querySelector('.slds-button')
    })

    it('gives the button correct aria properties', () => {
      expect(btn.props['aria-haspopup']).to.equal('aria-haspopup="true'')
    })

    it('expands the dropdown on hover', () => {
      expect(getMenu()).to.be.falsy
      Simulate.mouseEnter(btn, {})
      console.log('\n\n\n\n\n\n 1111', getMenu(), '\n\n\n\n\n\n')
      expect(getMenu()).to.be.truthy
      Simulate.mouseLeave(btn, {})
      console.log('\n\n\n\n\n\n 22222', getMenu(), '\n\n\n\n\n\n')
      expect(getMenu()).to.be.falsy
    })

    it('selects an option', () => {
      Simulate.mouseEnter(btn, {})
      console.log('\n\n\n\n\n\n 3333', getMenu(), '\n\n\n\n\n\n')
      const items = getMenu().querySelectorAll('.slds-dropdown__item')
      console.log('\n\n\n\n\n\n', items[2], '\n\n\n\n\n\n')
      expect(items[2].className).to.not.include('slds-is-selected')
      Simulate.click(items[2], {})
      expect(items[2].className).to.include('slds-is-selected')
      Simulate.click(items[3], {})
      expect(items[2].className).to.not.include('slds-is-selected')
    })
  })
})
