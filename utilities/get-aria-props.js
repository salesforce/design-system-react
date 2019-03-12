export default function getAriaProps(props) {
	return Object.keys(props).reduce((prev, key) => {
		if (key.substr(0, 5) === 'aria-') {
			prev[key] = props[key];
		}
		return prev;
	}, {});
}
