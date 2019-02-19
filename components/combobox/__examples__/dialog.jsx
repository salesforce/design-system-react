/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Checkbox from '~/components/checkbox';
import Combobox from '~/components/combobox';
import IconSettings from '~/components/icon-settings';
import Popover from '~/components/popover';

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: 'Select an option',
      selection: [],
    };
  }

  handleCheckboxChange(target, value) {
    const selection = this.state.selection;
    if (target.checked) {
      selection.push({
        id: target.id,
        label: value,
      });
    } else {
      const valueIndex = selection.findIndex((el) => el.label === value);
      selection.splice(valueIndex, 1);
    }

    let inputValue = '';
    if (selection.length === 0) inputValue = 'Select an option';
    else if (selection.length === 1) inputValue = `${selection[0].label}`;
    else inputValue = `${selection.length} options selected`;

    this.setState({ inputValue, selection });
  }

  render() {
    return (
      <IconSettings iconPath="/assets/icons">
        <Combobox
          ariaLabelledby="popover-label"
          assistiveText={{
            popoverLabel: 'Language Options'
          }}
          id="combobox-dialog"
          events={{
            onSubmit: (e) => { },
          }}
          firstFocusable={this.firstFocusable}
          labels={{
            label: 'Languages',
            placeholder: this.state.inputValue,
          }}
          popover={
            <Popover
              body={
                <div>
                  <fieldset className="slds-form-element">
                    <legend className="slds-form-element__legend slds-form-element__label">
                      Select up to 2
                    </legend>
                    <div className="slds-form-element__control">
                      <Checkbox
                        id="checkbox-0"
                        labels={{ label: 'English' }}
                        onChange={(e) => {
                          this.handleCheckboxChange(e.target, 'English');
                        }}
                      />
                      <Checkbox
                        id="checkbox-1"
                        labels={{ label: 'German' }}
                        onChange={(e) => {
                          this.handleCheckboxChange(e.target, 'German');
                        }}
                      />
                      <Checkbox
                        id="checkbox-2"
                        labels={{ label: 'Tobagonian Creole English' }}
                        onChange={(e) => {
                          this.handleCheckboxChange(
                            e.target,
                            'Tobagonian Creole English'
                          );
                        }}
                      />
                      <Checkbox
                        id="checkbox-3"
                        labels={{ label: 'Spanish' }}
                        onChange={(e) => {
                          this.handleCheckboxChange(e.target, 'Spanish');
                        }}
                      />
                    </div>
                  </fieldset>
                </div>
              }
            />
          }
          selection={this.state.selection}
          value={this.state.inputValue}
          variant="popover"
        />
      </IconSettings>
    );
  }
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
