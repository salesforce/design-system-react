const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Clicked");
   };
};
let hintBtnParent = {backgroundColor: "#7fdbff", padding: "10px 50px", display: "inline-block"};
let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div>
    <h4 className="slds-text-heading--medium slds-p-vertical--medium">Icon Buttons</h4>
    <SLDSButton assistiveText="Icon Bare Small" variant="icon" iconName="settings" iconSize="small" iconVariant="bare" onClick={handleClick('Icon Bare')} className="slds-m-right--medium"/>
    <SLDSButton assistiveText="Icon Container Small" variant="icon" iconName="settings" iconSize="small" iconVariant="container" onClick={handleClick('Icon Container')} className="slds-m-right--medium"/>
    <SLDSButton assistiveText="Icon Border medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="border" onClick={handleClick('Icon border')} className="slds-m-right--medium"/>
    <SLDSButton assistiveText="Icon Border-filled medium" variant="icon" iconName="settings" iconSize="medium" iconVariant="border-filled" onClick={handleClick('Icon border-filled')} className="slds-m-right--medium"/>
    <SLDSButton assistiveText="Icon More large" variant="icon" iconName="settings" iconSize="large" iconVariant="more" onClick={handleClick('Icon More')} className="slds-m-right--medium"/>
    <div style={inverseBtnParent} className="slds-m-horizontal--medium">
      <SLDSButton assistiveText="Icon inverse" variant="icon-inverse" iconName="settings" iconSize="large" onClick={handleClick('Icon Inverse')} />
    </div>
    <div style={hintBtnParent} className="slds-hint-parent slds-m-horizontal--medium">
      <SLDSButton assistiveText="Icon hint large" variant="icon" iconName="settings" iconSize="large" hint={true} onClick={handleClick('Icon Hint')} />
    </div>
  </div>
);

React.render(examples, mountNode);

