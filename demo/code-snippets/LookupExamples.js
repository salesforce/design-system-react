const items = [
  {label:'Paddy\'s Pub'},
  {label:'Tyrell Corp'},
  {label:'Paper St. Soap Company'},
  {label:'Nakatomi Investments'},
  {label:'Acme Landscaping'},
  {label:'Acme Construction'}
];

class LookupExample extends React.Component {

  displayName: "LookupExample"

  constructor(props) {
    super(props);
    this.state = {
      searchVal: null
    };
  }

  onChange(newValue){
    console.log('New search term: ', newValue);
    this.setState({searchVal: newValue});
  }

  selectItem(item){
    console.log(item , ' Selected');
  }

  getHeader(){
    let searchLabel = (this.state.searchVal ? '"' + this.state.searchVal + '"':"") + ' in Accounts';
    return <DefaultHeader searchLabel={searchLabel} salesforceObj='account' />;
  }

  getFooter(){
    return <DefaultFooter salesforceObj='account' newItemLabel='New Account'/>;
  }

  render(){
    return (
      <div>
        <SLDSLookup
          emptyMessage="No items found"
          footerRenderer={SLDSLookup.DefaultFooter}
          hasError={false}
          headerRenderer={SLDSLookup.DefaultHeader}
          iconCategory='standard'
          iconName='account'
          label="Account"
          onChange={this.onChange.bind(this)}
          onItemSelect={this.selectItem}
          options={items}
          salesforceObj="account"
        />
      </div>
    );
  }

}

React.render(<LookupExample />, mountNode);

