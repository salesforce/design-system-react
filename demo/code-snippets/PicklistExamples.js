const picklistOptions = [
  {label:'A Option Option Super Super Long',value:'A0', title: 'Greg'},
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

class PicklistExample extends React.Component {

  displayName: "PicklistExample"

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
       <SLDSPicklist
         label="Contacts"
         modal={true}
         onClick={this.handleOnClick}
         onSelect={this.handleOnSelect}
         onUpdateHighlighted={this.handleOnUpdateHighlighted}
         options={picklistOptions}
         placeholder = "Select a contact"
         value='C0'
         />
      </div>
    );
  }

}

React.render(<PicklistExample />, mountNode);

