declare function deprecatedProperty(
	control: string,
	propValue: unknown,
	oldProp: string,
	newProp?: string,
	comment?: string,
	silenceDeprecatedPropertyWarning?: boolean
): void;

export default deprecatedProperty;
