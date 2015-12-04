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

    it('renders icon', function() {
      let notification = generateNotification(<SLDSNotification variant='alert' theme='success' icon='notification' isOpen={true} texture={true} content={"hi"} />);
      setTimeout(function() {
        let svg = notification.getElementsByTagName("svg")[0];
        let name = svg.getAttribute('name');
        expect(name).to.equal('notification');
      }, 1000);
    });
  });

  describe('dismiss notification click', function() {
    it('button onClick invokes method from props', function() {
      let onClick = sinon.spy();
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' icon='notification' onDismiss={onClick}  isOpen={true} />);
      setTimeout(function() {
        let dismissBtn = notification.getElementsByTagName("button")[0];
        TestUtils.Simulate.click(dismissBtn);
        expect(onClick.calledOnce).to.be.true;
      }, 1000);
    });
  });

});
