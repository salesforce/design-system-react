/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * DataTable TypeScript wrapper and exports
 *
 * The main DataTable component lives in `index.tsx`. This file re-exports it
 * along with the TypeScript-converted subcomponents and shared prop types.
 */

// Re-export the main component
export { default } from './index';

// Export TypeScript-converted subcomponents. The corresponding `*Props` types
// are re-exported once via `export * from './types'` below (their canonical
// home) to avoid duplicate-export conflicts.
export { default as DataTableCell } from './cell';
export { default as DataTableColumn } from './column';
export { default as DataTableRowActions } from './row-actions';
export { default as DataTableHighlightCell } from './highlight-cell';
export { default as DataTableInteractiveElement } from './interactive-element';
export { default as DataTableInteractiveLink } from './interactive-link';

// Export types
export * from './types';
