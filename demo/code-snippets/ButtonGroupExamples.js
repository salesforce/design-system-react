const examples = (
  <div>
    <SLDSButtonGroup className="slds-p-bottom--medium">
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

    <SLDSButtonGroup className="slds-p-bottom--medium">
    <SLDSButtonStateful
      assistiveText="View Reports"
      iconName='chart'
      label='Chart'
      type="icon"
      variant='icon' />

    <SLDSButtonStateful
      assistiveText="Filter Data"
      iconName='filter'
      label='Filter'
      type="icon"
      variant='icon' />

    <SLDSButton
      assistiveText='Sort'
      iconName='sort'
      iconVariant='more'
      variant='icon' />
    </SLDSButtonGroup>
  </div>
);

React.render(examples, mountNode);

