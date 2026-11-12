declare const checkProps: (
	componentName: string,
	props: Record<string, unknown>,
	jsonDoc?: Record<string, unknown>
) => void;

export declare const checkLegacyNodeFields: (
	componentName: string,
	fields: { hasExpandedField: boolean }
) => void;

export default checkProps;
