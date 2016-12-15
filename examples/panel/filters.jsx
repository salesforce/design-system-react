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
			<div style={{ paddingLeft: '400px' }}>
				<FilteringPanel
					footer={<PanelFilteringFooter>
						<a href="javascript:void(0);">Add Filter</a>
						<a href="javascript:void(0);" className="slds-col--bump-left">Remove All</a>
					</PanelFilteringFooter>}
					onRequestClose={() => { console.log('onRequestClose'); }}
				>
					<PanelFilteringList>
						<PanelFilteringFilter
							property="Show Me"
							predicate="All Products"
							onChange={({ id }) => { console.log('onChange ', id); }}
							onRemove={({ id }) => { console.log('onRemove ', id); }}
						>
							<Picklist
								isInline
								label="Show Me"
								onSelect={(value) => { console.log('selected: ', value); }}
								options={[
									{ label: 'Everything', value: 'A0' },
									{ label: 'All Products', value: 'B0' },
									{ label: 'All Widgets', value: 'C0' },
									{ label: 'All Wackamoles', value: 'D0' },
								]}
								placeholder="Select a contact"
								value="B0"
							/>
						</PanelFilteringFilter>
					</PanelFilteringList>

					<PanelFilteringList heading="Matching all these filters">
						<PanelFilteringFilter
							property="Created Date"
							predicate="equals THIS WEEK"
							onChange={({ id }) => { console.log('onChange ', id); }}
							onRemove={({ id }) => { console.log('onRemove ', id); }}
						>
							<Picklist
								isInline
								label="Created Date EQUALS"
								onSelect={(value) => { console.log('selected: ', value); }}
								options={[
									{ label: 'LAST WEEK', value: 'A0' },
									{ label: 'THIS WEEK', value: 'B0' },
									{ label: 'THIS MONTH', value: 'C0' },
									{ label: 'THIS YEAR', value: 'D0' }
								]}
								placeholder="Select a contact"
								value="B0"
							/>
						</PanelFilteringFilter>
						<PanelFilteringFilter
							locked
							permanent
							property="List Price"
							predicate="greater than &quot;500&quot;"
						/>
					</PanelFilteringList>
				</FilteringPanel>
			</div>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
