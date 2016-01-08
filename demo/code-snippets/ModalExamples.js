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

  selectItem(item){
    console.log(item , ' Selected');
  }

  getModalContent() {
    return (
      <div>
        <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
    <SLDSLookup
      emptyMessage="No Accounts Found"
      items={[
        {label:'Paddy\'s Pub'},
        {label:'Tyrell Corp'},
        {label:'Paper St. Soap Company'},
        {label:'Nakatomi Investments'},
        {label:'Acme Landscaping'},
        {label:'Acme Construction'}
      ]}
      label="Accounts"
      modal={true}
      onItemSelect={this.selectItem}
      type="account"
    />
        <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
    <SLDSPicklist
      label="Contacts"
      modal={true}
      onSelect={(value)=>{console.log('selected: ',value);}}
      options={[
        {label:'A Option Option Super Super Long',value:'A0'},
        {label:'B Option',value:'B0'},
        {label:'C Option',value:'C0'},
        {label:'D Option',value:'D0'},
        {label:'E Option',value:'E0'},
        {label:'A1 Option',value:'A1'},
        {label:'B2 Option',value:'B1'},
        {label:'C2 Option',value:'C1'},
        {label:'D2 Option',value:'D1'},
        {label:'E2 Option Super Super Long',value:'E1'},

      ]}
      placeholder = "Select a contact"
      value='C0'
    />
        <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
        <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
      </div>
    )
  }

  render(){
    return (
      <div>
        <div className="slds-p-horizontal--medium" style={{"display": "inline-block"}}>
          <SLDSButton label="Open Bare" onClick={this.openModal('modalAopen').bind(this)} variant="brand" />
          <SLDSModal
            align="top"
            isOpen={this.state.modalAopen}
            onRequestClose={this.closeModal('modalAopen')}
            size="large">
              {this.getModalContent()}
          </SLDSModal>
        </div>

        <div className="slds-p-horizontal--medium" style={{"display": "inline-block"}}>
          <SLDSButton label="Open Standard" onClick={this.openModal('modalBopen').bind(this)} variant="brand" />
          <SLDSModal
            footer={[
              <SLDSButton key="modalBCancel" label="Cancel" variant="neutral" onClick={this.closeModal('modalBopen').bind(this)} />,
              <SLDSButton key="modalBSave" label="Save" variant="brand" onClick={this.closeModal('modalBopen').bind(this)} />
            ]}
            isOpen={this.state.modalBopen}
            onRequestClose={this.closeModal('modalBopen')}
            tagline="Tagline goes here"
            title={<span>My Title</span>}>
              {this.getModalContent()}
          </SLDSModal>
        </div>

        <div className="slds-p-horizontal--medium" style={{"display": "inline-block"}}>
          <SLDSButton label="Open Prompt" onClick={this.openModal('promptOpen').bind(this)} variant="brand" />
          <SLDSModal
            footer={[ <SLDSButton key="promptBtn" label='Got it' variant='neutral' onClick={this.closeModal('promptOpen')} /> ]}
            isOpen={this.state.promptOpen}
            isPassive={false}
            onRequestClose={this.closeModal('promptOpen')}
            prompt='error'
            size='medium'
            title={<span>Service Unavailable</span>}>
              Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi.
          </SLDSModal>
        </div>

      </div>
    );
  }

}

React.render(<ModalExample />, mountNode);

