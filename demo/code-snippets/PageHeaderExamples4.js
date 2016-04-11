class PageHeaderExample extends React.Component {

  render() {
    const navRight = (
      <div className="slds-button-group" role="group">
        <button className="slds-button slds-button--neutral">Add Contact</button>
        <div className="slds-button--last">
          <SLDSButton
            iconName="down"
            variant="icon"
            iconVariant="border-filled"
            assistiveText="More Actions" />
        </div>
      </div>
    );

    const contentRight = (
      <div>
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
    );

    const trail = [
      (<a href="#">Accounts</a>),
      (<a href="#">Company One</a>),
    ];

    return (
      <SLDSPageHeader
        title="Contacts (will truncate)"
        navRight={navRight}
        contentRight={contentRight}
        variant="objectHome"
        truncate={true}
        trail={trail}
        info="10 items • sorted by name" />
    );
  }

}

ReactDOM.render(<PageHeaderExample />, mountNode);
