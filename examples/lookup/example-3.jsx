import Lookup from 'design-system-react/components/lookup';

<Lookup
	emptyMessage="No items found"
	footerRenderer={Lookup.DefaultFooter}
	hasError={false}
	headerRenderer={Lookup.DefaultHeader}
	iconCategory="standard"
	iconName="account"
	label="Account"
	onChange={function(newValue){console.log("New search term: ", newValue)}}
	onSelect={function(item){console.log(item , " Selected")}}
	options={[
		{label: "Paddy\"s Pub"},
		{label: "Tyrell Corp"},
		{label: "Paper St. Soap Company"},
		{label: "Nakatomi Investments"},
		{label: "Acme Landscaping"},
		{label: "Acme Construction"}
	]}
	selectedItem={1}
/>
