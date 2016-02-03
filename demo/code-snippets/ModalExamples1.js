class ModalExample extends React.Component {

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
        <SLDSButton label="New Opportunity" onClick={this.toggleOpen.bind(this)} variant="brand" />
        <SLDSModal
          isOpen={this.state.isOpen}
          footer={[
            <SLDSButton key="modalBCancel" label="Cancel" onClick={this.toggleOpen.bind(this)} />,
            <SLDSButton key="modalBSave" label="Save" variant="brand" onClick={this.toggleOpen.bind(this)} />
          ]}
          onRequestClose={this.toggleOpen.bind(this)}
          tagline="Enter in details below"
          title="New Opportunity">

            <div className="slds-form-element slds-m-vertical--large">
              <label className="slds-form-element__label" htmlFor="opptyName">Opportunity Name</label>
              <div className="slds-form-element__control">
                <input id="opptyName" className="slds-input" type="text" placeholder="Enter name" />
              </div>
            </div>
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="description">Opportunity Description</label>
              <div className="slds-form-element__control">
                <textarea id="description" className="slds-textarea" placeholder="Enter description"></textarea>
              </div>
            </div>
            <SLDSLookup
              className="slds-m-vertical--large"
              emptyMessage="No Accounts Found"
              iconName="account"
              label="Account Name"
              modal={true}
              onItemSelect={function(item){console.log("selected: ", item.label)}}
              options={[
                {label:"Paddy\"s Pub"},
                {label:"Tyrell Corp"},
                {label:"Paper St. Soap Company"},
                {label:"Nakatomi Investments"},
                {label:"Acme Landscaping"},
                {label:"Acme Construction"}
              ]}
            />
            <SLDSMenuPicklist
              className="slds-m-vertical--large"
              label="Lead Source"
              modal={true}
              onSelect={(option)=>{console.log("selected: ", option.label);}}
              options={[
                {label:"Third Party Program",value:"A0"},
                {label:"Cold Call",value:"B0"},
                {label:"LinkedIn",value:"C0"},
                {label:"Direct Mail",value:"D0"},
                {label:"Other",value:"E0"},
              ]}
              placeholder = "Select Lead Source"
              value="B0"
            />
            <SLDSMenuPicklist
              className="slds-m-vertical--large"
              label="Type"
              modal={true}
              onSelect={(option)=>{console.log("selected: ", option.label);}}
              options={[
                {label:"Add on Business",value:"A0"},
                {label:"Courtesy",value:"B0"},
                {label:"New Business",value:"C0"},
                {label:"Renewal",value:"D0"},
                {label:"Upgrade",value:"E0"},
              ]}
              placeholder = "Select Opportunity Type"
              value="C0"
            />
            <div className="slds-form-element slds-m-vertical--large">
              <label className="slds-form-element__label" htmlFor="amount">Amount</label>
              <div className="slds-form-element__control">
                <input id="amount" className="slds-input" type="text" placeholder="Enter Amount" />
              </div>
            </div>

        </SLDSModal>
      </div>
    );
  }
}

ReactDOM.render(<ModalExample />, mountNode);
