<div className="slds-x-small-buttons--horizontal">
  <SLDSButton
    label="Base"
    onClick={function(e){console.log("Base Button e.target:", e.target)}}
    variant="base" />

  <SLDSButton
    label="Neutral" />

  <SLDSButton
    iconName="download"
    iconPosition="left"
    label="Neutral Icon" />

  <SLDSButton
    label="Responsive"
    responsive={true} />
</div>
