class ModalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen(){
    this.setState({ isOpen: !this.state.isOpen });
  }

  render(){
    return (
      <div>
        <SLDSButton label="Open Prompt" onClick={this.toggleOpen.bind(this)} variant="brand" />
          <SLDSModal
            dismissible={false}
            footer={[ <SLDSButton key="promptBtn" label="Got it" variant="neutral" onClick={this.toggleOpen.bind(this)} /> ]}
            isOpen={this.state.isOpen}
            onRequestClose={this.toggleOpen.bind(this)}
            prompt="error"
            size="medium"
            title={<span>Service Unavailable</span>}>
              The service you're trying to reach is unavailable due to limited conectivity. Please restart the application or contact your system administrator for assistance.
          </SLDSModal>
      </div>
    );
  }

}

ReactDOM.render(<ModalExample />, mountNode);
