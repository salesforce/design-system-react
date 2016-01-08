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
      //TODO: upon upgrading to React 14, add 'hover' simulation with Test Utils. Currently a bug in 13.
      //https://github.com/facebook/react/issues/4264
      //expect(tooltipTrigger).to.equal(triggerText + content);
    });
  });

  describe('functionality works', function() {
    it('opens on hover', function() {
      let popoverText = 'This is more info. blah blah.';
      let tooltip = generateTooltip(<SLDSTooltip align='right' content={popoverText}>Hover Me</SLDSTooltip>);
      //TODO: upon upgrading to React 14, add 'hover' simulation with Test Utils. Currently a bug in 13.
      //https://github.com/facebook/react/issues/4264
    });
  });

});
