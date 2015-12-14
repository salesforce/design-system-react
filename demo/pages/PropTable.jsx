/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


import React from 'react';
import DOCS from '../../docs';

const displayName = "PropTable";
const propTypes = {
};
const defaultProps = {
};

class PropTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if(!DOCS[this.props.component]){
      return;
    }
  }

  renderEnum(enumType) {
    const enumValues = enumType.value || [];
    const renderedEnumValues = [];
    enumValues.forEach(function renderEnumValue(enumValue, i) {
      if (i > 0) {
        renderedEnumValues.push(
          <span key={`${i}c`}>, </span>
        );
      }

      renderedEnumValues.push(
        <code key={`${i}val`}>{enumValue}</code>
      );
    });

    return (
      <span>one of: {renderedEnumValues}</span>
    );
  }

  renderPropInfo() {
    const docs = DOCS[this.props.component].props;
    let props = [];
    for(var prop in docs) {
      let p = docs[prop];
      let propType = p.type ? p.type : null;

      let type;
      propType.name === 'enum' ? type = this.renderEnum(propType) : type = p.type;

      let row = (
        <tr key={prop}>
          <td>{prop}</td>
          <td className="mw-col-m">{type}</td>
          <td>{docs[prop].defaultValue ? docs[prop].defaultValue.value : ""}</td>
          <td className="mw-col-l">{docs[prop].description }</td>
        </tr>
      );
      props.push(row);
    }
    return props;
  }

  render(){
    return (
      <div className="slds-p-vertical--medium">
        <h1 className="slds-text-heading--small slds-p-vertical--medium">Prop Details</h1>
        <table className="slds-table slds-table--bordered slds-max-medium-table--stacked slds-no-row-hover">
          <thead>
            <tr className="site-text-heading--label">
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPropInfo()}
          </tbody>
        </table>
      </div>
    );
  }

}

PropTable.displayName = displayName;
PropTable.propTypes = propTypes;
PropTable.defaultProps = defaultProps;

module.exports = PropTable;

