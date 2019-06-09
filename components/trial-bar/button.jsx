import React from 'react';
import Button from '~/components/button';

export default class TrialBarButton extends React.Component {
	render() {
		return <Button {...this.props} inverse style={{ border: 0, padding: 0 }} />;
	}
}
