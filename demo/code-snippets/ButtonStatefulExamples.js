let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div className="slds-x-small-buttons--horizontal">
    <SLDSButtonStateful
      assistiveText="like"
      iconName="like"
      iconSize="large"
      type="icon" />

    <SLDSButtonStateful
      type="follow"/>

    <div style={inverseBtnParent} className="slds-m-horizontal--small">
      <SLDSButtonStateful
        type="join"
        variant="inverse" />
    </div>
  </div>
);

React.render(examples, mountNode);

