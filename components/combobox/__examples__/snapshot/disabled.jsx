import React from 'react';
import Combobox from '~/components/combobox/combobox';
import IconSettings from '~/components/icon-settings';

class Example extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <section>
        <h1 className="slds-text-title_caps slds-p-vertical--medium">
          Disabled Combobox
        </h1>
        <IconSettings iconPath="/assets/icons">
          <Combobox
            id="combobox-unique-id"
            disabled
          />
        </IconSettings>
      </section>
      );
  }
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
