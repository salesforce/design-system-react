import React from 'react';
import ProgressRing, { THEME_OPTIONS } from '../../../components/progress-ring';
import Icon from '../../../components/icon';

export const BASE_0 = () => <ProgressRing value={0} />;
export const BASE_PARTIAL = () => <ProgressRing value={20} />;
export const BASE_100 = () => <ProgressRing value={100} />;
export const COMPLETE_100 = () => (
	<ProgressRing value={100} theme={THEME_OPTIONS.COMPLETE} />
);
export const COMPLETE_WITH_ICON = () => (
	<ProgressRing value={100} theme={THEME_OPTIONS.COMPLETE} hasIcon />
);
export const WARNING_PARTIAL = () => (
	<ProgressRing value={20} theme={THEME_OPTIONS.WARNING} />
);
export const WARNING_WITH_ICON = () => (
	<ProgressRing value={20} theme={THEME_OPTIONS.WARNING} hasIcon />
);
export const WARNING_100 = () => (
	<ProgressRing value={100} theme={THEME_OPTIONS.WARNING} />
);
export const EXPIRED_PARTIAL = () => (
	<ProgressRing value={20} theme={THEME_OPTIONS.EXPIRED} />
);
export const EXPIRED_WITH_ICON = () => (
	<ProgressRing value={20} theme={THEME_OPTIONS.EXPIRED} hasIcon />
);
export const EXPIRED_WITH_CUSTOM_ICON = () => (
	<ProgressRing
		value={20}
		theme={THEME_OPTIONS.EXPIRED}
		hasIcon
		icon={<Icon category="utility" name="lock" />}
	/>
);
export const EXPIRED_100 = () => (
	<ProgressRing value={100} theme={THEME_OPTIONS.EXPIRED} />
);
