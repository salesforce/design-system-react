import React from 'react';
import ProgressBar from '../../../components/progress-bar';

export const PROGRESS_0 = () => <ProgressBar value={0} />;
export const PROGRESS_25 = () => <ProgressBar value={25} />;
export const PROGRESS_HALF = () => <ProgressBar value={50} />;
export const PROGRESS_75 = () => <ProgressBar value={75} />;
export const COMPLETE_100 = () => (
	<ProgressBar value={100} color="success" />
);
export const COMPLETE_WITH_DESCRIPTION = () => (
	<ProgressBar value={100} color="success" label="Einstein Setup Assistant"/>
);
export const ROUNDED_BAR = () => (
	<ProgressBar value={20} radius="circular" />
);
export const X_SMALL_BAR = () => (
	<ProgressBar value={20} thickness="x-small" />
);
export const SMALL_BAR = () => (
	<ProgressBar value={20} thickness="small" />
);
export const MEDIUM_BAR = () => (
	<ProgressBar value={20} thickness="medium" />
);
export const LARGE_BAR = () => (
	<ProgressBar value={20} thickness="large" />
);
