import React from 'react';
import Router from 'react-router';
const { Link } = Router;
import GlobalVariables from 'demo/docs/globalVariables';

import {SLDSLookup} from 'design-system-react';

module.exports = React.createClass({
  render(){
    return (
      <section className="copy-text" style={{"maxWidth": "800px"}}>
        <h1 className='slds-text-heading--large'>
          Playground!
        </h1>
        <hr />
        <SLDSLookup
          emptyMessage="No items found"
          hasError={false}
          label="Account"
          onChange={function(newValue){console.log("New search term: ", newValue)}}
          onSelect={function(item){console.log(item , " Selected")}}
          options={[
            {label: "Paddy\"s Pub"},
            {label: "Tyrell Corp"},
            {label: "Paper St. Soap Company"},
            {label: "Nakatomi Investments"},
            {label: "Acme Landscaping"},
            {label: "Acme Construction"}
          ]}
        />
      </section>
    );
  }
});