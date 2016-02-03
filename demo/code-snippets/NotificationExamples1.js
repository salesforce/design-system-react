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
       <SLDSButton label="Open Alert" onClick={this.toggleOpen.bind(this)} variant="brand" />
       <SLDSNotification
         content={["Your new contact ", <a href="#" key="0123">Sara Smith</a>, " was successfully created."]}
         iconName="notification"
         isOpen={this.state.isOpen}
         onDismiss={this.toggleOpen.bind(this)}
         texture={true}
         theme="success"
         variant="alert" />
      </div>
    );
  }

}

ReactDOM.render(<NotificationExample />, mountNode);
