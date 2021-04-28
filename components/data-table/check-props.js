/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		deprecatedProperty(
			COMPONENT,
			props.onChange,
			'onChange',
			'onRowChange',
			'The callback parameters have been changed. `onRowChange` passes in `[event, { selection }` in order to align with other components.'
		);
		deprecatedProperty(
			COMPONENT,
			props.compact,
			'compact',
			undefined,
			`compact has been deprecated as non-compact data tables do not exist in SLDS. ${createDocUrl()}`
		);

		deprecatedProperty(
			COMPONENT,
			props.collection,
			'collection',
			'items',
			createDocUrl('items')
		);
		deprecatedProperty(
			COMPONENT,
			props.onSelect,
			'onSelect',
			'onChange',
			createDocUrl('onChange')
		);
		deprecatedProperty(
			COMPONENT,
			props.onDeselect,
			'onDeselect',
			'onChange',
			createDocUrl('onChange')
		);
		sunsetProperty(
			COMPONENT,
			props.sortable,
			'sortable',
			`The table is sortable if one or more of its columns are sortable. ${createDocUrl()}`
		);

		// Deprecated and moved to a child
		sunsetProperty(
			COMPONENT,
			props.columns,
			'columns',
			`Please provide one or more children of the type <Column /> instead. ${createDocUrl()}`
		);

		sunsetProperty(
			COMPONENT,
			props.bordered,
			'bordered',
			`All SLDS DataTables have row borders by default now. If you do not want row borders, please use \`unborderedRow\`. ${createDocUrl(
				'unborderedRow'
			)}`
		);
		/* eslint-enable max-len */

		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForActionsHeader,
			'assistiveTextForActionsHeader',
			"assistiveText['actionsHeader']",
			createDocUrl('assistiveText')
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForColumnSort,
			'assistiveTextForColumnSort',
			"assistiveText['columnSort']",
			createDocUrl('assistiveText')
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForColumnSortedAscending,
			'assistiveTextForColumnSortedAscending',
			"assistiveText['columnSortedAscending']",
			createDocUrl('assistiveText')
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForColumnSortedDescending,
			'assistiveTextForColumnSortedDescending',
			"assistiveText['columnSortedDescending']",
			createDocUrl('assistiveText')
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForSelectAllRows,
			'assistiveTextForSelectAllRows',
			"assistiveText['selectAllRows']",
			createDocUrl('assistiveText')
		);
		deprecatedProperty(
			COMPONENT,
			props.assistiveTextForSelectRow,
			'assistiveTextForSelectRow',
			"assistiveText['selectRow']",
			createDocUrl('assistiveText')
		);
	};
}

export default checkProps;
