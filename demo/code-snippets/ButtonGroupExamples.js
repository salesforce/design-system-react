const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Button Clicked");
   };
};
const examples = (
  <div>
    <h4 className="slds-text-heading--small slds-p-vertical--medium">Standard Buttons</h4>
    <SLDSButton label="Base" variant="base" onClick={handleClick('Base')} className="slds-m-right--medium"/>
    <SLDSButton label="Neutral" variant="neutral" onClick={handleClick('Neutral')} className="slds-m-right--medium"/>
    <SLDSButton label="Neutral Icon" variant="neutral" iconName="download" iconPosition="left" onClick={handleClick('Neutral Icon')} className="slds-m-right--medium"/>
    <SLDSButton label="Responsive" variant="neutral" responsive={true} onClick={handleClick('Responsive')}  className="slds-m-right--medium"/>
    <SLDSButton label="Brand" variant="brand" onClick={handleClick('Brand')} className="slds-m-right--medium"/>
    <SLDSButton label="Brand Disabled" variant="brand" iconName="add" iconPosition="left" disabled={true} onClick={handleClick('Brand Disabled')} className="slds-m-right--medium"/>
    <SLDSButton label="Destructive" variant="destructive" onClick={handleClick('Destructive')} className="slds-m-right--medium"/>
    <SLDSButton label="Inverse" variant="inverse" onClick={handleClick('Inverse')} className="slds-m-right--medium"/>
  </div>
);

React.render(examples, mountNode);

