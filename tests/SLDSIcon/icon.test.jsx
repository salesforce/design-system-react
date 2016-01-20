const React = require('react/addons')
const assign = require('lodash.assign')
const TestUtils = React.addons.TestUtils
const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithTag,
        findRenderedDOMComponentWithClass } = TestUtils
import {SLDSIcon} from '../../components';
const handleClick = x => console.log(x, ' was clicked.');

describe.only('SLDSIcon: ',  function(){
  const defaultProps = {
    assistiveText:"Favorite",
    category:"custom",
    name:"custom1",
    size:"small",
  };

  const renderIcon = inst => {
    body = document.createElement('div');
    document.body.appendChild(body)
    return React.render(inst, body)
  }
  const createIcon = props => React.createElement(SLDSIcon, assign({}, defaultProps, props));
  const getIcon = ps => renderIcon(createIcon(ps));

  describe('Basic Icon Props Render', () => {
    let cmp;

    beforeEach(() => {
      cmp = getIcon({assistiveText: "Accounts", category: "standard", name: "account"});
      asstText = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text')
    })

    it('renders assistive text', () => {
      expect(asstText).to.equal("Accounts");
    })

  });

  /*
  describe('Icon Icon Props render', () => {
    let cmp, btn, asstText, svg, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getIcon({assistiveText: "my settings",
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


  describe('Icon Clickable', () => {
    let cmp, btn, clicked;

    beforeEach(() => {
      clicked = false;
      cmp = getIcon({label: "Neutral", variant: "neutral", onClick: () => clicked = true })
      btn = findRenderedDOMComponentWithClass(cmp, 'slds-button')
    })

    it('can be clicked', () => {
      expect(clicked).to.be.false
      Simulate.click(btn, {})
      expect(clicked).to.be.true
    })

  });
 */

});
