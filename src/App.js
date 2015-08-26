import React, { Component } from 'react';
import SLDSDateInput from './slds/SLDSDateInput/index';
import Menu from './slds/SLDSDropdowns/index.react';
import BaseLayout from './layout/base';

import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;


require('./index.scss')

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
    <BaseLayout>
        <RouteHandler/>
    </BaseLayout>
    );
  }
}
