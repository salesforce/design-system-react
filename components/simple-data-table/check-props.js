/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

import deprecatedProperty from '../../utilities/warning/deprecated-property';
import getComponentDocFn from '../../utilities/get-component-doc';
import requiredProperty from '../../utilities/warning/required-property';
import sunsetProperty from '../../utilities/warning/sunset-property';

let checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
		const createDocUrl = getComponentDocFn(jsonDoc);
		/* eslint-disable max-len */
		// Deprecated and changed to another property
		sunsetProperty(
			COMPONENT,
			props.onChange,
			'onChange',
			'Use `onRowChange(event, { selection })` instead: it reports the requested selection in the same `(event, data)` shape as other components.'
		);
		requiredProperty(
			COMPONENT,
			!props.selectRows || props.onRowChange !== undefined,
			'onRowChange',
			`Row selection is controlled: without \`onRowChange\`, clicking a row's checkbox does nothing. Update \`selection\` from \`data.selection\` in \`onRowChange\`, or remove \`selectRows\`. ${createDocUrl(
				'onRowChange'
			)}`
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
			'onRowChange',
			createDocUrl('onRowChange')
		);
		deprecatedProperty(
			COMPONENT,
			props.onDeselect,
			'onDeselect',
			'onRowChange',
			createDocUrl('onRowChange')
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
			`All SLDS SimpleDataTables have row borders by default now. If you do not want row borders, please use \`unborderedRow\`. ${createDocUrl(
				'unborderedRow'
			)}`
		);
		/* eslint-enable max-len */

		deprecatedProperty(
			COMPONENT,
			props.onFixedHeaderResize,
			'onFixedHeaderResize',
			undefined,
			`The table repositions its fixed headers itself when its scroller or table resizes. ${createDocUrl()}`
		);
		deprecatedProperty(
			COMPONENT,
			props.onToggleFixedHeaderListeners,
			'onToggleFixedHeaderListeners',
			undefined,
			`The table watches its own size with a ResizeObserver instead of a window resize listener. ${createDocUrl()}`
		);
		deprecatedProperty(
			COMPONENT,
			props.onRenderSubHeadingRow,
			'onRenderSubHeadingRow',
			'renderSubHeadingRow',
			createDocUrl('renderSubHeadingRow')
		);
		sunsetProperty(
			COMPONENT,
			props.assistiveTextForActionsHeader,
			'assistiveTextForActionsHeader',
			`Use \`assistiveText={{ actionsHeader: '...' }}\` instead. ${createDocUrl(
				'assistiveText'
			)}`
		);
		sunsetProperty(
			COMPONENT,
			props.assistiveTextForColumnSort,
			'assistiveTextForColumnSort',
			`Use \`assistiveText={{ columnSort: '...' }}\` instead. ${createDocUrl(
				'assistiveText'
			)}`
		);
		sunsetProperty(
			COMPONENT,
			props.assistiveTextForColumnSortedAscending,
			'assistiveTextForColumnSortedAscending',
			`Use \`assistiveText={{ columnSortedAscending: '...' }}\` instead. ${createDocUrl(
				'assistiveText'
			)}`
		);
		sunsetProperty(
			COMPONENT,
			props.assistiveTextForColumnSortedDescending,
			'assistiveTextForColumnSortedDescending',
			`Use \`assistiveText={{ columnSortedDescending: '...' }}\` instead. ${createDocUrl(
				'assistiveText'
			)}`
		);
		sunsetProperty(
			COMPONENT,
			props.assistiveTextForSelectAllRows,
			'assistiveTextForSelectAllRows',
			`Use \`assistiveText={{ selectAllRows: '...' }}\` instead. ${createDocUrl(
				'assistiveText'
			)}`
		);
		sunsetProperty(
			COMPONENT,
			props.assistiveTextForSelectRow,
			'assistiveTextForSelectRow',
			`Use \`assistiveText={{ selectRow: '...' }}\` instead. ${createDocUrl(
				'assistiveText'
			)}`
		);
	};
}

export default checkProps;
