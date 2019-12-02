/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import shortid from 'shortid';

import Combobox from '../combobox';
import { TIME_PICKER_COMBOBOX } from '../../utilities/constants';

const propTypes = {
  /**
	 * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them.
	 * This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need. _Tested with snapshot testing._
	 */
  'aria-describedby': PropTypes.string,
  /**
   * Disables the input and prevents editing the contents.
   */
  disabled: PropTypes.bool,
  /**
   * Time formatting function
   */
  formatter: PropTypes.func,
  /**
   * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the `labels.label`. The props from the component will be merged and override any default props.
   */
  fieldLevelHelpTooltip: PropTypes.node,
  /**
	 * HTML id for component.
	 */
  id: PropTypes.string,
  /**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `label`: This label appears above the input.
	 * * `placeholderReadOnly`: Placeholder for Picklist-like Combobox
	 */
  labels: PropTypes.shape({
    label: PropTypes.string,
    placeholderReadOnly: PropTypes.string,
  }),
  /**
   * Function called when a new time is selected.
   */
  onSelect: PropTypes.func,
  /**
   * Applies label styling for a required form element.
   */
  required: PropTypes.bool,
  /**
	 * Accepts an array of item objects. For single selection, pass in an array of one object.
	 */
  selection: PropTypes.arrayOf(
    PropTypes.PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      value: PropTypes.date,
    })
  ).isRequired,
  /**
   * Frequency of options
   */
  stepInMinutes: PropTypes.number,
  /**
	 * Value of input. _This is a controlled component,_ so you will need to control the input value by passing the `value` from `onChange` to a parent component or state manager, and then pass it back into the componet with this prop. Please see examples for more clarification. _Tested with snapshot testing._
	 */
  value: PropTypes.string,
};

const defaultProps = {
  formatter(date) {
    if (date) {
      return date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return null;
  },
  events: {},
  labels: {
    label: 'Time',
    placeholderReadOnly: '',
  },
  selection: [],
  stepInMinutes: 30,
};

const getOptions = ({ props }) => {
  const baseDate = new Date();
  const options = [];

  baseDate.setHours(0);
  baseDate.setMinutes(0);
  baseDate.setSeconds(0);
  baseDate.setMilliseconds(0);

  const curDate = new Date(baseDate);

  // eslint-disable-next-line fp/no-loops
  while (baseDate.getDate() === curDate.getDate()) {
    const formatted = props.formatter(curDate);

    // eslint-disable-next-line fp/no-mutating-methods
    options.push({
      id: shortid.generate(),
      label: formatted,
      value: new Date(curDate),
    });

    curDate.setMinutes(curDate.getMinutes() + props.stepInMinutes);
  }

  return options;
};

class TimepickerCombobox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: getOptions({ props: this.props }),
    }

    this.generatedId = shortid.generate();
  }

  getId = () => this.props.id || this.generatedId;

  handleSelect = (event, { selection }) => {
    if (this.props.events.onSelect) {
      this.props.events.onSelect(event, { selection });
    }
  };

  render() {
    return (
      <Combobox
        {...this.props}
        events={{ onSelect: this.handleSelect }}
        id={this.getId()}
        inputIcon="clock"
        menuItemVisibleLength={5}
        options={this.state.options}
        variant="readonly"
      />
    );
  }
}

TimepickerCombobox.displayName = TIME_PICKER_COMBOBOX;
TimepickerCombobox.propTypes = propTypes;
TimepickerCombobox.defaultProps = defaultProps;

export default TimepickerCombobox;
