const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
import {SLDSNotification} from '../../components';

describe('SLDSNotification: ',  function(){

  const generateNotification = function(notificationInstance) {
    let reactCmp = TestUtils.renderIntoDocument(notificationInstance);
    return React.findDOMNode(reactCmp);
  };

  describe('component renders', function() {

    it('notification renders', function() {
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' isOpen={true} />);
      expect(notification).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders variant', function() {
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' icon='notification'  isOpen={true} texture={true} animated={true} />);
      let alert = notification.getElementsByTagName("div")[0];
      expect(alert.className).to.include('slds-notify--toast');
    });

    it('renders theme', function() {
      let notification = generateNotification(<SLDSNotification variant='toast' theme='error'  isOpen={true} />);
      let alert = notification.getElementsByTagName("div")[0];
      expect(alert.className).to.include('slds-theme--error');
    });

    it('renders icon', function(done) {
      let notification = generateNotification(<SLDSNotification variant='alert' theme='success' iconName='notification' isOpen={true} texture={true} content={"hi"} />);
      setTimeout(function() {
        let svgs = notification.querySelectorAll("svg");
        expect(svgs[0].getAttribute('name')).to.equal('close');
        expect(svgs[1].getAttribute('name')).to.equal('notification');
        done()
      }, 400);
    });
  });

  describe('dismiss notification click', function() {
    it('button onClick invokes method from props', function(done) {
      let onClick = sinon.spy();
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' iconName='notification' onDismiss={onClick}  isOpen={true} />);
      setTimeout(function() {
        let dismissBtn = notification.getElementsByTagName("button")[0];
        TestUtils.Simulate.click(dismissBtn);
        expect(onClick.calledOnce).to.be.true;
        done()
      }, 400);
    });
  });

});
