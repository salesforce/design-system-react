const examples = (
  <div>
    <SLDSButtonGroup className="slds-p-vertical--medium">
      <SLDSButton
        label="Refresh"
        variant="neutral" />

      <SLDSButton
        label="Edit"
        variant="neutral" />

      <SLDSButton
        label="Save"
        variant="neutral" />

      <SLDSButton
        assistiveText="More Options"
        iconName="down"
        iconVariant="border-filled"
        variant="icon" />
    </SLDSButtonGroup>

    <SLDSButtonGroup className="slds-p-vertical--medium">
      <SLDSButton
        assistiveText="Chart"
        iconName="chart"
        iconVariant="border"
        variant="icon" />

      <SLDSButton
        assistiveText="Filter"
        iconName="filter"
        iconVariant="border"
        variant="icon" />

      <SLDSButton
        assistiveText="Sort"
        iconName="sort"
        iconVariant="more"
        variant="icon" />
    </SLDSButtonGroup>
  </div>
);

React.render(examples, mountNode);

