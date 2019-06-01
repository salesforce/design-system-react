export default function getDataProps(props) {
	return Object.keys(props).reduce((prev, key) => {
		if (key.substr(0, 5) === 'data-') {
			// eslint-disable-next-line no-param-reassign
			prev[key] = props[key];
		}
		return prev;
	}, {});
}
