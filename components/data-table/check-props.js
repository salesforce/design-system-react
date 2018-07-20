/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function () {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function (COMPONENT, props) {
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		deprecatedProperty(
			COMPONENT,
			props.compact,
			'compact',
			undefined,
			'compact has been deprecated as non-compact data tables do not exist in SLDS'
		);

		deprecatedProperty(COMPONENT, props.collection, 'collection', 'items');
		deprecatedProperty(COMPONENT, props.onSelect, 'onSelect', 'onChange');
		deprecatedProperty(COMPONENT, props.onDeselect, 'onDeselect', 'onChange');
		sunsetProperty(
			COMPONENT,
			props.sortable,
			'sortable',
			'The table is sortable if one or more of its columns are sortable.'
		);

		// Deprecated and moved to a child
		sunsetProperty(
			COMPONENT,
			props.columns,
			'columns',
			'Please provide one or more children of the type <Column /> instead.'
		);

		sunsetProperty(
			COMPONENT,
			props.bordered,
			'bordered',
			'All SLDS DataTables have row borders by default now. If you do not want row borders, please use `unborderedRow`'
		);
		/* eslint-enable max-len */

		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForActionsHeader,
			'assistiveTextForActionsHeader',
			"assistiveText['actionsHeader']"
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForColumnSort,
			'assistiveTextForColumnSort',
			"assistiveText['columnSort']"
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForColumnSortedAscending,
			'assistiveTextForColumnSortedAscending',
			"assistiveText['columnSortedAscending']"
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForColumnSortedDescending,
			'assistiveTextForColumnSortedDescending',
			"assistiveText['columnSortedDescending']"
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForSelectAllRows,
			'assistiveTextForSelectAllRows',
			"assistiveText['selectAllRows']"
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForSelectRow,
			'assistiveTextForSelectRow',
			"assistiveText['selectRow']"
		);
	};
}

export default checkProps;
