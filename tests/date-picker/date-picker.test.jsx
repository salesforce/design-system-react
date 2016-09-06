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

    const renderDatePicker = inst => {
        body = document.createElement('div');
        document.body.appendChild(body);

        return ReactDOM.render(inst, body);
    };

    const removeDatePicker = () => {
        ReactDOM.unmountComponentAtNode(body);
        document.body.removeChild(body);
    };

    const createDatePicker = (props) => React.createElement(SLDSDatepicker, assign({}, defaultProps, props));
    const getDatePicker = (props) => renderDatePicker(createDatePicker(props));

    describe('DatePicker Value Prop Change', () => {
        let cmp;
        let picker;

        beforeEach(() => {
            cmp = getDatePicker(defaultProps);
            picker = findRenderedDOMComponentWithClass(cmp, 'slds-form-element');
        });

        afterEach(() => removeDatePicker());

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
