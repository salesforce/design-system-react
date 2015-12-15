class ModalExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalAopen: false,
      modalBopen:false,
      promptOpen:false,
    };
  }

  openModal(modalInstance) {
    return () => {
      this.setState({[modalInstance]: true});
    }
  }

  closeModal(modalInstance) {
    return () => {
      this.setState({[modalInstance]: false});
    }
  }

  getModalContent() {
    return (
      <div>Modal Content</div>
    )
  }

  render(){
    return (
      <div>
        <h4 className="slds-text-heading--medium slds-p-vertical--medium">Standard Modal</h4>
        <SLDSButton label="Open Standard Modal" variant="brand" onClick={this.openModal('modalAopen').bind(this)} />
        <SLDSModal
          isOpen={this.state.modalAopen}
          title={<span>My Title</span>}
          tagline={<span>Tagline goes here.</span>}
          footer={[
            <SLDSButton label="Cancel" variant="neutral" onClick={this.closeModal('modalAopen').bind(this)} />,
            <SLDSButton label="Save" variant="brand" onClick={this.closeModal('modalAopen').bind(this)} />
          ]}
          onRequestClose={this.closeModal('modalAopen')}>
            {this.getModalContent()}
        </SLDSModal>
      </div>
    );
  }

}

React.render(<ModalExample />, mountNode);

