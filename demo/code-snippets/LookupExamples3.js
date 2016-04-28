<SLDSLookup
  emptyMessage="No items found"
  hasError={false}
  label="Account"
  onChange={function(newValue){console.log("New search term: ", newValue)}}
  onSelect={function(item){console.log(item , " Selected")}}
  options={[
    {type:'section', label:'SECTION 1'},
    {label: "Paddy\"s Pub"},
    {label: "Tyrell Corp"},
    {type:'section', label:'SECTION 2'},
    {label: "Paper St. Soap Company"},
    {label: "Nakatomi Investments"},
    {label: "Acme Landscaping"},
    {type:'section', label:'SECTION 3'},
    {label: "Acme Construction"}
  ]}
  sectionDividerRenderer={SLDSLookup.DefaultSectionDivider}
/>

