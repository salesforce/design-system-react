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
import IconSection from './pages/HomePage/IconSection';
import ModalSection from './pages/HomePage/ModalSection';
import WorkspacePage from './pages/WorkspacePage';
import ReferencePage from './pages/ReferencePage';


const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HomePage} />
    <Route name="home" handler={HomePage}/>
    <Route name="button" path="button" handler={ButtonSection}/>
    <Route name="icon" path="icon" handler={IconSection}/>
    <Route name="modal" path="modal" handler={ModalSection}/>
    <Route name="workspace" path="workspace" handler={WorkspacePage}/>
    <Route name="reference" path="reference" handler={ReferencePage}/>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});

