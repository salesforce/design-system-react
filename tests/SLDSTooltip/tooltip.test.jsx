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
      let content = 'This is more info. blah blah.';
      let tooltip = generateTooltip(<SLDSTooltip align='left' content={content}>{triggerText}</SLDSTooltip>);
      let tooltipTrigger = tooltip.innerText;
      expect(tooltipTrigger).to.equal(triggerText + content);
    });

    it('aligns', function() {
      let popoverText = 'This is more info. blah blah.';
      let tooltip = generateTooltip(<SLDSTooltip align='right' content={popoverText}>Click Me</SLDSTooltip>);
      //TODO: find a way to simulate hover
    });
  });

});
