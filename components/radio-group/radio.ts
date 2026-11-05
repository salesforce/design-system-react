// Alias of `Radio`, typed for use as a group child: the group derives
// `checked` from its `value` and injects `onChange`.
import type { ReactElement } from 'react';
import Radio, { type RadioGroupItemProps } from '../radio/index';

const GroupRadio = Radio as unknown as ((
	props: RadioGroupItemProps
) => ReactElement) & { displayName?: string };

export type { RadioGroupItemProps };

export default GroupRadio;
