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
        onSelect={function(item){console.log(item.label, "selected")}}
        openOn="click"
        options={[
          {label: "undo", value: "A0"},
          {label: "redo", value: "B0"},
          {label: "activate", value: "C0"},
        ]} />
  </SLDSButtonGroup>

  <SLDSButtonGroup className="slds-p-vertical--medium">
    <SLDSButtonStateful
      assistiveText="Show Chart"
      buttonVariant="icon"
      iconName="chart"
      iconVariant="border"
      variant="icon" />

    <SLDSButtonStateful
      assistiveText="Filter"
      iconName="filter"
      iconVariant="border"
      variant="icon" />

      <SLDSMenuDropdown
        assistiveText="Sort"
        checkmark={true}
        iconName="sort"
        iconVariant="more"
        onSelect={function(item){console.log(item.label, "selected")}}
        openOn="click"
        modal={true}
        options={[
          {label: "Sort ascending", value: "A0"},
          {label: "Sort descending", value: "B0"},
        ]}
        value="A0"
        variant="icon" />
  </SLDSButtonGroup>
</div>

