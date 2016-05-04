import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { COMPONENT } from '../../components/data-table';
import DataTable from '../../components/data-table';
import Column from '../../components/data-table/column';

storiesOf(COMPONENT, module)
  .add('striped', () => getDataTable({
		striped: true
	}))
	.add('bordered', () => getDataTable({
		bordered: true
	}));

function getDataTable(props) {
  return (
		<DataTable
			items={[
        {
          id: '8IKZHZZV80',
          name: 'Cloudhub',
          count: 100976,
          lastModified: 'Yesterday'
        }, {
          id: '5GJOOOPWU7',
          name: 'Cloudhub + Anypoint Connectors',
          count: 54976,
          lastModified: 'Today'
        }, {
          id: 'Q8Z71ZUCEZ',
          name: 'Cloud City',
          count: 101280,
          lastModified: 'Today'
        }
      ]}
			{...props}
		>
			<Column
				label="Opportunity Name"
				property="name"
				truncate
			/>
			<Column
				label="Count"
				property="count"
			/>
			<Column
				label="Last Modified"
				property="lastModified"
				truncate
			/>
		</DataTable>
  );
}
