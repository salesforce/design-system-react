import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route, DefaultRoute, RouteHandler, Link } from 'react-router';

import { SLDSSettings } from '../components/';
SLDSSettings.setAssetsPath('demo/assets/');
SLDSSettings.setAppElement('#root');

import App from './App';
import HomePage from './pages';
import Welcome from './pages/Welcome';
import GettingStarted from './pages/GettingStarted';
import FAQ from './pages/FAQ';

import ButtonSection from './pages/ButtonSection';
import ButtonStatefulSection from './pages/ButtonStatefulSection';
import ButtonGroupSection from './pages/ButtonGroupSection';
import DateInputSection from './pages/DateInputSection';
import DatePickerSingleSelectSection from './pages/DatePickerSingleSelectSection';
import DropdownBaseSection from './pages/DropdownSection';
import IconSection from './pages/IconSection';
import LookupSection from './pages/LookupSection';
import ModalSection from './pages/ModalSection';
import NotificationSection from './pages/NotificationSection';
import PicklistSection from './pages/PicklistSection';
import TooltipSection from './pages/TooltipSection';


const routes = (
  <Route handler={App} path="/">
    <Route name="home" path="/" handler={HomePage}>
      <DefaultRoute handler={Welcome} />

      <Route name="welcome" path="welcome" handler={Welcome} />
      <Route name="getting-started" path="getting-started" handler={GettingStarted} />
      <Route name="button" path="button" handler={ButtonSection}/>
      <Route name="button-stateful" path="button-stateful" handler={ButtonStatefulSection}/>
      <Route name="button-group" path="button-group" handler={ButtonGroupSection}/>
      <Route name="dateinput" path="dateinput" handler={DateInputSection}/>
      <Route name="datepicker" path="datepicker" handler={DatePickerSingleSelectSection}/>
      <Route name="dropdown" path="dropdown" handler={DropdownBaseSection}/>
      <Route name="icon" path="icon" handler={IconSection}/>
      <Route name="lookup" path="lookup" handler={LookupSection}/>
      <Route name="modal" path="modal" handler={ModalSection}/>
      <Route name="notification" path="notification" handler={NotificationSection}/>
      <Route name="picklist" path="picklist" handler={PicklistSection}/>
      <Route name="tooltip" path="tooltip" handler={TooltipSection}/>
      <Route name="faq" path="faq" handler={FAQ} />
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('root'));
});
