import React from 'react';
import VisualPicker from '~/components/visual-picker';
import Icon from '~/components/icon';
import IconSettings from '~/components/icon-settings';
import VisualPickerLink from '../link';

function Example() {
	return (
		<IconSettings iconPath="/assets/icons">
			<div
				style={{
					padding: '4rem 1rem 0px',
					background: 'rgb(244, 246, 249)',
				}}
			>
				<VisualPicker links>
					<VisualPickerLink
						title="Share the knowledge"
						href="javascript:void(0);"
						description="Harness your team&#x27;s collective know-how with our powerful knowledge base"
						icon={<Icon name="knowledge_base" category="utility" />}
					/>
					<VisualPickerLink
						title="Share the knowledge"
						href="javascript:void(0);"
						description="Harness your team&#x27;s collective know-how with our powerful knowledge base"
						icon={<Icon name="knowledge_base" category="utility" />}
					/>
				</VisualPicker>
			</div>
		</IconSettings>
	);
}

Example.displayName = 'VisualPickerLinks';

export default Example;
