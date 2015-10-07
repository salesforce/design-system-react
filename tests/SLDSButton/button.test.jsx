const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSButton} from '../../components';

describe('SLDSButton: ',  function(){

  let sandbox, reactCmp, button;
  let handleClick = function() {
    alert('Button Clicked');
  };

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    reactCmp = TestUtils.renderIntoDocument(<SLDSButton label='Test' variant='brand' icon='download' onClick={handleClick} />);
    button = React.findDOMNode(reactCmp);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('button renders', function() {
    expect(button).to.not.equal(null);
  });

  it('button renders label from props', function() {
    let label = button.innerText;
    expect(label).to.equal('Test');
  });

  it('button onClick invokes method from props', function() {
    let _savedAlert = window.alert;
    try {
      let spy = sinon.spy(window, 'alert');
      TestUtils.Simulate.click(button);
      sinon.assert.called(spy);
    }
    finally { window.alert = _savedAlert; }
  });

});
