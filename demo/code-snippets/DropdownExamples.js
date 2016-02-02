<div>
  <SLDSMenuDropdown
    label="Dropdown Click"
    onSelect={function(value){console.log("selected: ",value)}}
    options={[
      {label: "A Option Option Super Super Long", value: "A0"},
      {label: "B Option", value: "B0"},
      {label: "C Option", value: "C0"},
      {label: "D Option", value: "D0"},
      {label: "E Option", value: "E0"},
      {label: "A1 Option", value: "A1"},
      {label: "B2 Option", value: "B1"},
      {label: "C2 Option", value: "C1"},
      {label: "D2 Option", value: "D1"},
      {label: "E2 Option Super Super Long", value: "E1"},
    ]} />

  <SLDSMenuDropdown
    align="right"
    buttonClassName="green"
    buttonVariant="brand"
    checkmark={true}
    label="Dropdown Hover"
    onMouseEnter={function(){console.log('Mouse enter')}}
    onMouseLeave={function(){console.log('Mouse leave')}}
    onSelect={function(value){console.log("selected: ",value)}}
    openOn="hover"
    options={[
      {label: "A Option Option Super Super Long", value: "A0"},
      {label: "B Option", value: "B0"},
      {label: "C Option", value: "C0"},
      {label: "D Option", value: "D0"},
      {label: "E Option", value: "E0"},
      {label: "A1 Option", value: "A1"},
      {label: "B2 Option", value: "B1"},
      {label: "C2 Option", value: "C1"},
      {label: "D2 Option", value: "D1"},
      {label: "E2 Option Super Super Long", value: "E1"},
    ]}
    value="C0" />
</div>
