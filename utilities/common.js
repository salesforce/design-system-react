// Gettings data ids from prop data-* as object
export function getDataIds(props) {
	const propDataIds = props['data-*'];
	const dataIds = {};

	Object.keys(propDataIds || []).forEach((key) => {
		dataIds[`data-${key}`] = propDataIds[key];
	});

	return dataIds;
}

export default {};
