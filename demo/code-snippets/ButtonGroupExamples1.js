<SLDSButtonGroup>
  <SLDSButton label="Refresh" />

  <SLDSButton label="Edit" />

  <SLDSButton label="Save" />

  <SLDSMenuDropdown
    assistiveText="More Options"
    onSelect={function(item){console.log(item.label, "selected")}}
    openOn="click"
    options={[
      {label: "undo", value: "A0"},
      {label: "redo", value: "B0"},
      {label: "activate", value: "C0"},
    ]} />
</SLDSButtonGroup>
