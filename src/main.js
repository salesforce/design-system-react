// This is temporary until the repositories are divided, so developers can use the source code directly via import in an ES6 environment without building. It also serves as a template for anyone separating the repositories.

/* Use one of the following instead of the provided import statements in the example code:
	import {react as FacadesReact} from 'design-system-facades';
	const Badge = FacadesReact.Badge;

	import {jquery as FacadesJquery} from 'design-system-facades';
	const Badge = FacadesJquery.Badge;
*/

import * as react from './react/dist';
import * as jquery from './jquery/dist';

module.exports = {
	react,
	jquery
};
