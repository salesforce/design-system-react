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

import BreadCrumbSection from './pages/BreadCrumbSection';
import ButtonSection from './pages/ButtonSection';
import ButtonStatefulSection from './pages/ButtonStatefulSection';
import ButtonGroupSection from './pages/ButtonGroupSection';
import CardSection from './pages/CardSection';
import ContextBarSection from './pages/ContextBarSection';
import DataTableSection from './pages/DataTableSection';
import DateInputSection from './pages/DateInputSection';
import DatePickerSection from './pages/DatePickerSection';
import TimePickerSection from './pages/TimePickerSection';
import DropdownBaseSection from './pages/DropdownSection';
import IconSection from './pages/IconSection';
import LookupSection from './pages/LookupSection';
import ModalSection from './pages/ModalSection';
import NotificationSection from './pages/NotificationSection';
import PageHeaderSection from './pages/PageHeaderSection';
import PicklistSection from './pages/PicklistSection';
import TooltipSection from './pages/TooltipSection';

import Playground from './pages/Playground';

const routes = (
    <Route name="home" path="/" handler={HomePage}>
      <DefaultRoute handler={Welcome} />

      <Route name="playground" path="playground" handler={Playground} />


      <Route name="welcome" path="welcome" handler={Welcome} />
      <Route name="getting-started" path="getting-started" handler={GettingStarted} />
      <Route name="breadcrumb" path="breadcrumb" handler={BreadCrumbSection}/>
      <Route name="button" path="button" handler={ButtonSection}/>
      <Route name="button-stateful" path="button-stateful" handler={ButtonStatefulSection}/>
      <Route name="button-group" path="button-group" handler={ButtonGroupSection}/>
      <Route name="card" path="card" handler={CardSection}/>
      <Route name="context-bar" path="context-bar" handler={ContextBarSection}/>
      <Route name="data-table" path="data-table" handler={DataTableSection}/>
      <Route name="dateinput" path="dateinput" handler={DateInputSection}/>
      <Route name="timepicker" path="timepicker" handler={TimePickerSection}/>
      <Route name="datepicker" path="datepicker" handler={DatePickerSection}/>
      <Route name="menu-dropdown" path="dropdown" handler={DropdownBaseSection}/>
      <Route name="menu-picklist" path="picklist" handler={PicklistSection}/>
      <Route name="icon" path="icon" handler={IconSection}/>
      <Route name="lookup" path="lookup" handler={LookupSection}/>
      <Route name="modal" path="modal" handler={ModalSection}/>
      <Route name="notification" path="notification" handler={NotificationSection}/>
      <Route name="page-header" path="page-header" handler={PageHeaderSection}/>
      <Route name="popover-tooltip" path="tooltip" handler={TooltipSection}/>
      <Route name="faq" path="faq" handler={FAQ} />
    </Route>
);

Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.getElementById('root'));
});
