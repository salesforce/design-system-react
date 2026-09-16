function textContentArray(child) {
	const text = [];

	if (typeof child === 'string' || typeof child === 'number') {
		text.push(child);
	} else if (Array.isArray(child)) {
		text.push(child.forEach(textContentArray));
	} else if (child && child.props) {
		const { children } = child.props;
		text.push(textContentArray(children));
	}

	return text;
}

export default function textContent(child) {
	return textContentArray(child).join('');
}
