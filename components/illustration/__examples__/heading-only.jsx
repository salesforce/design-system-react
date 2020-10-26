import React from 'react';

import Illustration from '~/components/illustration'; // `~` is replaced with design-system-react at runtime

function Example() {
	return <Illustration heading="Lorem ipsum dolor" silenceDeprecationWarning />;
}

Example.displayName = 'IllustrationExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
