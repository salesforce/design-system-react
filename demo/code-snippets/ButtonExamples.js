<div className="slds-x-small-buttons--horizontal">
  <h4 className="slds-text-heading--medium slds-p-vertical--medium">Standard Buttons</h4>
  <SLDSButton
    label="Base"
    onClick={function(){alert("Base Button Clicked")}} />

  <SLDSButton
    label="Neutral"
    variant="neutral" />

  <SLDSButton
    iconName="download"
    iconPosition="left"
    label="Neutral Icon"
    variant="neutral" />

  <SLDSButton
    label="Responsive"
    responsive={true}
    variant="neutral" />

  <SLDSButton
    label="Brand"
    variant="brand" />

  <SLDSButton
    disabled={true}
    label="Disabled"
    onClick={function(){alert("Disabled Button Clicked")}}
    variant="brand" />

  <SLDSButton
    label="Destructive"
    variant="destructive" />

  <div style={{backgroundColor: "#16325c", padding: "10px", display: "inline-block"}} className="slds-m-horizontal--small">
    <SLDSButton
      label="Inverse"
      variant="inverse"/>
  </div>
</div>
