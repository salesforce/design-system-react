// Sample data
import badge from './sample-data/badge';
import button from './sample-data/button';
import buttonGroup from './sample-data/button-group';
import checkbox from './sample-data/checkbox';
import combobox from './sample-data/combobox';
import dropdown from './sample-data/dropdown';
import dataTable from './sample-data/data-table';
import datepicker from './sample-data/datepicker';
import modal from './sample-data/modal';
// import lookup from './sample-data/lookup';
import picklist from './sample-data/picklist';
import tree from './sample-data/tree';


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
	dropdown,
	datepicker,
	modal,
	picklist,
	tree
};
	// lookup,

export default sampleData;
export {
	ExampleEvents,
	sampleData,
	componentWrapperTemplate
};
