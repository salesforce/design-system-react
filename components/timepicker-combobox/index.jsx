/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import isDate from 'lodash.isdate';

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
	 * HTML id for component.
	 */
  id: PropTypes.string,
  labels: PropTypes.shape({
    label: PropTypes.string,
  }),
  required: PropTypes.bool,
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
  labels: {
    label: 'Time',
    placeholderReadOnly: '',
  },
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

  render() {
    return (
      <Combobox
        disabled={this.props.disabled}
        required={this.props.required}
        labels={this.props.labels}
        options={this.state.options}
        menuItemVisibleLength={5}
        // predefinedOptionsOnly
        id={this.getId()}
        variant="readonly"
      />
    );
  }
}

TimepickerCombobox.displayName = TIME_PICKER_COMBOBOX;
TimepickerCombobox.propTypes = propTypes;
TimepickerCombobox.defaultProps = defaultProps;

export default TimepickerCombobox;
