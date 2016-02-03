class NotificationExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      toastOpen: false,
    };
  }

  toggleModal(){
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  toggleToast(){
    this.setState({ toastOpen: !this.state.toastOpen });
  }

  render(){
    return (
      <div>
        <SLDSButton label="Open Modal" onClick={this.toggleModal.bind(this)} variant="brand" />
        <SLDSModal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal.bind(this)}
          title="Lightning Design System: Style with Ease"
          toast={
            <SLDSNotification
              content="Oops, you've missed some required form inputs."
              iconName="warning"
              isOpen={this.state.toastOpen}
              onDismiss={this.toggleToast.bind(this)}
              theme="warning"
              variant="toast" />
          }>
            <div>
              <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
              <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
              <SLDSButton label="Open Toast" onClick={this.toggleToast.bind(this)} variant="brand" />
              <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
              <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
              <p> wjefiowjefio wejoif wejiof jfiowejfo ijw </p>
            </div>

        </SLDSModal>
      </div>
    );
  }

}

ReactDOM.render(<NotificationExample />, mountNode);
