const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSButton} from '../../components';

describe('SLDSButton: ',  function(){

  let sandbox, reactCmp, button;
  let handleClick = function() {
    alert('Button Clicked');
  };

  //TODO: create function to generate button component and pass to each it block

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    reactCmp = TestUtils.renderIntoDocument(<SLDSButton label='Test' variant='brand' icon='download' onClick={handleClick} />);
    button = React.findDOMNode(reactCmp);
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('variants', function() {
  });

  describe('behavior', function() {
    it('button onClick invokes method from props', function() {
      let onClick = sinon.spy();
      let reactCmp = TestUtils.renderIntoDocument(<SLDSButton label='Test' onClick={onClick} />);
      let button = React.findDOMNode(reactCmp);
      TestUtils.Simulate.click(button);
      expect(onClick.calledOnce).to.be.true;
    });
  });

  it('button renders', function() {
    expect(button).to.not.equal(null);
  });

  it('button renders label from props', function() {
    let label = button.innerText;
    expect(label).to.equal('Test');
  });

});
