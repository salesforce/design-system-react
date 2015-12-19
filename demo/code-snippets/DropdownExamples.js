const options = [
  {label:'A Option Option Super Super Long',value:'A0'},
  {label:'B Option',value:'B0'},
  {label:'C Option',value:'C0'},
  {label:'D Option',value:'D0'},
  {label:'E Option',value:'E0'},
  {label:'A1 Option',value:'A1'},
  {label:'B2 Option',value:'B1'},
  {label:'C2 Option',value:'C1'},
  {label:'D2 Option',value:'D1'},
  {label:'E2 Option Super Super Long',value:'E1'},
];

class DropdownExample extends React.Component {

  displayName: "DropdownExample"

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnUpdateHighlighted () {
    console.log('onUpdateHighlighted should be defined');
  }

  handleOnSelect(value) {
    console.log('selected: ',value);
  }

  handleOnClick() {
    console.log('onClick should be defined');
  }

  render(){
    return (
      <div>
        <SLDSDropdown
          label="Contacts"
          modal={true}
          onClick={this.handleOnClick}
          onSelect={this.handleOnSelect}
          onUpdateHighlighted={this.handleOnUpdateHighlighted}
          options={options}
          placeholder="Select a contact"
          value='C0'
          />
      </div>
    );
  }

}

React.render(<DropdownExample />, mountNode);

