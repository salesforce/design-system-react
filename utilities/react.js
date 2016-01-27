// Sample data
import badge from './sample-data-react/badge';
import button from './sample-data-react/button';
import buttonGroup from './sample-data-react/button-group';
import checkbox from './sample-data-react/checkbox';
import combobox from './sample-data-react/combobox';
import dataTable from './sample-data-react/data-table';
import datepicker from './sample-data-react/datepicker';
import dropdown from './sample-data-react/dropdown';
import lookup from './sample-data-react/lookup';
import modal from './sample-data-react/modal';
import notification from './sample-data-react/notification';
import picklist from './sample-data-react/picklist';
import pills from './sample-data-react/pills';
import popover from './sample-data-react/popover';
import radio from './sample-data-react/radio';
import spinner from './sample-data-react/spinner';
import tooltip from './sample-data-react/tooltip';
import tree from './sample-data-react/tree';


// Methods used with control examples to create and listen for events.
import ExampleEvents from './example-events';

import * as componentWrapperTemplate from './templates/template-component-wrapper';

const sampleData = {
	badge,
	button,
	buttonGroup,
	checkbox,
	combobox,
	dataTable,
	datepicker,
	dropdown,
	lookup,
	modal,
	notification,
	picklist,
	pills,
	popover,
	radio,
	spinner,
	tooltip,
	tree
};
	// lookup,

export default sampleData;
export {
	ExampleEvents,
	sampleData,
	componentWrapperTemplate
};
