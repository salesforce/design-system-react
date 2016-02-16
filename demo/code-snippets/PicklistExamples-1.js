class ListItemRenderer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      
<SLDSPopoverTooltip
  align="bottom left"
  content="Tooltip on top">
        <span>~ {this.props.label}</span>
</SLDSPopoverTooltip>
      
    );
  }
};

class PicklistExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return (

        <SLDSMenuPicklist
          listItemRenderer={ListItemRenderer}
          label="Contacts"
          onSelect={function(value){console.log("selected: ",value)}}
          options={[
            {label: "A Option Option Super Super Long", value: "A0", title: "Greg"},
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
          placeholder = "Select a contact"
          value="C0"
          />
    );
  }
}

ReactDOM.render(<PicklistExample />, mountNode);