/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import VisualPicker from '../index';
import VisualPickerLink from '../link';
import Checkbox from '../../checkbox';

export const options = (
	<VisualPicker label="Pick" vertical size="large" className="x">
		<Checkbox checked onChange={() => {}} />
	</VisualPicker>
);

export const links = (
	<VisualPicker links>
		<VisualPickerLink href="#" />
	</VisualPicker>
);

export const linksWithLabels = (
	// @ts-expect-error the links picker renders a bare container with no legend
	<VisualPicker links label="Pick">
		<VisualPickerLink href="#" />
	</VisualPicker>
);

export const linksWithClassName = (
	// @ts-expect-error the links picker renders a bare container with no class
	<VisualPicker links className="x">
		<VisualPickerLink href="#" />
	</VisualPicker>
);
