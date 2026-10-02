# CSS Modules spike — findings (throwaway, not for merge)

Branch: feat/css-modules. Deliberately ignores AGENTS.md's "use global SLDS
classes, don't vendor CSS" convention per explicit instruction — this is a
spike to evaluate the approach, not a change intended to ship as-is.

## What was done

1. Vendored `node_modules/@salesforce-ux/design-system-2/dist/components/accordion/accordion.css`
   into `components/accordion/accordion.css` as-is. Not imported anywhere —
   just proves the per-component SLDS2 source files exist and can be copied
   into the repo (per the "copy per-component source before the final CSS
   file is built" idea).
2. Built `components/button/button.module.css` by concatenating SLDS2's
   `button.css` + `buttonIcon.css` (button draws classes from both — see
   "Component boundaries don't match" below).
3. Added `components/button/button.module.css.d.ts` (`Record<string, string>`
   default export) since the repo has no CSS Modules type declarations yet.
4. Rewrote `components/button/index.tsx`'s `getClassName()` to pull the
   button/buttonIcon-owned classes through `styles['slds-button_...']`
   instead of literal strings. Left `slds-global-header__button_icon`,
   `slds-text-link`, `slds-assistive-text` as plain global strings — they
   live in `globalHeader.css` / `utilities/interactions.css` /
   `utilities/visibility.css`, not button's own files.

No vite.config.ts changes were needed — Vite 8's built-in CSS Modules support
picks up `*.module.css` automatically, with bracket-accessible (non-camelCased)
keys by default, which is what the dash-heavy `slds-*` names need.

## What it proved

- **It works end-to-end.** `npm run typecheck`, `npm run build`, and
  `npm test -- --run components/button` all ran; the button renders with
  real (hashed) classes applied and all functional assertions still pass.
- **Component boundaries don't match 1:1.** `button/index.tsx` draws classes
  from `button.css`, `buttonIcon.css`, `globalHeader.css`, and two separate
  utilities files. A real migration needs a mapping step per DSR component,
  not a mechanical "one SLDS2 dir → one DSR component" copy.
- **CSS Modules only scopes selector names, not the token system.** The
  compiled rules still reference `var(--slds-c-button-color-background)`
  etc. — SLDS2's custom-property values still have to come from a separate,
  genuinely global stylesheet (base/tokens theme). CSS Modules doesn't
  remove the need for a global stylesheet; it only adds a second, scoped one
  on top for structural classes.
- **Lib build collapses CSS back to one global file.** With this repo's
  existing `rollupOptions.output` (`preserveModules`, ES+CJS, no
  `cssCodeSplit`), Vite correctly emits a per-component hashed class-name
  _map_ at `dist/{es,cjs}/components/button/button.module.{js,cjs}`, but
  bundles the actual CSS _rules_ into one combined
  `dist/{es,cjs}/design-system-react.css` — not per-component files. Getting
  genuinely separate per-component CSS assets would need `cssCodeSplit: true`
  plus verifying that interacts sanely with `preserveModules`.
- **No package.json wiring exists for shipping CSS at all.** `files` already
  includes `dist` so the generated CSS would be in the npm tarball, but the
  `exports` map only exposes JS/`.d.ts` — a consumer couldn't
  `import '@salesforce/design-system-react/design-system-react.css'`
  without an explicit exports entry added for it.
- **Breaks existing tests that assert literal class names.** One assertion
  in `components/button/__tests__/button.test.jsx` (`toHaveClass('slds-button_neutral')`)
  failed because the rendered class is now `_slds-button_neutral_<hash>`.
  Everything else (behavior, ARIA, event handling) passed unchanged. Per
  AGENTS.md, renaming/hashing a `className*` styling hook is a breaking
  change for every consumer who styles against or snapshot-tests `slds-*`
  classes directly — and SLDS alignment is this library's whole value
  proposition, so that's a real cost, not just test churn.
- Story HTML snapshots were not updated/run — expect the committed
  `story-snapshots.test.jsx.snap` to need regeneration if this went further.

## Not addressed in this spike (deliberately out of scope)

- Theming (lightning-blue/cosmos/pearl, light/dark) — still relies on a
  single global token stylesheet; untouched here.
- Any other component besides button; accordion.css was only copied, not
  wired through modules.
- `vite.config.ts` CSS code-splitting / exports map changes for real
  per-component CSS asset delivery.
