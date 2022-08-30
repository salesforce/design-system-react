/* eslint-disable no-console, react/prop-types */
import React from 'react';

import DockedComposer from '~/components/docked-composer';
import Accordion from '~/components/accordion/__examples__/base';

class Minimized extends React.Component {
	static displayName = 'DockedComposerMinimized';

	state = {
		isExpanded: false,
		isOpen: true,
	};

	handleMinimize = (event, data) => {
		this.setState({ isExpanded: false });
	};

	handleExpand = (event, data) => {
		this.setState({ isExpanded: true });
	};

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	render() {
		return this.state.isOpen ? (
			<DockedComposer
				header="What's New this Release?"
				body={<Accordion />}
				classNameContainer="hello-world"
				assistiveText={{
					expandButton: 'ExPaNd',
					minimizeButton: 'MiNiMiZe',
					closeButton: 'ClOsE',
				}}
				id="docked-composer"
				events={{
					onRequestMinimize: this.handleMinimize,
					onRequestExpand: this.handleExpand,
					onRequestClose: this.handleClose,
				}}
				isOpen={this.state.isExpanded}
			/>
		) : null;
	}
}

export default Minimized;
