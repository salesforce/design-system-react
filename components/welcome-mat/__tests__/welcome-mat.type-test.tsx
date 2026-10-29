/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import WelcomeMat from '../index';

export const steps = (
	<WelcomeMat>
		<div />
	</WelcomeMat>
);

export const trailhead = (
	<WelcomeMat infoBadge={<span />} variant="trailhead-connected">
		<div />
	</WelcomeMat>
);

export const infoOnly = (
	<WelcomeMat onRenderInfoActions={() => null} variant="info-only">
		<div />
	</WelcomeMat>
);

export const splash = (
	<WelcomeMat
		doNotShowAgainCheckbox={<input type="checkbox" />}
		variant="splash"
	/>
);

// @ts-expect-error the steps variant needs tiles
export const stepsWithoutTiles = <WelcomeMat />;

export const splashTiles = (
	// @ts-expect-error the splash variant has no tiles
	<WelcomeMat variant="splash">
		<div />
	</WelcomeMat>
);

export const stepsBadge = (
	// @ts-expect-error `infoBadge` only applies to trailhead-connected
	<WelcomeMat infoBadge={<span />}>
		<div />
	</WelcomeMat>
);

export const stepsActions = (
	// @ts-expect-error the steps variant shows progress, not actions
	<WelcomeMat onRenderInfoActions={() => null}>
		<div />
	</WelcomeMat>
);
