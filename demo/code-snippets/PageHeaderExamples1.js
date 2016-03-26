class PageHeaderExample extends React.Component {

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
        <SLDSPageHeader>
          <div className="slds-media slds-media--center">
            <div className="slds-media__figure">
              <SLDSIcon
                assistiveText="Opportunity"
                category="standard"
                name="opportunity" />
            </div>
            <div className="slds-media__body">
              <SLDSPageHeader.Title title="Rohde Corp - 80,000 Widgets" />
              <SLDSPageHeader.Info>Mark Jaeckal • Unlimited Customer • 11/13/15</SLDSPageHeader.Info>
            </div>
          </div>
        </SLDSPageHeader>
      </div>
    );
  }

}

ReactDOM.render(<PageHeaderExample />, mountNode);
