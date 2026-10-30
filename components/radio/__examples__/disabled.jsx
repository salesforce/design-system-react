import { useState } from 'react';

import Radio from '~/components/radio'; // `~` is replaced with design-system-react at runtime

const Example = () => {
	const [checked, setChecked] = useState(false);

	return (
		<Radio
			id="radioId2"
			labels={{ label: 'Radio Label' }}
			disabled
			checked={checked}
			onChange={(event, data) => setChecked(data.checked)}
		/>
	);
};

Example.displayName = 'RadioExample';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
