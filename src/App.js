import React, { Component } from 'react';
import SLDSDateInput from './slds/SLDSDateInput/index';
import Menu from './slds/SLDSDropdowns/index.react';


export default class App extends Component {
  filterItem(term, item) {
    console.log('term', term);
    return true;
  }

  showSelected(item, idx) {
    alert(`You selected index ${idx}: ${item.props.children}`);
  }

  render() {
    return (
    <div>
    <Menu itemSelected={this.showSelected.bind(this)} filterWith={this.filterItem.bind(this)} className="slds-dropdown--small customClass1">
      <Menu.Header className="customClass2">
        <Menu.Filter placeholder="Find in list..." className="customClass3" />
        <Menu.Title className="customClass4">Lists</Menu.Title>
      </Menu.Header>
      <Menu.List className="customClass5">
        <Menu.Item href="#" className="customClass6" id="six">
          Opportunities Closing this Quarter
        </Menu.Item>
        <Menu.Item className="slds-is-selected" href="#" aria-selected="true">
          All Opportunities
        </Menu.Item>
        <Menu.Item href="#">
          My Opportunities
        </Menu.Item>
        <Menu.Item href="#">
          United Partner Opportunities
        </Menu.Item>
        <Menu.Item href="#">
          Acme Inc Opportunities
        </Menu.Item>
        <Menu.Item href="#">
          My Opportunities about 80k
        </Menu.Item>
      </Menu.List>
    </Menu>
    <div className="sds-grid sds-grid--align-center">
        <div className="sds-col--padded">
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <SLDSDateInput />
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <SLDSDateInput />
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
        </div>
        <div className="sds-col--padded">
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <SLDSDateInput />
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <SLDSDateInput label='SUPER DATE PICKER'/>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>
            <div>MORE STUFF IS HERE</div>

        </div>
    </div>

    </div>
    );
  }
}
