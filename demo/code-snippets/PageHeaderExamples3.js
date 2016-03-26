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
          <div className="slds-grid">
            <div className="slds-col slds-has-flexi-truncate">
              <p className="slds-text-heading--label">Leads</p>
              <div className="slds-grid">
                <div className="slds-grid slds-type-focus slds-no-space">
                  <SLDSPageHeader.Title title="My Leads (truncates)" />
                  <SLDSButton
                    iconName="down"
                    variant="base"
                    iconVariant="bare"
                    iconSize="small"
                    assistiveText="View More" />
                </div>
              </div>
            </div>
            <div className="slds-col slds-no-flex slds-grid slds-align-top">
              <div className="slds-button-group" role="group">
                <button className="slds-button slds-button--neutral">New Lead</button>
                <div className="slds-button--last">
                  <SLDSButton
                    iconName="down"
                    variant="icon"
                    iconVariant="border-filled"
                    assistiveText="More Actions" />
                </div>
              </div>
            </div>
          </div>
          <div className="slds-grid">
            <div className="slds-col slds-align-bottom">
              <SLDSPageHeader.Info>10 items • sorted by name</SLDSPageHeader.Info>
            </div>
            <div className="slds-col slds-no-flex slds-grid slds-align-bottom">
              <SLDSButton
                iconName="settings"
                variant="icon"
                iconVariant="more"
                className="slds-m-left--xx-small"
                assistiveText="Settings" />
              <SLDSButton
                iconName="table"
                variant="icon"
                iconVariant="more"
                className="slds-m-left--xx-small"
                assistiveText="Table" />
              <SLDSButtonGroup>
                <SLDSButton
                  iconName="chart"
                  variant="icon"
                  iconVariant="border"
                  className="slds-m-left--xx-small"
                  assistiveText="Chart" />
                <SLDSButton
                  iconName="filterList"
                  variant="icon"
                  iconVariant="border"
                  className="slds-m-left--xx-small"
                  assistiveText="Filter List" />
                <SLDSButton
                  iconName="sort"
                  variant="icon"
                  iconVariant="more"
                  className="slds-m-left--xx-small"
                  assistiveText="Sort" />
              </SLDSButtonGroup>
            </div>
          </div>
        </SLDSPageHeader>
      </div>
    );
  }

}

ReactDOM.render(<PageHeaderExample />, mountNode);
