import React from 'react';

import FilteringPanel from '~/components/panel/filtering'; // `~` is replaced with design-system-react at runtime
import PanelFilteringFooter from '~/components/panel/filtering/footer';
import PanelFilteringList from '~/components/panel/filtering/list';
import PanelFilteringFilter from '~/components/panel/filtering/filter';

import Picklist from '~/components/menu-picklist';

const Example = React.createClass({
	displayName: 'PanelExample',

	render () {
		return (
			<div style={{paddingLeft: '300px'}}>
				<FilteringPanel
					footer={<PanelFilteringFooter>
						<a href="javascript:void(0);">Add Filter</a>
						<a href="javascript:void(0);" className="slds-col--bump-left">Remove All</a>
					</PanelFilteringFooter>}
				>
					<PanelFilteringList>
						<PanelFilteringFilter
							property="Show Me"
							predicate="All Products"
							onChange={({ id }) => { console.log('onChange ', id); }}
						>
							<Picklist
								isInline
								label="Contacts"
								onSelect={(value) => { console.log('selected: ', value); }}
								options={[
									{ label: 'Option A', value: 'A0' },
									{ label: 'Option B', value: 'B0' },
									{ label: 'Option C', value: 'C0' },
									{ label: 'Option D', value: 'D0' },
									{ label: 'Option E', value: 'E0' },
									{ label: 'Option FGHIJKLMNOPQRSTUVWXYZ', value: 'F0' }
								]}
								placeholder="Select a contact"
							/>
						</PanelFilteringFilter>
					</PanelFilteringList>

					<PanelFilteringList heading="Matching all these filters">
						<PanelFilteringFilter
							property="Created Date"
							predicate="equals THIS WEEK"
						>
							This is popover contents.
						</PanelFilteringFilter>
						<PanelFilteringFilter
							property="List Price"
							predicate="greater than &quot;500&quot;"
						>
							This is popover contents.
						</PanelFilteringFilter>
					</PanelFilteringList>
				</FilteringPanel>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
