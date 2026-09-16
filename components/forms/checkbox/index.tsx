/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Alias
import Checkbox, { type CheckboxProps } from '../../checkbox';

const OldCheckbox = (props: CheckboxProps) => (
	<Checkbox oldEventParameterOrder {...props} />
);

export default OldCheckbox;
