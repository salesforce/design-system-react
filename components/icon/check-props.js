/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function () { };

if (process.env.NODE_ENV !== 'production') {
    checkProps = function (COMPONENT, props) {
        if (typeof props.assistiveText === 'string') {
            sunsetProperty(
                COMPONENT,
                props.assistiveText,
                'assistiveText',
                '`assistiveText` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use `assistiveText.label` instead.'
            );
        }
    };
}

export default checkProps;
