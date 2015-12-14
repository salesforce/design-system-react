const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Button Clicked");
   };
};
let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div>
    <h4 className="slds-text-heading--medium slds-p-vertical--medium">Stateful Buttons</h4>
    <SLDSButtonStateful type="icon" iconName="like" iconSize="large" className="slds-m-right--medium"/>
    <span className="slds-m-right--medium">
      <SLDSButtonStateful type="follow"/>
    </span>
    <div style={inverseBtnParent} className="slds-m-right--medium">
      <SLDSButtonStateful type="join" variant="inverse" />
    </div>
  </div>
);

React.render(examples, mountNode);

