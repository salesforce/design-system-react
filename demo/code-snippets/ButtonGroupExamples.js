const examples = (
  <div>
    <h4 className="slds-text-heading--small slds-p-vertical--medium">Button Groups</h4>
    <SLDSButtonGroup className="slds-p-vertical--medium">
      <SLDSButton label='Refresh' variant='neutral' />
      <SLDSButton label='Edit' variant='neutral' />
      <SLDSButton label='Save' variant='neutral' />
      <SLDSButton assistiveText='More Options' variant='icon' iconName='down' iconVariant='border-filled' />
    </SLDSButtonGroup>

    <SLDSButtonGroup className="slds-p-vertical--medium">
      <SLDSButton assistiveText='Chart' variant='icon' iconName='chart' iconVariant='border'/>
      <SLDSButton assistiveText='Filter' variant='icon' iconName='filter' iconVariant='border'/>
      <SLDSButton assistiveText='Sort' variant='icon' iconName='sort' iconVariant='more'/>
    </SLDSButtonGroup>
  </div>
);

React.render(examples, mountNode);

