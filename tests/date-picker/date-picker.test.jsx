/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */

import React, {createFactory, createClass} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import assign from 'lodash.assign';

const {Simulate, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass} = TestUtils;

import {SLDSDatepicker} from '../../components';

const mockCallback = sinon.spy();

const formatter = (date) => `${ date.getMonth() + 1 }/${ date.getDate() }/${ date.getFullYear() }`;
const dateTimeNow = new Date();
const defaultStrValue = formatter(dateTimeNow);

describe('SLDSDatepicker: ', () => {
    const defaultProps = {
        onDateChange: () => {
        },
        isInline: true,
        value: dateTimeNow,
        strValue: defaultStrValue
    };

    describe('Datepicker displays the correct value', () => {
        it('displays the default string when not provided value', () => {

            const TestDatePicker = createFactory(
                createClass({
                    getInitialState() {
                        // force the state to have a future dateTime...
                        return {
                            isOpen: false
                        };
                    },
                    render() {
                        return <SLDSDatepicker ref="datePicker" { ...defaultProps } />
                    }
                })
            );
            const parent = TestUtils.renderIntoDocument(TestDatePicker());

            parent.refs.datePicker.state.strValue.should.eql(defaultStrValue);

        });

        it('displays the value date if initialized with value', () => {
            const initialDate = new Date();
            const TestDatePicker = createFactory(
                createClass({
                    getInitialState() {
                        // force the state to have a future dateTime...
                        return {
                            isOpen: false,
                            value: initialDate
                        };
                    },
                    render() {
                        return <SLDSDatepicker ref="datePicker" { ...defaultProps } />
                    }
                })
            );
            const parent = TestUtils.renderIntoDocument(TestDatePicker());
            parent.refs.datePicker.state.strValue.should.eql(formatter(initialDate));

        });
    });

    describe('DatePicker Value Prop Change', () => {
        it("displays a modified state upon changing props", () => {
            const futureDateTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            const TestDatePicker = createFactory(
                createClass({
                    getInitialState() {
                        // force the state to have a future dateTime...
                        return {
                            isOpen: false,
                            value: futureDateTime,
                            strValue: formatter(futureDateTime)
                        };
                    },
                    render() {
                        return <SLDSDatepicker ref="datePicker" { ...defaultProps } />
                    }
                })
            );

            const parent = TestUtils.renderIntoDocument(TestDatePicker());

            const time = parent.refs.datePicker.state.value.getTime();
            time.should.eql(dateTimeNow.getTime());
        });
    });
});
