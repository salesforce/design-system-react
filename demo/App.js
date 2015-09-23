import React, { Component } from 'react';
import SLDSDateInput from './slds/SLDSDateInput/index';
import BaseLayout from './layout/base';

import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;


require('./index.scss')

export default class App extends Component {
  render() {
    return (
    <BaseLayout>
        <RouteHandler/>
    </BaseLayout>
    );
  }
}
