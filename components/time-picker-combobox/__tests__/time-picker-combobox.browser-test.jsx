import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';

/* Enzyme Helpers that can mount and unmount React component instances to
 * the DOM and set `this.wrapper` and `this.dom` within Mocha's `this`
 * context [full source here](tests/enzyme-helpers.js). `this` can
 * only be referenced if inside `function () {}`.
 */

import {
  createMountNode,
  destroyMountNode,
} from '../../../tests/enzyme-helpers';

import TimepickerCombobox from '..';
import IconSettings from '../../../components/icon-settings';

chai.use(chaiEnzyme());

describe('Timepicker Combobox: ', function describeFunction() {
  describe('Default', () => {
    let mountNode;
    let wrapper;

    beforeEach(() => {
      mountNode = createMountNode({ context: this });
      wrapper = mount(<IconSettings iconPath="/assets/icons"><TimepickerCombobox /></IconSettings>, { attachTo: mountNode });
    });

    afterEach(() => {
      destroyMountNode({ wrapper, mountNode });
    });

    it('renders a timepicker', () => {
      const timepicker = wrapper.find(TimepickerCombobox);
      expect(timepicker).to.be.present;
    });

    it('generates default number of options', () => {
      const timepicker = wrapper.find(TimepickerCombobox);
      expect(timepicker.state('options')).to.have.lengthOf(48);
    });
  });

  describe('Timepicker Optional Props', () => {
    let mountNode;
    let wrapper;

    const futureDateTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    futureDateTime.setHours(0);
    futureDateTime.setMinutes(0);
    futureDateTime.setSeconds(0);
    futureDateTime.setMilliseconds(0);

    const customProps = {
      initialDate: futureDateTime,
      stepInMinutes: 60,
    };

    beforeEach(() => {
      mountNode = createMountNode({ context: this });
      wrapper = mount(<IconSettings iconPath="/assets/icons"><TimepickerCombobox {...customProps} /></IconSettings>, { attachTo: mountNode });
    });

    afterEach(() => {
      destroyMountNode({ wrapper, mountNode });
    });

    it('stepInMinutes changes the number of options', () => {
      const timepicker = wrapper.find(TimepickerCombobox);
      expect(timepicker.state('options')).to.have.lengthOf(24);
    });

    it('initialDate changes the date of the options', () => {
      const timepicker = wrapper.find(TimepickerCombobox);
      const firstValue = timepicker.state('options')[0].value;
      expect(firstValue.getTime()).to.equal(futureDateTime.getTime())
    });
  });
});
