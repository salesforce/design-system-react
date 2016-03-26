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
              <div className="slds-media slds-media--center">
                <div className="slds-media__figure">
                  <SLDSIcon
                    assistiveText="User"
                    category="standard"
                    name="user"/>
                </div>
                <div className="slds-media__body">
                  <p className="slds-text-heading--label">Record Type</p>
                  <h1 className="slds-page-header__title slds-m-right--small slds-truncate slds-align-middle" title="Record Title">Record Title</h1>
                </div>
              </div>
            </div>
            <div className="slds-col slds-no-flex slds-grid slds-align-bottom">
              <SLDSButtonStateful
                disabled={false}
                iconSize="medium"
                responsive={false}
                stateOne={{ iconName: "add", label: "Follow" }}
                stateTwo={{ iconName: "check", label: "Following" }}
                stateThree={{ iconName: "close", label: "Unfollow" }} />
              <div className="slds-button-group" role="group">
                <SLDSButton
                  label="Edit" />
                <SLDSButton
                  label="Delete" />
                <SLDSButton
                  label="Clone" />
                <div className="slds-button--last">
                  <SLDSButton
                    iconName="down"
                    assistiveText="More" />
                </div>
              </div>
            </div>
          </div>
          <SLDSPageHeader.DetailRow>
            <SLDSPageHeader.DetailBlock>
              <p className="slds-text-heading--label-normal slds-truncate" title="Field 1">Field 1</p>
              <p className="slds-text-body--regular slds-truncate" title="Description that demonstrates truncation with a long text field">Description that demonstrates truncation with a long text field.</p>
            </SLDSPageHeader.DetailBlock>
            <SLDSPageHeader.DetailBlock>
              <p className="slds-text-heading--label-normal slds-truncate" title="Field2 (3)">Field 2 (3)
                <SLDSButton
                  iconName="down"
                  variant="base"
                  iconVariant="bare"
                  iconSize="small"
                  assistiveText="More Actions" />
              </p>
              <p className="slds-text-body--regular">Multiple Values</p>
            </SLDSPageHeader.DetailBlock>
            <SLDSPageHeader.DetailBlock>
              <p className="slds-text-heading--label-normal slds-truncate" title="Field 3">Field 3</p><a href="#void">Hyperlink</a>
            </SLDSPageHeader.DetailBlock>
            <SLDSPageHeader.DetailBlock>
              <p className="slds-text-heading--label-normal slds-truncate" title="Field 4">Field 4</p>
              <p>
                <span>Description (2-line truncat...</span>
              </p>
            </SLDSPageHeader.DetailBlock>
          </SLDSPageHeader.DetailRow>
        </SLDSPageHeader>
      </div>
    );
  }

}

ReactDOM.render(<PageHeaderExample />, mountNode);
