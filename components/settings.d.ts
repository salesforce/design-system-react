declare module "@salesforce/design-system-react/components/settings" {
	type Props = {
		setAssetsPath: (arg0: string) => void;
		getAssetsPath: () => string;
		setAppElement: (arg0: string) => void;
		getAppElement: () => string;
	};
	const settings: Props;
	export default settings;
}