const moreOptions = [
  {label:"undo", value:"A0"},
  {label:"redo", value:"B0"},
  {label:"activate", value:"C0"},
];
const sortOptions = [
  {label:"Sort ascending", value:"A0"},
  {label:"Sort descending", value:"B0"},
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

        <SLDSMenuDropdown
          assistiveText="More Options"
          buttonVariant="icon"
          iconName="down"
          iconVariant="border-filled"
          onSelect={selectItem}
          openOn="click"
          options={moreOptions} />
    </SLDSButtonGroup>

    <SLDSButtonGroup className="slds-p-vertical--medium">
      <SLDSButtonStateful
        assistiveText="Show Chart"
        buttonVariant="icon"
        iconName="chart"
        iconVariant="border"
        type="icon" />

      <SLDSButtonStateful
        assistiveText="Filter"
        iconName="filter"
        iconVariant="border"
        type="icon"
        variant="icon" />

        <SLDSMenuDropdown
          assistiveText="Sort"
          checkmark={true}
          iconName="sort"
          iconVariant="more"
          onSelect={selectItem}
          openOn="click"
          modal={true}
          options={sortOptions}
          value="A0"
          variant="icon" />
    </SLDSButtonGroup>
  </div>
);

React.render(examples, mountNode);

