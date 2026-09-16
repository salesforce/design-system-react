import { KeyboardEvent, MouseEvent } from 'react';

export interface KeyboardNavigableDialogOptions {
	event: KeyboardEvent;
	isOpen: boolean;
	handleClick: (event: MouseEvent) => void;
	keyCode: number;
	eventTarget: EventTarget | null;
	trigger: HTMLElement | null;
	toggleOpen: (event: KeyboardEvent) => void;
}

declare function keyboardNavigableDialog(options: KeyboardNavigableDialogOptions): void;

export default keyboardNavigableDialog;














