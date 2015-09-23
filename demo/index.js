import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, RouteHandler, Link } = Router;

import App from './App';
import HomePage from './pages/HomePage';
import WorkspacePage from './pages/WorkspacePage';
import ReferencePage from './pages/ReferencePage';


const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={HomePage} />
    <Route name="home" handler={HomePage}/>
    <Route name="workspace" path="workspace" handler={WorkspacePage}/>
    <Route name="reference" path="reference" handler={ReferencePage}/>
  </Route>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});

