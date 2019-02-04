/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Checkbox from '~/components/checkbox';
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
          id="combobox-dialog"
          events={{
            onSubmit: (event, { value }) => {

            }
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
              <Checkbox
                id='checkbox-0'
                labels={{ label: 'English' }}
              />
              <Checkbox
                id='checkbox-1'
                labels={{ label: 'German' }}
              />
              <Checkbox
                id='checkbox-2'
                labels={{ label: 'Tobagonian Creole English' }}
              />
              <Checkbox
                id='checkbox-3'
                labels={{ label: 'Spanish' }}
              />
            </div>
          </fieldset>
        </Combobox>
      </IconSettings>
    );
  }
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime