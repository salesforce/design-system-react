/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// Type-level regression tests, checked by `npm run typecheck`. Each
// `@ts-expect-error` fails the build if the line below it stops erroring.

import Popover from '../index';

export const headed = (
	<Popover heading="Title" body="Body">
		<button type="button">Open</button>
	</Popover>
);

export const labelledBy = (
	<Popover ariaLabelledby="my-heading" body="Body">
		<button type="button">Open</button>
	</Popover>
);

export const feature = (
	<Popover variant="feature" icon={<span />} heading="Title" body="Body">
		<button type="button">Open</button>
	</Popover>
);

export const headingAndLabelledBy = (
	// @ts-expect-error use `heading` or `ariaLabelledby`, not both
	<Popover heading="Title" ariaLabelledby="my-heading" body="Body">
		<button type="button">Open</button>
	</Popover>
);

export const iconOnBase = (
	// @ts-expect-error `icon` is only for the feature variant
	<Popover icon={<span />} heading="Title" body="Body">
		<button type="button">Open</button>
	</Popover>
);

export const iconOnWarning = (
	// @ts-expect-error `icon` is only for the feature variant
	<Popover variant="warning" icon={<span />} heading="Title" body="Body">
		<button type="button">Open</button>
	</Popover>
);

// A click outside passes the native DOM event, so a handler that reads a
// React event's `nativeEvent` must narrow first.
export const reactEventOnlyRequestClose = (
	<Popover
		body="Body"
		// @ts-expect-error the event can be a native MouseEvent or TouchEvent
		onRequestClose={(
			event: React.MouseEvent | React.KeyboardEvent | undefined
		) => event}
	>
		<button type="button">Open</button>
	</Popover>
);

export const requestCloseEvent = (
	<Popover
		body="Body"
		onRequestClose={(event, data) => {
			const native =
				event && 'nativeEvent' in event ? event.nativeEvent : event;
			return [native, data.trigger];
		}}
	>
		<button type="button">Open</button>
	</Popover>
);
