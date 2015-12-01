'use strict';

import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;

import { SLDSSettings } from '../components/';
SLDSSettings.setAssetsPath('demo/assets/');
SLDSSettings.setAppElement('#root');
//console.log('SLDSSettings.getAssetsPath: '+SLDSSettings.getAssetsPath());

import App from './App';
import HomePage from './pages/HomePage';

import ButtonSection from './pages/HomePage/ButtonSection';
import ButtonGroupSection from './pages/HomePage/ButtonGroupSection';
import IconSection from './pages/HomePage/IconSection';
import ModalSection from './pages/HomePage/ModalSection';
import NotificationSection from './pages/HomePage/NotificationSection';
import TooltipSection from './pages/HomePage/TooltipSection';

import LookupSection from './pages/HomePage/LookupSection';

import PicklistSection from './pages/HomePage/PicklistSection';

import DropdownBaseSection from './pages/HomePage/DropdownBaseSection';

import DatePickerSingleSelectSection from './pages/HomePage/DatePickerSingleSelectSection';

import WorkspacePage from './pages/WorkspacePage';
import ReferencePage from './pages/ReferencePage';


const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HomePage} />
    <Route name="home" handler={HomePage}>
      <Route name="button" path="button" handler={ButtonSection}/>
      <Route name="button-group" path="button-group" handler={ButtonGroupSection}/>
      <Route name="dropdown" path="dropdown" handler={DropdownBaseSection}/>
      <Route name="icon" path="icon" handler={IconSection}/>
      <Route name="lookup" path="lookup" handler={LookupSection}/>
      <Route name="modal" path="modal" handler={ModalSection}/>
      <Route name="notification" path="notification" handler={NotificationSection}/>
      <Route name="picklist" path="picklist" handler={PicklistSection}/>
      <Route name="tooltip" path="tooltip" handler={TooltipSection}/>
      <Route name="datepicker" path="datepicker" handler={DatePickerSingleSelectSection}/>
    </Route>
    <Route name="workspace" path="workspace" handler={WorkspacePage}/>
    <Route name="reference" path="reference" handler={ReferencePage}/>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});

