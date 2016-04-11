class PageHeaderExample extends React.Component {

  render() {
    const navRight = (
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
    );

    const contentRight = (
      <div>
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

    return (
      <SLDSPageHeader
        label="Leads"
        title="My Leads (truncates)"
        navRight={navRight}
        contentRight={contentRight}
        variant="objectHome"
        truncate={true}
        info="10 items • sorted by name" />
    );
  }

}

ReactDOM.render(<PageHeaderExample />, mountNode);
