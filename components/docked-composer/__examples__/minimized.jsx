/* eslint-disable no-console, react/prop-types */
import React from 'react';

import IconSettings from '~/components/icon-settings';
import DockedComposer from '~/components/docked-composer';

class Example extends React.Component {
	static displayName = 'DockedComposerMinimized';

	constructor() {
		super();
		this.state = {
			isExpanded: false,
			isOpen: true,
		};
	}

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
			<IconSettings iconPath="/assets/icons">
				<div
					style={{
						height: '500px',
						position: 'relative',
					}}
				>
					<DockedComposer
						header="What's New this Release?"
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
				</div>
			</IconSettings>
		) : null;
	}
}

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
