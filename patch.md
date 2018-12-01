## Release 0.9.1

**Notes**

* Tree `nodes` are now compared with node `id` key instead of object compare when using keyboard events
* Testing suite runs on Windows now to enable contributions from Windows users. Use `git-bash`, please--no Powershell.

**Major Features**

* **Pill Container:** Add [Listbox of Pill Options](https://www.lightningdesignsystem.com/components/pills/) component. Previously `Pill` components used in a group were not accessible. This component creates a pillbox or group option. Isoloated `Pill` component is still present, but should not be used for user input/selection.
* **Input Counter:** Add [Counter](https://www.lightningdesignsystem.com/components/input/) Example. This is useful for number input.

**Minor Features**

* **Combobox (Read-Only / Picklist):** Add "press a letter to scroll to an option" (similar to HTML `select` behavior)
* **Combobox (Read-Only / Picklist):** Add auto-scroll behavior on keyboard menu item selection (similar to HTML `select` behavior)
* **Combobox filter):** Make combobox filtering more performant by not creating RegExp in a loop
* **Combobox (filter):** Remove selected options based on `option.id` only
* **Input Counter:** Disable increment/decrement buttons when min/max is hit
* **Datepicker:** Add `input` render prop for Input customization

**Bugfixes**

* **Tree:** Compare cached flattened nodes with `id` key. Tree `nodes` are now compared with node `id` key instead of object compare when using keyboard events
* **Illustration:** Remove `<title>`
* **Input:** `inlineHelpText` can be `node` as well as `string` proptype update.
* **Combobox/PillContainer:** Pill aria-selected state is always true
* **Combobox/PillContainer:** Tab propagation bug introduced with menu letter jump feature
* **DataTable:** Update `stackedHorizontal` class name
* **Tooltip:** Do not console error `isTriggerTabbable` if no children of tooltip.
* **Toast:** Clear duration timeout in `componentWillUnmount()` to avoid memory leaks
* **DataTable:** Generates row `id` if none is present

**Maintenance**

* **Contributor Productivity:** Enable test suite on Windows and run tests concurrently by default. This update allows entire testing suite (500+ browser tests, 320+ snapshot DOM/images, prop comment validation, Prettier style, ESlint code quality) to run in less than 2 minute on most machines. This pull request also aligns npm script names. Please use `npm run` to view new names.
* **Contributor Productivity:** Replace PhantomJS with Headless Chrome (also speeds up browser tests slightly)
