import CustomListItemLabel from './CustomListItemLabel.cjsx';

const picklistCustomOptions = [
  {label:'A Option Option Super Super Long',value:'A0',strongLabel:'SUPER TITLE B0'},
  {label:'B Option',value:'B0',strongLabel:'SUPER TITLE B0'},
  {label:'C Option',value:'C0',strongLabel:'SUPER TITLE C0'},
  {label:'D Option',value:'D0',strongLabel:'SUPER TITLE D0'},
  {label:'E Option',value:'E0',strongLabel:'SUPER TITLE E0'},
  {label:'A1 Option',value:'A1',strongLabel:'SUPER TITLE A1'},
  {label:'B2 Option',value:'B1',strongLabel:'SUPER TITLE B1'},
  {label:'C2 Option',value:'C1',strongLabel:'SUPER TITLE C1'},
  {label:'D2 Option',value:'D1',strongLabel:'SUPER TITLE D1'},
  {label:'E2 Option Super Super Long',value:'E1',strongLabel:'SUPER TITLE E1'},
];

class PicklistCustomExample extends React.Component {

  displayName: "PicklistCustomExample"

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
       <SLDSMenuPicklist
         label="Contacts"
         listItemRenderer={CustomListItemLabel}
         modal={true}
         onClick={this.handleOnClick}
         onSelect={this.handleOnSelect}
         onUpdateHighlighted={this.handleOnUpdateHighlighted}
         options={picklistCustomOptions}
         placeholder="Select a contact"
         value='C0'
         />
      </div>
    );
  }

}

ReactDOM.render(<PicklistCustomExample />, mountNode);

