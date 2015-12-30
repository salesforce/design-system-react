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
      modalToastIsOpen: true,
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
    let successMsg = ["Your new contact ", <a href="#" key="0123">Sara Smith</a>, " was successfully created."];
    let errorMsg = "There was a problem updating the record.";
    let warnMsg = "Oops, you've missed some required form inputs.";

    return (
      <div className="slds-p-vertical--medium demo">
        <div className="slds-p-vertical--small">
          <h4 className="slds-text-heading--small">Alerts</h4>
          <SLDSButton variant="neutral" label="Show Alert" onClick={this.openAlert.bind(this)} />
          <SLDSNotification variant="alert" theme="success" icon="notification" isOpen={this.state.alertIsOpen} texture={true} content={successMsg} onDismiss={this.dismissAlert.bind(this)} />
        </div>

        <div className="slds-p-vertical--small">
          <h4 className="slds-text-heading--small ">Toasts</h4>
          <SLDSButton variant="neutral" label="Show Toast" onClick={this.openToast.bind(this)} />
          <SLDSNotification variant="toast" theme="error" icon="notification" isOpen={this.state.toastIsOpen} texture={true} content={errorMsg} onDismiss={this.dismissToast.bind(this)} />
        </div>

        <div className="slds-p-vertical--small">
          <h4 className="slds-text-heading--small">Modal Toasts</h4>
          <SLDSButton variant="neutral" label="Show Modal Toast" onClick={this.openModal.bind(this)} />
          <SLDSModal
            isOpen={this.state.modalIsOpen}
            toast={
              <SLDSNotification variant="toast" theme="warning" icon="warning" isOpen={this.state.modalToastIsOpen} content={warnMsg} onDismiss={this.dismissModalToast.bind(this)} />
            }
            title={
              <span>Lightning Design System: Style with Ease</span>
            }
            footer={[
              <SLDSButton key="cancelBtn" label="Cancel" variant="neutral" onClick={this.closeModal.bind(this)} />,
              <SLDSButton key="saveBtn" label="Save" variant="brand" onClick={this.handleSubmitModal.bind(this)} />
            ]}
            onRequestClose={this.closeModal.bind(this)}>
              {this.getModalContent()}
          </SLDSModal>
        </div>

      </div>
    );
  }
}

React.render(<NotificationExample />, mountNode);

