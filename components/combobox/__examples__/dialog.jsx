/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      selection: [],
    }
  }

  render() {
    return (
      <IconSettings iconPath="/assets/icons">
        <Combobox
          // assistiveText={{ popoverHeading: 'Select up to 2' }}
          id="combobox-dialog"
          events={{
            onSubmit: (event, { value }) => {

            },
            onSelect: (event, { value }) => {

            },
          }}
          labels={{ label: 'Languages' }}
          popover
          selection={this.state.selection}
          value={this.state.inputValue}
          variant="popover"
        >
          <fieldset className="slds-form-element">
            <legend className="slds-form-element__legend slds-form-element__label">Select up to 2</legend>
            <div className="slds-form-element__control">
              <div className="slds-checkbox">
                <input
                  type="checkbox"
                  name="options"
                  id='checkbox-0'
                  value='checkbox-0'
                // onKeyDown={this.handleKeyDown}
                // onChange={() => { this.handleChange(option) }}
                // checked={this.state.currChecked.includes(option)}
                />
                <label className="slds-checkbox__label" htmlFor='checkbox-0'>
                  <span className="slds-checkbox_faux" />
                  <span className="slds-form-element__label">English</span>
                </label>
              </div>
              <div className="slds-checkbox">
                <input
                  type="checkbox"
                  name="options"
                  id='checkbox-1'
                  value='checkbox-1'
                // onKeyDown={this.handleKeyDown}
                // onChange={() => { this.handleChange(option) }}
                // checked={this.state.currChecked.includes(option)}
                />
                <label className="slds-checkbox__label" htmlFor='checkbox-1'>
                  <span className="slds-checkbox_faux" />
                  <span className="slds-form-element__label">German</span>
                </label>
              </div>
              <div className="slds-checkbox">
                <input
                  type="checkbox"
                  name="options"
                  id='checkbox-2'
                  value='checkbox-2'
                // onKeyDown={this.handleKeyDown}
                // onChange={() => { this.handleChange(option) }}
                // checked={this.state.currChecked.includes(option)}
                />
                <label className="slds-checkbox__label" htmlFor='checkbox-2'>
                  <span className="slds-checkbox_faux" />
                  <span className="slds-form-element__label">Tobagonian Creole English</span>
                </label>
              </div>
              <div className="slds-checkbox">
                <input
                  type="checkbox"
                  name="options"
                  id='checkbox-3'
                  value='checkbox-3'
                // onKeyDown={this.handleKeyDown}
                // onChange={() => { this.handleChange(option) }}
                // checked={this.state.currChecked.includes(option)}
                />
                <label className="slds-checkbox__label" htmlFor='checkbox-3'>
                  <span className="slds-checkbox_faux" />
                  <span className="slds-form-element__label">Spanish</span>
                </label>
              </div>
            </div>
          </fieldset>
        </Combobox>
      </IconSettings>
    );
  }
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime