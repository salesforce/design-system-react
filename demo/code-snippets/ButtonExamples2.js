<div className="slds-x-small-buttons--horizontal">
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
