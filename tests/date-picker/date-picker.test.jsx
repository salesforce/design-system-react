/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */

import React, { createFactory, createClass } from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

const { Simulate, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } = TestUtils;

import { SLDSDatepicker } from '../../components';

const mockCallback = sinon.spy();

const formatter = (date) => (date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getFullYear();
const dateTimeNow = new Date();
const defaultStrValue = formatter(dateTimeNow);

describe('SLDSDatepicker: ', () => {
    let body;

    const defaultProps = {
        onDateChange: () => {},
        value: dateTimeNow,
        strValue: defaultStrValue
    };

    describe('DatePicker Value Prop Change', () => {
        it("displays a modified state upon changing props", () => {
            const TestDatePicker = createFactory(
                createClass({
                    getInitialState() {
                        // force the state to have a future dateTime...
                        return {
                          isOpen:false,
                          value: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                          strValue: formatter(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
                        };
                    },
                    render() {
                        return <SLDSDatepicker ref="datePicker" { ...defaultProps } />
                    }
                })
            );

            const parent = TestUtils.renderIntoDocument(TestDatePicker());
            parent.refs.datePicker.state.strValue.should.eql(defaultStrValue);

            const time = parent.refs.datePicker.state.value.getTime();
            time.should.eql(dateTimeNow.getTime());
        });
    });
});
