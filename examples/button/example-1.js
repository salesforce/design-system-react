import Button from 'design-system-react/components/button';

<div className="-x-small-buttons--horizontal">
	<Button
		label="Base"
		onClick={function(e){console.log("Base Button e.target:", e.target)}}
		variant="base" />

	<Button
		label="Neutral" />

	<Button
		iconName="download"
		iconPosition="left"
		label="Neutral Icon" />

	<Button
		label="Responsive"
		responsive={true} />
</div>
