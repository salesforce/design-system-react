import React from 'react';
import Badge from '~/components/badge';
import IconSettings from '~/components/icon-settings';
import Icon from '~/components/icon';

class Example extends React.Component {
	static displayName = 'badgeExample';

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Badge
					id="badge-base-example-default"
					content="423 Credits Available"
					icon={<Icon category="utility" name="moneybag" size="xx-small" />}
				/>
				<Badge
					id="badge-base-example-light"
					color="light"
					content="423 Credits Available"
					icon={<Icon category="utility" name="moneybag" size="xx-small" />}
				/>
				<Badge
					id="badge-base-example-inverse"
					color="inverse"
					content="423 Credits Available"
					icon={
						<Icon
							category="utility"
							name="moneybag"
							size="xx-small"
							colorVariant="base"
						/>
					}
				/>
				<Badge
					id="badge-base-example-success"
					color="success"
					content="423 Credits Available"
					icon={
						<Icon
							category="utility"
							name="moneybag"
							size="xx-small"
							colorVariant="base"
						/>
					}
				/>
				<Badge
					id="badge-base-example-warning"
					color="warning"
					content="423 Credits Available"
					icon={<Icon category="utility" name="moneybag" size="xx-small" />}
				/>
				<Badge
					id="badge-base-example-error"
					color="error"
					content="423 Credits Available"
					icon={
						<Icon
							category="utility"
							name="moneybag"
							size="xx-small"
							colorVariant="base"
						/>
					}
				/>
			</IconSettings>
		);
	}
}

export default Example;
