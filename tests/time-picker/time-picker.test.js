/* eslint-env mocha */
/* global sinon */
/* eslint-disable react/display-name */

import React, { createFactory, createClass } from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import assign from 'lodash.assign';

const { Simulate, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass } = TestUtils;

import { SLDSTimepicker } from '../../components';

const mockCallback = sinon.spy();

const formatter = (date) => (date.getMonth() + 1 ) + '/' + date.getDate() + '/' + date.getFullYear();
const dateTimeNow = new Date();
const defaultStrValue = formatter(dateTimeNow);

describe('SLDSTimepicker: ', () => {
    let body;

    const defaultProps = {
        onDateChange: () => {},
        value: dateTimeNow,
        strValue: defaultStrValue
    };

    const renderTimepicker = inst => {
        body = document.createElement('div');
        document.body.appendChild(body);

        return ReactDOM.render(inst, body);
    };

    const removeTimepicker = () => {
        ReactDOM.unmountComponentAtNode(body);
        document.body.removeChild(body);
    };

    const createTimepicker = (props) => React.createElement(SLDSTimepicker, assign({}, defaultProps, props));
    const getTimepicker = (props) => removeTimepicker(createTimepicker(props));

    describe('Timepicker Value Prop Change', () => {
        let cmp;
        let picker;

        beforeEach(() => {
            cmp = getTimepicker(defaultProps);
            picker = findRenderedDOMComponentWithClass(cmp, 'slds-form-element');
        });

        afterEach(() => removeTimepicker());

        it("displays a modified state upon changing props", () => {
            const TestTimepicker = createFactory(
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
                        return <SLDSTimepicker ref="timePicker" { ...defaultProps } />
                    }
                })
            );

            const parent = TestUtils.renderIntoDocument(TestTimepicker());
            parent.refs.timePicker.state.strValue.should.eql(defaultStrValue);
        });
    });
});
