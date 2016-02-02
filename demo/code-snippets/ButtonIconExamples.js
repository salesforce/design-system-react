<div className="slds-x-small-buttons--horizontal">
  <SLDSButton
    assistiveText="Icon Bare Small"
    iconName="settings"
    iconSize="small"
    iconVariant="bare"
    onClick={function(){alert("Icon Bare Clicked")}} variant="icon" />

  <SLDSButton
    assistiveText="Icon Container Small"
    iconName="settings"
    iconSize="small"
    iconVariant="container"
    variant="icon" />

  <div style={{backgroundColor: "#4BC076", padding: "10px", display: "inline-block"}} className="slds-m-horizontal--small">
  <SLDSButton
    assistiveText="Icon Border medium"
    iconName="settings"
    iconVariant="border"
    variant="icon" />

  <SLDSButton
    assistiveText="Icon Border-filled medium"
    iconName="settings"
    iconVariant="border-filled"
    variant="icon" />
  </div>

  <SLDSButton
    assistiveText="Icon More large"
    iconName="settings"
    iconSize="large"
    iconVariant="more"
    variant="icon" />

  <div style={{backgroundColor: "#16325c", padding: "10px", display: "inline-block"}} className="slds-m-horizontal--small">
    <SLDSButton
      assistiveText="Icon inverse"
      iconName="settings"
      iconSize="large"
      variant="icon-inverse" />
  </div>
  <div style={{backgroundColor: "#FFB75D", padding: "10px 50px", display: "inline-block"}} className="slds-hint-parent slds-m-horizontal--small">
    <SLDSButton
      assistiveText="Icon hint large"
      hint={true}
      iconName="settings"
      iconSize="large"
      variant="icon" />
  </div>
</div>

