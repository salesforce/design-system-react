// Sample data
import spinner      from './sample-data/spinner';
import tooltip      from './sample-data/tooltip';
import tree         from './sample-data/tree';


// Methods used with control examples to create and listen for events.
import ExampleEvents from './example-events';

import * as componentWrapperTemplate from './templates/template-component-wrapper';

const sampleData = {
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
