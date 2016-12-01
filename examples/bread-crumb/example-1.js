import BreadCrumb from 'design-system-react/components/bread-crumb';

class BreadCrumbExample extends React.Component {
	render () {
		const trail = [
			(<a href="#">Parent Entity</a>),
			(<a href="#">Parent Record Name</a>)
		];

		return (
			<BreadCrumb trail={trail} />
			);
	}
}

ReactDOM.render(<BreadCrumbExample />, mountNode);
