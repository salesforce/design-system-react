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
  });

});
