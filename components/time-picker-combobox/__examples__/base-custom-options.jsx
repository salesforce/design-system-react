/* eslint-disable no-console, react/prop-types */
import React from 'react';
import IconSettings from '~/components/icon-settings';
import TimepickerCombobox from '~/components/time-picker-combobox'; // `~` is replaced with design-system-react at runtime

const customOptions = [
  {
    id: '0',
    label: '07:30 AM',
    value: new Date(1575991800000)
  }, {
    id: '1',
    label: '08:45 AM',
    value: new Date(1575996300000)
  }, {
    id: '2',
    label: '10:00 AM',
    value: new Date(1576000800000)
  }, {
    id: '3',
    label: '11:15 AM',
    value: new Date(1576005300000)
  }, {
    id: '4',
    label: '12:30 PM',
    value: new Date(1576009800000)
  }, {
    id: '5',
    label: '01:45 PM',
    value: new Date(1576014300000)
  }, {
    id: '6',
    label: '03:00 PM',
    value: new Date(1576018800000)
  }, {
    id: '7',
    label: '04:15 PM',
    value: new Date(1576023300000)
  }
];

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selection: [] };
  }

  render() {
    return (
      <IconSettings iconPath="/assets/icons">
        <TimepickerCombobox
          id="timepicker-combobox"
          events={{
            onSelect: (event, data) => {
              console.log('onSelect ', data);
              this.setState({
                selection: data.selection,
              });
            },
          }}
          options={customOptions}
          selection={this.state.selection}
        />
      </IconSettings>
    );
  }
}

Example.displayName = 'TimepickerExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
