let inverseBtnParent = {backgroundColor: "#16325c", padding: "10px", display: "inline-block"};
const examples = (
  <div className="slds-x-small-buttons--horizontal">
    <div style={inverseBtnParent} className="slds-m-horizontal--small">
      <SLDSButtonStateful
        stateOne={{iconName: "add", label: "Join"}}
        stateTwo={{iconName: "check", label: "Member"}}
        stateThree={{iconName: "close", label: "Leave"}}
        variant="inverse" />
    </div>

    <SLDSButtonStateful />

    <SLDSButtonStateful
      assistiveText="like"
      iconName="like"
      iconSize="large"
      variant="icon" />

  </div>
);

ReactDOM.render(examples, mountNode);

