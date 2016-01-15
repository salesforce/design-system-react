// Sample data
import dropdown from './sample-data/dropdown';
import dataTable from './sample-data/data-table';
import lookup from './sample-data/lookup';
import picklist from './sample-data/picklist';
import tree from './sample-data/tree';

// Methods used with control examples to create and listen for events.
import ExampleEvents from './example-events';

const sampleData = {
	dataTable,
	dropdown,
	lookup,
	picklist,
	tree
};

export default sampleData;
export {
	ExampleEvents,
	sampleData
};
