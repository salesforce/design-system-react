 <SLDSMenuDropdown
    assistiveText="Icon More large"
    iconName="settings"
    iconSize="large"
    iconVariant="more"
    buttonVariant="icon" 
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
 />
<hr />
<SLDSMenuDropdown
  assistiveText="More Options"
  buttonVariant="icon"
  checkmark={true}
  iconName="down"
  iconVariant="border-filled"
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