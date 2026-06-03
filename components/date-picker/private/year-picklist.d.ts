import React from 'react';
type Props = {
	/**
	 * Label for year picklist/combobox
	 */
	assistiveTextYear: string /*.isRequired*/;
	/**
	 * HTML id for component
	 */
	id?: string;
	/**
	 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
	 */
	initialDateForCalendarRender: Date /*.isRequired*/;
	/**
	 * Displayed calendar has changed or re-rendered
	 */
	onChangeMonth: (v: any) => any /*.isRequired*/;
	/**
	 * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
	 */
	relativeYearFrom?: number;
	/**
	 * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
	 */
	relativeYearTo?: number;
};

declare function Component(props: Props): React.JSX.Element;
export default Component;
