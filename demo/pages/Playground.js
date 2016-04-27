import React from 'react';
import Router from 'react-router';
const { Link } = Router;
import GlobalVariables from 'demo/docs/globalVariables';


module.exports = React.createClass({
  render(){
    return (
      <section className="copy-text" style={{"maxWidth": "800px"}}>
        <h1 className='slds-text-heading--large'>
          Playground!
        </h1>
      </section>
    );
  }
});