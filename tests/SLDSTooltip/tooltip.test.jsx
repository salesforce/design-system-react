const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSTooltip} from '../../components';

describe('SLDSTooltip: ',  function(){

  const generateTooltip = function(tooltipInstance) {
    let reactCmp = TestUtils.renderIntoDocument(tooltipInstance);
    return React.findDOMNode(reactCmp);
  };

  describe('component renders', function() {
    it('tooltip renders', function() {
      let tooltip = generateTooltip(<SLDSTooltip />);
      expect(tooltip).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders tooltip trigger text', function() {
      let triggerText = 'Click here for tooltip';
      let tooltip = generateTooltip(<SLDSTooltip align='left' content='This is more info. blah blah.' openOn='click'>{triggerText}</SLDSTooltip>);
      let tooltipTrigger = tooltip.innerText;
      expect(tooltipTrigger).to.equal(triggerText);
    });

    it('aligns', function() {
      let popoverText = 'This is more info. blah blah.';
      let tooltip = generateTooltip(<SLDSTooltip align='right' content={popoverText} openOn='click'>Click Me</SLDSTooltip>);
      TestUtils.Simulate.click(tooltip);
      let reactId = tooltip.getElementsByTagName('noscript')[0].getAttribute("data-reactid");
      expect(reactId).to.equal('.v.$right middle');
    });
  });

  describe('functionality works', function() {
    it("renders popover onHover with onOpen prop === 'hover'", function() {
      let popoverText = 'I open on hover.';
      let tooltip = generateTooltip(<SLDSTooltip align='right' content={popoverText} openOn='hover'>Hover Me</SLDSTooltip>);
      TestUtils.Simulate.mouseEnter(tooltip);
      TestUtils.Simulate.mouseLeave(tooltip);
    });

    it("renders popover onClick with onOpen prop === 'click'", function() {
      let popoverText = 'I am aligned right.';
      let tooltip = generateTooltip(<SLDSTooltip align='right' content={popoverText} openOn='click'>Click Me</SLDSTooltip>);
      TestUtils.Simulate.click(tooltip);
    });

  });


});
