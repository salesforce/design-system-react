import { filterNonSelectedItems } from './private/utility';

export default function filter ({ options, selected }) {
	return filterNonSelectedItems(options, selected);
}
