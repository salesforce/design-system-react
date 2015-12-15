const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Clicked");
   };
};
let hintBtnParent = {backgroundColor: "#7fdbff", padding: "10px 50px", display: "inline-block"};
let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div className="slds-x-small-buttons--horizontal">
    <h4 className="slds-text-heading--medium slds-p-vertical--medium">Icon Buttons</h4>
    <SLDSButton assistiveText="Icon Bare Small" iconName="settings" iconSize="small" iconVariant="bare" onClick={handleClick('Icon Bare')} variant="icon" />
    <SLDSButton assistiveText="Icon Container Small" iconName="settings" iconSize="small" iconVariant="container" onClick={handleClick('Icon Container')} variant="icon" />
    <SLDSButton assistiveText="Icon Border medium" iconName="settings" iconSize="medium" iconVariant="border" onClick={handleClick('Icon border')} variant="icon" />
    <SLDSButton assistiveText="Icon Border-filled medium" iconName="settings" iconSize="medium" iconVariant="border-filled" onClick={handleClick('Icon border-filled')} variant="icon" />
    <SLDSButton assistiveText="Icon More large" iconName="settings" iconSize="large" iconVariant="more" onClick={handleClick('Icon More')} variant="icon" />
    <div style={inverseBtnParent} className="slds-m-horizontal--small">
      <SLDSButton assistiveText="Icon inverse" iconName="settings" iconSize="large" onClick={handleClick('Icon Inverse')} variant="icon-inverse" />
    </div>
    <div style={hintBtnParent} className="slds-hint-parent slds-m-horizontal--small">
      <SLDSButton assistiveText="Icon hint large" hint={true} iconName="settings" iconSize="large" onClick={handleClick('Icon Hint')} variant="icon" />
    </div>
  </div>
);

React.render(examples, mountNode);

