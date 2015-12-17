const handleClick = function(buttonInstance) {
  return function() {
    alert(buttonInstance + " Button Clicked");
   };
};
let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div className="slds-x-small-buttons--horizontal">
    <h4 className="slds-text-heading--medium slds-p-vertical--medium">Stateful Buttons</h4>
    <SLDSButtonStateful
      iconName="like"
      iconSize="large"
      type="icon" />

    <SLDSButtonStateful
      type="follow"/>

    <SLDSButtonStateful
      disabled={true}
      type="follow"/>

    <div style={inverseBtnParent} className="slds-m-horizontal--small">
      <SLDSButtonStateful
        type="join"
        variant="inverse" />
    </div>
  </div>
);

React.render(examples, mountNode);

