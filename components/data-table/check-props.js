"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _getComponentDoc = require("../../utilities/get-component-doc");

var _getComponentDoc2 = _interopRequireDefault(_getComponentDoc);

var _sunsetProperty = require("../../utilities/warning/sunset-property");

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc2.default)(jsonDoc);
    /* eslint-disable max-len */
    // Deprecated and changed to another property

    (0, _deprecatedProperty2.default)(COMPONENT, props.onChange, 'onChange', 'onRowChange', 'The callback parameters have been changed. `onRowChange` passes in `[event, { selection }` in order to align with other components.');
    (0, _deprecatedProperty2.default)(COMPONENT, props.compact, 'compact', undefined, "compact has been deprecated as non-compact data tables do not exist in SLDS. ".concat(createDocUrl()));
    (0, _deprecatedProperty2.default)(COMPONENT, props.collection, 'collection', 'items', createDocUrl('items'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onSelect, 'onSelect', 'onChange', createDocUrl('onChange'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.onDeselect, 'onDeselect', 'onChange', createDocUrl('onChange'));
    (0, _sunsetProperty2.default)(COMPONENT, props.sortable, 'sortable', "The table is sortable if one or more of its columns are sortable. ".concat(createDocUrl())); // Deprecated and moved to a child

    (0, _sunsetProperty2.default)(COMPONENT, props.columns, 'columns', "Please provide one or more children of the type <Column /> instead. ".concat(createDocUrl()));
    (0, _sunsetProperty2.default)(COMPONENT, props.bordered, 'bordered', "All SLDS DataTables have row borders by default now. If you do not want row borders, please use `unborderedRow`. ".concat(createDocUrl('unborderedRow')));
    /* eslint-enable max-len */

    (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveTextForActionsHeader, 'assistiveTextForActionsHeader', "assistiveText['actionsHeader']", createDocUrl('assistiveText'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveTextForColumnSort, 'assistiveTextForColumnSort', "assistiveText['columnSort']", createDocUrl('assistiveText'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveTextForColumnSortedAscending, 'assistiveTextForColumnSortedAscending', "assistiveText['columnSortedAscending']", createDocUrl('assistiveText'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveTextForColumnSortedDescending, 'assistiveTextForColumnSortedDescending', "assistiveText['columnSortedDescending']", createDocUrl('assistiveText'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveTextForSelectAllRows, 'assistiveTextForSelectAllRows', "assistiveText['selectAllRows']", createDocUrl('assistiveText'));
    (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveTextForSelectRow, 'assistiveTextForSelectRow', "assistiveText['selectRow']", createDocUrl('assistiveText'));
  };
}

exports.default = checkProps;