const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Button Clicked");
   };
};
const examples = (
  <div>
    <h4 className="slds-text-heading--medium slds-p-vertical--medium">Standard Buttons</h4>
    <SLDSButton className="slds-m-right--medium" label="Base" onClick={handleClick('Base')} variant="base" />
    <SLDSButton className="slds-m-right--medium" label="Neutral" onClick={handleClick('Neutral')} variant="neutral" />
    <SLDSButton className="slds-m-right--medium" iconName="download" iconPosition="left" label="Neutral Icon" onClick={handleClick('Neutral Icon')} variant="neutral" />
    <SLDSButton className="slds-m-right--medium" label="Responsive" onClick={handleClick('Responsive')} responsive={true} variant="neutral" />
    <SLDSButton className="slds-m-right--medium" label="Brand" onClick={handleClick('Brand')} variant="brand" />
    <SLDSButton className="slds-m-right--medium" disabled={true} iconName="add" iconPosition="left" label="Brand Disabled" onClick={handleClick('Brand Disabled')} variant="brand" />
    <SLDSButton className="slds-m-right--medium" label="Destructive" onClick={handleClick('Destructive')} variant="destructive" />
    <SLDSButton className="slds-m-right--medium" label="Inverse" onClick={handleClick('Inverse')} variant="inverse"/>
  </div>
);

React.render(examples, mountNode);

