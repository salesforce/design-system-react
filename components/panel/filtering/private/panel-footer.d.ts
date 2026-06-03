import React from 'react';
type Props = {
	/**
	 * Localized description of the "Add Filter" button in the footer
	 */
	addFilterLabel: React.ReactNode /*.isRequired*/;
	/**
	 * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
	 */
	onClickAdd: (v: any) => any /*.isRequired*/;
	/**
	 * Callback triggered when "Remove All" is clicked. Recieves an `event`.
	 */
	onClickRemoveAll: (v: any) => any /*.isRequired*/;
	/**
	 * Localized description of the "Remove All" button in the footer
	 */
	removeAllLabel: React.ReactNode /*.isRequired*/;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
