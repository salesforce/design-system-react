/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const React = require('react');
const ReactDOM = require('react-dom');
const PT = React.PropTypes;
import SLDSPopover from '../SLDSPopover';
import SLDSDropdown from '../SLDSDropdowns';
import {Icon} from "./../SLDSIcons";
import {textContent} from '../utils/dom';
import {omit} from 'lodash';
const classNames = require('classnames');

class PickList extends React.Component {

  constructor(props) {
    super(props);
    const isInitiallyHidden = !this.props['aria-expanded'];
    this.state = { hidden: isInitiallyHidden, currentSelection: [], currentFocus: null };
  }

  itemSelected(item) {
    const sel = this.props.multiple ? this.state.currentSelection : [];
    this.setState({currentSelection: sel.concat(item) });
  }

  itemFocused(id) {
    this.setState({currentFocus: id });
  }

  hasSelection() {
    return this.state.currentSelection.length > 0;
  }

  toggleHidden() {
    this.setState({hidden: !this.state.hidden });
  }

  selectionText() {
    return this.state.currentSelection.map(s => textContent(s.props.children)).join(', ');
  }

  label() {
    return this.hasSelection() ? this.selectionText() : this.props.label;
  }

  getClassName(cls) {
    let className = `${this.props.className} ${cls}`;
    if(this.props.flavor) className += ` slds-picklist--${this.props.flavor}`;
    return className;
  }

  items() {
    return this.props.items.map((c, i) => {
      return <SLDSDropdown.Item href="#" key={i}>{c}</SLDSDropdown.Item>;
    });
  }

  popover() {
    return (
      <SLDSPopover targetElement={this.refs.dropdown}>
        <SLDSDropdown ref="dropdown" itemSelected={this.itemSelected.bind(this)}>
          <SLDSDropdown.Header>
            <SLDSDropdown.Filter placeholder="Find in list..." />
            <SLDSDropdown.Title>Lists</SLDSDropdown.Title>
          </SLDSDropdown.Header>
          <SLDSDropdown.List>
            {this.items()}
          </SLDSDropdown.List>
        </SLDSDropdown>
      </SLDSPopover>
    );
  }

  render() {
    let className = this.getClassName('slds-picklist');
    const props = omit(['className', 'label', 'flavor'], this.props);

    return (
      <div className="slds-form-element">
        <div {...props} className={className} aria-expanded={!this.state.hidden}>
          <button onClick={this.toggleHidden.bind(this)} className="slds-button slds-button--neutral slds-picklist__label" aria-haspopup="true" aria-activedescendant={this.state.currentFocus}>
            <span className="slds-truncate">{this.label()}</span>
            <Icon category="utility" name="down" />
          </button>
          { this.state.hidden ? null : this.popover() }
        </div>
      </div>
    );
  }
}
PickList.propTypes = { label: PT.string, flavor: PT.oneOf(['group', 'nested', 'multi', 'quickfind']) }
PickList.defaultProps = { label: 'Select an option' }

module.exports = PickList;
