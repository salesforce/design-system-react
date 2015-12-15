const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Button Clicked");
   };
};
let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div className="slds-x-small-buttons--horizontal">
    <h4 className="slds-text-heading--medium slds-p-vertical--medium">Standard Buttons</h4>
    <SLDSButton
      label="Base"
      onClick={handleClick("Base")}
      variant="base" />

    <SLDSButton
      label="Neutral"
      onClick={handleClick("Neutral")}
      variant="neutral" />

    <SLDSButton
      iconName="download"
      iconPosition="left"
      label="Neutral Icon"
      onClick={handleClick("Neutral Icon")}
      variant="neutral" />

    <SLDSButton
      label="Responsive"
      onClick={handleClick("Responsive")}
      responsive={true}
      variant="neutral" />

    <SLDSButton
      label="Brand"
      onClick={handleClick("Brand")}
      variant="brand" />

    <SLDSButton
      disabled={true}
      label="Disabled"
      onClick={handleClick("Disabled")}
      variant="brand" />

    <SLDSButton
      label="Destructive"
      onClick={handleClick("Destructive")}
      variant="destructive" />

    <div style={inverseBtnParent} className="slds-m-horizontal--small">
      <SLDSButton
        label="Inverse"
        onClick={handleClick("Inverse")}
        variant="inverse"/>
    </div>
  </div>
);

React.render(examples, mountNode);

