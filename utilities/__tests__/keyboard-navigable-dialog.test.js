import { describe, expect, it, vi } from 'vitest';

import keyboardNavigableDialog from '../keyboard-navigable-dialog';
import KEYS from '../key-code';

describe('keyboardNavigableDialog', () => {
	it('passes the keydown event to handleClick on Enter at the closed trigger', () => {
		const trigger = document.createElement('button');
		const event = new KeyboardEvent('keydown', { key: KEYS.ENTER });
		const handleClick = vi.fn();

		keyboardNavigableDialog({
			event,
			isOpen: false,
			handleClick,
			key: KEYS.ENTER,
			eventTarget: trigger,
			trigger,
			toggleOpen: vi.fn(),
		});

		expect(handleClick).toHaveBeenCalledWith(event);
	});

	it('ignores Enter from another element', () => {
		const handleClick = vi.fn();

		keyboardNavigableDialog({
			event: new KeyboardEvent('keydown', { key: KEYS.ENTER }),
			isOpen: false,
			handleClick,
			key: KEYS.ENTER,
			eventTarget: document.createElement('input'),
			trigger: document.createElement('button'),
			toggleOpen: vi.fn(),
		});

		expect(handleClick).not.toHaveBeenCalled();
	});
});
