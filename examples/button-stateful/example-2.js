import ButtonStateful from 'design-system-react/components/button-stateful';

<div className="slds-x-small-buttons--horizontal">
	<SLDSButtonStateful />

	<div style={{backgroundColor: "#16325c", padding: "10px", display: "inline-block"}} className="slds-m-horizontal--small">
		<SLDSButtonStateful
			inverse
			stateOne={{iconName: "add", label: "Join"}}
			stateTwo={{iconName: "check", label: "Member"}}
			stateThree={{iconName: "close", label: "Leave"}}
	 	/>
	</div>
</div>
