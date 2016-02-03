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
        <SLDSButton label="Open Bare" onClick={this.toggleOpen.bind(this)} variant="brand" />
        <SLDSModal
          isOpen={this.state.isOpen}
          onRequestClose={this.toggleOpen.bind(this)}>

            <h4>New Opportunity</h4>
            <div className="slds-form-element slds-m-vertical--large">
              <label className="slds-form-element__label" htmlFor="opptyName">Opportunity Name</label>
              <div className="slds-form-element__control">
                <input id="opptyName" className="slds-input" type="text" placeholder="Enter name" />
              </div>
            </div>

            <SLDSLookup
              className="slds-m-vertical--large"
              emptyMessage="No Accounts Found"
              iconName="account"
              label="Account Name"
              modal={true}
              onItemSelect={function(item){console.log(item , " Selected")}}
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
              label="Type"
              modal={true}
              onSelect={(value)=>{console.log("selected: ",value);}}
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

        </SLDSModal>
      </div>
    );
  }

}

ReactDOM.render(<ModalExample />, mountNode);
