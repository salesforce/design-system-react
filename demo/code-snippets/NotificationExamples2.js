class NotificationExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleOpen(){
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){
    return (
      <div>
        <SLDSButton label="Open Toast" onClick={this.toggleOpen.bind(this)} variant="brand" />
        <SLDSNotification
          content="There was a problem updating the record."
          iconName="notification"
          isOpen={this.state.isOpen}
          onDismiss={this.toggleOpen.bind(this)}
          texture={true}
          theme="error"
          variant="toast"
          />
      </div>
    );
  }

}

ReactDOM.render(<NotificationExample />, mountNode);
