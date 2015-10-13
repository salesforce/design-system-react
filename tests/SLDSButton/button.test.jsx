const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSButton} from '../../components';

describe('SLDSButton: ',  function(){

  let generateButton = function(buttonInstance) {
    let reactCmp = TestUtils.renderIntoDocument(buttonInstance);
    return React.findDOMNode(reactCmp);
  };

  describe('component renders', function() {
    it('button renders', function() {
      let button = generateButton(<SLDSButton label='Test' />);
      expect(button).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders label', function() {
      let button = generateButton(<SLDSButton label='Test' />);
      let label = button.innerText;
      expect(label).to.equal('Test');
    });

    it('renders hidden label with icon only button', function() {
      let button = generateButton(<SLDSButton label='Settings' variant='icon' iconName='settings' />);
      let label = button.innerText;
      expect(label).to.equal('Settings');
    });

    it('renders variant', function() {
      let button = TestUtils.renderIntoDocument(<SLDSButton label='Test' variant='brand' />);
      let brand = TestUtils.findRenderedDOMComponentWithClass(button, 'slds-button--brand');
      expect(brand).to.not.equal(undefined);
    });
  });

  describe('component icon props render', function() {
    it('renders icon svg', function() {
      let button = generateButton(<SLDSButton label='Test' iconName='download' />);
      let svg = button.getElementsByClassName("slds-button__icon")[0];
      expect(svg).to.not.equal(undefined);
    });

    it('renders icon size', function() {
      let button = generateButton(<SLDSButton label='Test' iconName='download' iconSize='small' />);
      let size = button.getElementsByClassName("slds-button__icon--small")[0];
      expect(size).to.not.equal(undefined);
    });

    it('without prop specified, renders icon position on left side', function() {
      let button = generateButton(<SLDSButton label='Test' iconName='download' />);
      let position = button.getElementsByClassName("slds-button__icon--left")[0];
      expect(position).to.not.equal(undefined);
    });

    it('renders icon position', function() {
      let button = generateButton(<SLDSButton label='Test' iconName='download' iconPosition='right' />);
      let position = button.getElementsByClassName("slds-button__icon--right")[0];
      expect(position).to.not.equal(undefined);
    });
  });

  describe('component behavior works', function() {
    it('button onClick invokes method from props', function() {
      let onClick = sinon.spy();
      let button = generateButton(<SLDSButton label='Test' onClick={onClick} />);
      TestUtils.Simulate.click(button);
      expect(onClick.calledOnce).to.be.true;
    });
  });

});
