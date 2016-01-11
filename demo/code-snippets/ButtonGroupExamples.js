const moreOptions = [
  {label:'undo',value:'A0'},
  {label:'redo',value:'B0'},
  {label:'activate',value:'C0'},
];
const sortOptions = [
  {label:'Sort ascending',value:'A0'},
  {label:'Sort descending',value:'B0'},
];
const selectItem = function(item) {
  console.log(item.label, "selected");
};
const examples = (
  <div>
    <SLDSButtonGroup className="slds-p-bottom--medium">
      <SLDSButton
        label="Refresh"
        variant="neutral" />

      <SLDSButton
        label="Edit"
        variant="neutral" />

      <SLDSButton
        label="Save"
        variant="neutral" />

        <SLDSDropdown
          assistiveText="More Options"
          iconName="down"
          iconVariant="border-filled"
          onSelect={selectItem}
          openOn="click"
          options={moreOptions}
          variant="icon" />
    </SLDSButtonGroup>

    <SLDSButtonGroup className="slds-p-vertical--medium">
      <SLDSButtonStateful
        assistiveText="Show Chart"
        iconName="chart"
        iconVariant="border"
        type="icon"
        variant="icon" />

      <SLDSButtonStateful
        assistiveText="Filter"
        iconName="filter"
        iconVariant="border"
        type="icon"
        variant="icon" />

        <SLDSDropdown
          assistiveText="Sort"
          iconName="sort"
          iconVariant="more"
          onSelect={selectItem}
          openOn="click"
          options={sortOptions}
          variant="icon" />
    </SLDSButtonGroup>
  </div>
);

React.render(examples, mountNode);

