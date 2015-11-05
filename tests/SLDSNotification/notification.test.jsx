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
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' />);
      expect(notification).to.not.equal(undefined);
    });
  });

  describe('component basic props render', function() {
    it('renders variant', function() {
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' icon='notification' texture={true} animated={true} />);
      let alert = notification.getElementsByTagName("div")[0];
      expect(alert.className).to.include('slds-notify--toast');
    });

    it('renders theme', function() {
      let notification = generateNotification(<SLDSNotification variant='toast' theme='error' />);
      let alert = notification.getElementsByTagName("div")[0];
      expect(alert.className).to.include('slds-theme--error');
    });

    it('renders icon', function() {
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' icon='notification' texture={true} animated={true} />);
      let svg = notification.getElementsByTagName("svg")[1];
      let name = svg.getAttribute('name');
      expect(name).to.equal('notification');
    });
  });

  describe('dismiss notification click', function() {
    it('button onClick invokes method from props', function() {
      let onClick = sinon.spy();
      let notification = generateNotification(<SLDSNotification variant='toast' theme='success' icon='notification' onDismiss={onClick} />);
      let dismissBtn = notification.getElementsByTagName("button")[0];
      TestUtils.Simulate.click(dismissBtn);
      expect(onClick.calledOnce).to.be.true;
    });
  });

});
