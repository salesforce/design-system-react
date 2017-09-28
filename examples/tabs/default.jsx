import React from 'react';
import createReactClass from 'create-react-class';
import Tabs from '~/components/tabs'; // `~` is replaced with design-system-react at runtime
import TabsPanel from '~/components/tabs/panel';

const Example = createReactClass({
	displayName: 'TabsExample',
	
	render () {
		return (
			<Tabs id="tabs-example-default">
				<TabsPanel label="Item One">
					Item One Content
				</TabsPanel>
				<TabsPanel label="Item Two">
					Item Two Content
				</TabsPanel>
				<TabsPanel label="Item Three">
					Item Three Content
				</TabsPanel>
				<TabsPanel disabled label="Disabled">
					Disabled Content
				</TabsPanel>
			</Tabs>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
