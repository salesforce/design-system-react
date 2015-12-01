import React, { Component } from 'react';
import BaseLayout from './layout/base';

import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;


require('./index.css')

export default class App extends Component {

  scrollTo(elemId) {
    let that = this;
    return function() {
      var target = document.getElementById(elemId);
      that.animate(document.body, "scrollTop", "", 0, target.offsetTop, 500, true);
      target.focus();
    }
  }

  render() {
    return (
      <div className="wrapper slds-grid">
        <div className='region region--main slds-grow slds-size--1-of-2 slds-medium-size--1-of-2 slds-large-size--6-of-12 slds-col-rule--right slds-p-around--large'>

            <section className="slds-p-bottom--large">
              <h3 className="slds-text-heading--medium">Current Components</h3>
              <ul>
                <li><Link to="button">Buttonz</Link></li>
                <li><Link to="icon">Iconz</Link></li>
                <li><Link to="modal">Modalz</Link></li>
              </ul>
            </section>
        </div>

        <div className="region region--main slds-grow slds-size--1-of-2 slds-medium-size--1-of-2 slds-large-size--6-of-12 slds-col-rule--right slds-p-around--large">
          <RouteHandler/>
        </div>
      </div>


    );
  }
}

            //       { <ul>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('buttonSection')}>Button</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('buttonGroupSection')}>Button Group</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('dropdownSection')}>Dropdown</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('iconSection')}>Icon</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('lookupSection')}>Lookup</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('modalSection')}>Modal</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('notificationSection')}>Notification</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('picklistSection')}>Picklist</a>
            //   </li>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('tooltipSection')}>Tooltip</a>
            //   </li>
            // </ul>

            // <h3 className="slds-text-heading--medium slds-p-top--medium">Future Components</h3>
            // <ul>
            //   <li>
            //     <a href="javascript:void(0)" onClick={this.scrollTo('datepickerSection')}>Date Picker</a>
            //   </li>
            // </ul> }
