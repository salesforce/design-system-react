/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
// import Popover from '~/components/popover';

class Example extends React.Component {
  render() {
    return (
      <Combobox
        id="combobox-dialog"
        popover
      >
        <div>Heyooooo</div>
      </Combobox>
    );
  }
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime