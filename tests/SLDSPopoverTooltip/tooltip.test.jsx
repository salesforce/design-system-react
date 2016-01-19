const React = require('react/addons')
const TestUtils = React.addons.TestUtils
const { Simulate,
        scryRenderedDOMComponentsWithClass,
        findRenderedDOMComponentWithClass } = TestUtils
import {SLDSPopoverTooltip} from '../../components';

describe.only('SLDSPopoverTooltip: ',  function(){
  let body;

  afterEach(() => {
    if(body) document.body.removeChild(body)
  })

  const renderTooltip = inst => {
    target = document.createElement('h1')
    body = document.createElement('div')
    body.appendChild(target)
    document.body.appendChild(body)
    return React.render(inst, body)
  }

  const createTooltip = (props, kids) => React.createElement(SLDSPopoverTooltip, props, kids)

  const generateTooltip = (ps, kids) => renderTooltip(createTooltip(ps, kids))

  const getTip = dom => dom.querySelector('.slds-popover--tooltip')

  describe('component basic props render', () => {
    let cmp, trigger;

    beforeEach(() => {
      const content = <span style={{width: 30}}>'This is more info. blah blah.'</span>
      cmp = generateTooltip({align:'bottom', content:content}, <button>'Hover me for tooltip'</button>)
      trigger = document.body.querySelector('[role=tooltip]')
    })

    it('renders the content as assistive text', () => {
      const span = findRenderedDOMComponentWithClass(cmp, 'slds-assistive-text')
      expect(span.innerText).to.equal("'This is more info. blah blah.'")
    })

    it('expands the dropdown on hover', (done) => {
      expect(getTip(document.body)).to.equal(null)
      setTimeout(() => {
        Simulate.mouseEnter(trigger, {})
        setTimeout(() => {
           const tip = getTip(document.body)
           const tip_rect = tip.getBoundingClientRect()
           const trigger_rect = trigger.getBoundingClientRect()
           expect(tip_rect.bottom).to.be.within(trigger_rect.bottom, trigger_rect.bottom + 40)
           expect(tip.className).to.include('slds-popover--tooltip')
           expect(tip.className).to.include('slds-nubbin--top')
           Simulate.mouseLeave(trigger, {})
           setTimeout(() => {
             expect(getTip(document.body)).to.be.null
             done()
           }, 600)
        }, 200)
      }, 200)
    })
  })

  describe('using target', () => {
    let cmp, trigger;

    beforeEach(() => {
      const content = <span style={{width: 30}}>'This is more info. blah blah.'</span>
      cmp = generateTooltip({align:'bottom', content:content, target: target}, <button>'Hover me for tooltip'</button>)
      trigger = document.body.querySelector('[role=tooltip]')
    })

    it('expands the dropdown on hover', (done) => {
      expect(getTip(document.body)).to.equal(null)
      setTimeout(() => {
        Simulate.mouseEnter(trigger, {})
        setTimeout(() => {
           const tip = getTip(document.body)
           const tip_rect = tip.getBoundingClientRect()
           const target_rect = target.getBoundingClientRect()
           expect(tip_rect.bottom).to.be.within(target_rect.bottom, target_rect.bottom+40)
           expect(tip.className).to.include('slds-popover--tooltip')
           Simulate.mouseLeave(trigger, {})
           setTimeout(() => {
             expect(getTip(document.body)).to.be.null
             done()
           }, 600)
        }, 200)
      }, 200)
    })

  })
})
