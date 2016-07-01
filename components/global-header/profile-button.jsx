import React from 'react';
import Button from 'slds-for-react/button';

// When the time comes to swap this button for the image, you can literally put anything here as long
// as _something_ fires the props.onClick to trigger the dropdown. Just re-write this to be a PNG that
// is passed in (or something)
const ProfileButton = (props) => (
	<Button
		onClick={props.onClick}
		iconCategory="utility"
		iconName="user"
		iconStyle="icon-inverse"
		iconSize="large"
		assistiveText="{props.assistiveText}"
		id="slds-global-nav__header__profile-trigger"
	/>
);

ProfileButton.displayName = 'Button';

ProfileButton.propTypes = {
	onClick: React.PropTypes.func
};

export default ProfileButton;
