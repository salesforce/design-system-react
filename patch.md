## Release 0.10.29

**Bugfixes**

- `Combobox`: Fix style breakage due to SLDS CSS being on ARIA 1.1. This introduces a “double combobox role” in the component. It is a temporary, non-semantic update. It has been tested in NVDA and VoiceOver with no side effects. If you are using aXe or sa11y testing, please update your configuration until further notice to the following to avoid failing: https://github.com/salesforce/design-system-react/pull/2761/files#diff-93bc89e11753fdb252273d1a27f7bd40c68f6ffb9dad64ad77eba41831477748