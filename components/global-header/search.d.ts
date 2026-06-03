import React from 'react';
type Props = {
	/**
	 * A required `Combobox` component. The props from this combobox will be merged and override any default props.
	 */
	combobox: React.ReactNode /*.isRequired*/;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
