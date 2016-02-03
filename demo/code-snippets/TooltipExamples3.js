<SLDSButtonGroup className="slds-p-bottom--medium">
  <SLDSButton
    label="Refresh"
    tooltip={<SLDSPopoverTooltip
      align="bottom"
      content="Buttonbar Tooltip"
      openByDefault={false}></SLDSPopoverTooltip>}
    variant="neutral" />

  <SLDSButton
    label="Edit"
    tooltip={<SLDSPopoverTooltip
      align="bottom right"
      content="Buttonbar Tooltip"
      openByDefault={false}></SLDSPopoverTooltip>}
    variant="neutral" />

  <SLDSMenuDropdown
    assistiveText="More Options"
    buttonVariant="icon"
    iconName="down"
    iconVariant="border-filled"
    onSelect={(i) => console.log("selected", i)}
    openOn="hover"
    options={[
      {label: "A Option", value: "A0"},
      {label: "B Option", value: "B0"},
      {label: "C Option", value: "C0"},
    ]}
    tooltip={<SLDSPopoverTooltip
      align="top right"
      content="Dropdown Tooltip"
      openByDefault={false}></SLDSPopoverTooltip>} />
</SLDSButtonGroup>
