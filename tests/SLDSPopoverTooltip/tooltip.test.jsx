const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSPopoverTooltip} from '../../components';

describe('SLDSPopoverTooltip: ',  function(){

  const generateTooltip = function(tooltipInstance) {
    let reactCmp = TestUtils.renderIntoDocument(tooltipInstance);
    return React.findDOMNode(reactCmp);
  };

  describe('component renders', function() {
    it('tooltip renders', function() {
      let tooltip = generateTooltip(<SLDSPopoverTooltip />);
      expect(tooltip).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders tooltip trigger text', function() {
      let triggerText = 'Click here for tooltip';
      let content = <span>'This is more info. blah blah.'</span>;
      let tooltip = generateTooltip(<SLDSPopoverTooltip align='left' content={content}>{<span>triggerText</span>}</SLDSPopoverTooltip>);
      let tooltipTrigger = tooltip.innerText;
      //TODO: upon upgrading to React 14, add 'hover' simulation with Test Utils. Currently a bug in 13.
      //https://github.com/facebook/react/issues/4264
      //expect(tooltipTrigger).to.equal(triggerText + content);
    });
  });

  describe('functionality works', function() {
    it('opens on hover', function() {
      let popoverText = <span>'This is more info. blah blah.'</span>;
      let tooltip = generateTooltip(<SLDSPopoverTooltip align='right' content={popoverText}><a>Hover Me</a></SLDSPopoverTooltip>);
      //TODO: upon upgrading to React 14, add 'hover' simulation with Test Utils. Currently a bug in 13.
      //https://github.com/facebook/react/issues/4264
    });
  });

});
