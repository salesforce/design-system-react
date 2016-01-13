'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;

import { SLDSSettings } from '../components/';
SLDSSettings.setAssetsPath('demo/assets/');
SLDSSettings.setAppElement('#root');
//console.log('SLDSSettings.getAssetsPath: '+SLDSSettings.getAssetsPath());

import App from './App';
import HomePage from './pages';
import GettingStarted from './pages/GettingStarted';
import FAQ from './pages/FAQ';

import ButtonSection from './pages/ButtonSection';
import ButtonStatefulSection from './pages/ButtonStatefulSection';
import ButtonGroupSection from './pages/ButtonGroupSection';
import DropdownBaseSection from './pages/DropdownSection';
import IconSection from './pages/IconSection';
import LookupSection from './pages/LookupSection';
import ModalSection from './pages/ModalSection';

import DatePickerSingleSelectSection from './pages/DatePickerSingleSelectSection';
import NotificationSection from './pages/NotificationSection';
import PicklistSection from './pages/PicklistSection';
import TooltipSection from './pages/TooltipSection';

const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HomePage} />
    <Route name="home" handler={HomePage}>
      <Route name="getting-started" path="getting-started" handler={GettingStarted}/>

      <Route name="button" path="button" handler={ButtonSection}/>
      <Route name="button-stateful" path="button-stateful" handler={ButtonStatefulSection}/>
      <Route name="button-group" path="button-group" handler={ButtonGroupSection}/>
      <Route name="dropdown" path="dropdown" handler={DropdownBaseSection}/>
      <Route name="icon" path="icon" handler={IconSection}/>
      <Route name="lookup" path="lookup" handler={LookupSection}/>
      <Route name="modal" path="modal" handler={ModalSection}/>
      <Route name="notification" path="notification" handler={NotificationSection}/>
      <Route name="picklist" path="picklist" handler={PicklistSection}/>
      <Route name="tooltip" path="tooltip" handler={TooltipSection}/>
      <Route name="datepicker" path="datepicker" handler={DatePickerSingleSelectSection}/>

      <Route name="faq" path="faq" handler={FAQ}/>
    </Route>
  </Route>
);


Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('root'));
});

