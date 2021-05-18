import React from 'react';

import KEYS from '../../../utilities/key-code';

export default (props) => {
	// Avoid passing props to <a> that it doesn't understand
	const passThroughProps = {};
	const entries = Object.entries(props);
	entries.forEach((entry) => {
		const [key, value] = entry;
		if (
			['onRequestFocus', 'onOpen', 'onClose', 'requestFocus'].indexOf(key) ===
			-1
		) {
			passThroughProps[key] = value;
		}
	});
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<a
			ref={(node) => {
				if (node && props.requestFocus && props.onRequestFocus) {
					props.onRequestFocus(node);
				}
			}}
			onKeyDown={(event) =>
				event.keyCode === KEYS.ENTER && props.onClick
					? props.onClick(event)
					: undefined
			}
			{...passThroughProps}
		>
			{props.children}
		</a>
	);
};
