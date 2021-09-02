import React from 'react';
import ProgressBar from '../../../components/progress-bar';

export const PROGRESS_0 = () => <ProgressBar id="progress-bar-1" value={0} />;
export const PROGRESS_25 = () => <ProgressBar id="progress-bar-2" value={25} />;
export const PROGRESS_HALF = () => (
	<ProgressBar id="progress-bar-3" value={50} />
);
export const PROGRESS_75 = () => <ProgressBar id="progress-bar-4" value={75} />;
export const COMPLETE_100 = () => (
	<ProgressBar id="progress-bar-5" value={100} color="success" />
);
export const COMPLETE_WITH_DESCRIPTION = () => (
	<ProgressBar value={100} color="success" label="Einstein Setup Assistant" />
);
export const ROUNDED_BAR = () => (
	<ProgressBar id="progress-bar-circular" value={20} radius="circular" />
);
export const X_SMALL_BAR = () => (
	<ProgressBar id="progress-bar-x-small" value={20} thickness="x-small" />
);
export const SMALL_BAR = () => (
	<ProgressBar id="progress-bar-small" value={20} thickness="small" />
);
export const MEDIUM_BAR = () => (
	<ProgressBar id="progress-bar-medium" value={20} thickness="medium" />
);
export const LARGE_BAR = () => (
	<ProgressBar id="progress-bar-large" value={20} thickness="large" />
);

export const VERTICAL_BAR = () => (
	<ProgressBar
		id="progress-bar-vertical"
		orientation="vertical"
		value={20}
		thickness="large"
	/>
);
