<SLDSButtonGroup>
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
