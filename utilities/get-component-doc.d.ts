declare function getComponentDocFn(
	jsonDoc?: Record<string, unknown>
): (propName?: string) => string;

export default getComponentDocFn;
