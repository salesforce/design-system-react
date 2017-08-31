import React from 'react';
import PropTypes from 'prop-types';
// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// A simple javascript utility for conditionally joining classNames together.
import classNames from '../../utilities/class-names';
import { AVATAR } from '../../utilities/constants';

class Avatar extends React.Component {
	render () {
		return (
      <span className="slds-avatar">
        <abbr className="slds-avatar__initials slds-icon-standard-account" name={this.props.name}>Acme Bread</abbr>
      </span>
		);
	};
}

// ### Display Name
// Always use the canonical component name as the React display name.
Avatar.displayName = AVATAR;

// ### Prop Types
Avatar.propTypes = {
/**
 * Text that is visually hidden but read aloud by screenreaders to tell the user what the icon means.
 * Naked icons must have assistive text, however, if you also have visible descriptive text with the icon,
 * declare this prop as <code>assistiveText=''</code>.
 */
assistiveText: PropTypes.string,
/**
 * CSS classes that are applied to the SVG.
 */
className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
name: PropTypes.string,
size: PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
/**
 * Title attribute for the icon container
 */
title: PropTypes.string
};

// Avatar.defaultProps = {
// size: 'medium'
// };

module.exports = Avatar;
