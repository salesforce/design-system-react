/* eslint-disable no-console, react/prop-types */
import React from 'react';

import DockedComposer from '~/components/docked-composer';
import Accordion from '~/components/accordion/__examples__/base';

class Example extends React.Component {
	static displayName = 'DockedComposerExample';

	state = {
		isOpen: true,
		isClosed: false,
	};

	handleMinimize = (event, data) => {
		this.setState({ isOpen: false });
	};

	handleExpand = (event, data) => {
		this.setState({ isOpen: true });
	};

	handleClose = () => {
		this.setState({ isClosed: true });
	};

	render() {
		return this.state.isClosed ? null : (
			<DockedComposer
				header="What's New this Release?"
				body={<Accordion />}
				id="docked-composer"
				events={{
					onMinimize: this.handleMinimize,
					onExpand: this.handleExpand,
					onClose: this.handleClose,
				}}
				isOpen={this.state.isOpen}
			/>
		);
	}
}

export default Example;
