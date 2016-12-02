import Button from 'design-system-react/components/button';

<div className="-x-small-buttons--horizontal">
	<Button
		label="Brand"
		variant="brand"
	/>

	<Button
		disabled={true}
		label="Disabled"
		onClick={function(){alert("Disabled Button Clicked")}}
		variant="brand"
	/>

	<Button
		label="Destructive"
		variant="destructive"
	/>

	<div style={{backgroundColor: "#16325c", padding: "10px", display: "inline-block"}} className="-m-horizontal--small">
		<Button
			inverse
			label="Inverse"
			variant="base"
		/>
	</div>
</div>
