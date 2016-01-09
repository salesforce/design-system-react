class NotificationExample extends React.Component {

  displayName: "NotificationExample"

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalToastIsOpen: false,
      alertIsOpen: false,
      toastIsOpen: false,
    };
  }

  getModalContent(){
    return (
      <div>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <SLDSButton label="Open Toast" onClick={this.openModalToast.bind(this)} variant="neutral" />
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
        <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
      </div>
    )
  }

  openModal () {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal () {
    this.setState({
      modalIsOpen: false,
      modalToastIsOpen: false,
    });
  }

  handleSubmitModal () {
    this.closeModal();
  }

  openToast(){
    this.setState({ toastIsOpen: true });
  }

  dismissToast(){
    this.setState({ toastIsOpen: false });
    console.log("====> Dismiss Toast Message");
  }

  openModalToast(){
    this.setState({ modalToastIsOpen: true });
  }

  dismissModalToast(){
    this.setState({ modalToastIsOpen: false });
    console.log("====> Dismiss Modal Toast");
  }

  openAlert(){
    this.setState({ alertIsOpen: true });
  }

  dismissAlert(){
    console.log("====> Dismiss Alert");
    this.setState({ alertIsOpen: false });
  }

  render() {
    const successMsg = ["Your new contact ", <a href="#" key="0123">Sara Smith</a>, " was successfully created."];
    const errorMsg = "There was a problem updating the record.";
    const warnMsg = "Oops, you've missed some required form inputs.";

    return (
      <div className="slds-p-vertical--medium demo">
        <div className="slds-p-horizontal--medium" style={{"display": "inline-block"}}>
          <h4 className="slds-text-heading--small">Alerts</h4>
          <SLDSButton label="Show Alert" onClick={this.openAlert.bind(this)} variant="neutral" />
          <SLDSNotification
            content={successMsg}
            iconName="notification"
            isOpen={this.state.alertIsOpen}
            onDismiss={this.dismissAlert.bind(this)}
            texture={true}
            theme="success"
            variant="alert" />
        </div>

        <div className="slds-p-horizontal--medium" style={{"display": "inline-block"}}>
          <h4 className="slds-text-heading--small ">Toasts</h4>
          <SLDSButton label="Show Toast" onClick={this.openToast.bind(this)} variant="neutral" />
          <SLDSNotification
            content={errorMsg}
            iconName="notification"
            isOpen={this.state.toastIsOpen}
            onDismiss={this.dismissToast.bind(this)}
            texture={true}
            theme="error"
            variant="toast"
            />
        </div>

        <div className="slds-p-horizontal--medium" style={{"display": "inline-block"}}>
          <h4 className="slds-text-heading--small">Modal Toasts</h4>
          <SLDSButton label="Show Modal Toast" onClick={this.openModal.bind(this)} variant="neutral" />
          <SLDSModal
            footer={[
              <SLDSButton key="cancelBtn" label="Cancel" variant="neutral" onClick={this.closeModal.bind(this)} />,
              <SLDSButton key="saveBtn" label="Save" variant="brand" onClick={this.handleSubmitModal.bind(this)} />
            ]}
            isOpen={this.state.modalIsOpen}
            title={
              <span>Lightning Design System: Style with Ease</span>
            }
            toast={
              <SLDSNotification variant="toast" theme="warning" iconName="warning" isOpen={this.state.modalToastIsOpen} content={warnMsg} onDismiss={this.dismissModalToast.bind(this)} />
            }
            onRequestClose={this.closeModal.bind(this)}>
              {this.getModalContent()}
          </SLDSModal>
        </div>

      </div>
    );
  }
}

React.render(<NotificationExample />, mountNode);

