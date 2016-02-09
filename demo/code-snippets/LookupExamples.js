<SLDSLookup
  emptyMessage="No items found"
  footerRenderer={SLDSLookup.DefaultFooter}
  hasError={false}
  headerRenderer={SLDSLookup.DefaultHeader}
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
