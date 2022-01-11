function textContentArray(child) {
	const text = [];

	if (typeof child === 'string' || typeof child === 'number') {
		// eslint-disable-next-line fp/no-mutating-methods
		text.push(child);
	} else if (Array.isArray(child)) {
		// eslint-disable-next-line fp/no-mutating-methods
		text.push(child.forEach(textContentArray));
	} else if (child && child.props) {
		const { children } = child.props;
		// eslint-disable-next-line fp/no-mutating-methods
		text.push(textContentArray(children));
	}

	return text;
}

export default function textContent(child) {
	return textContentArray(child).join('');
}
