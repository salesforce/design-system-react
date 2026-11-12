# SLDS 2 ↔ React Storybook Comparison

> **Generated 2026-08-07** by a 6-way parallel sub-agent sweep (8 component pairs each).
> Compares the React design-system Storybook (this repo) against the upstream
> **SLDS 2** web-component Storybook at
> `/Users/shubick/projects/salesforce-design-system/packages/design-system-2`.
>
> Scope: the **48 matched component pairs** (a React component with a same-named SLDS 2
> component). Not covered here: 19 React-only components and 44 SLDS 2-only components
> (see the inventory note at the bottom).

## How to read this

For each pair we captured, per side: **story count + names**, **interactive controls
(argTypes)**, and the **features/variants demonstrated**. "Gaps" lists what SLDS 2 shows
that React does not — the actionable column. "Notable diff" flags genuine API/behavior
divergence (not just story-count differences).

Two structural facts shape almost every row:

1. **React stories are interactive; SLDS 2 stories are static.** React components carry
   real state (`useState`, controlled props, callbacks). SLDS 2 stories are template-driven
   HTML snapshots — they swap a whole prebuilt blueprint per story rather than exposing live
   controls. So SLDS 2 tends to have *more discrete visual states*, React tends to have
   *interactivity and controls*.
2. **SLDS 2 adds a `Customization` story to most components** — a design-token/styling-hook
   theming panel. React has no equivalent anywhere. This is the single most consistent gap.
3. **Many SLDS 2 components are filed under "Legacy Components"** (lookup, page-header,
   panel, popover, split-view, setup-assistant, trial-bar, visual-picker, welcome-mat,
   time-picker). For those, React is often the more actively-developed side.

---

## Batch 1 — accordion … button

### accordion
- **React:** 3 stories [Default, MultipleExpanded, WithRichContent]; 3 controls [allowMultipleOpen (bool), defaultExpandedId (select 1/2/3), panels (object)]; controlled — wrapper owns `expanded`/`onTogglePanel`.
- **SLDS 2:** 6 stories [Base, SectionHeadingWithTruncation, ActionMenu, Nested, WrappedInCard, Customization]; controls [active-section-name, allow-multiple-sections-open, title]; self-managed via `active-section-name`.
- **Gaps:** ActionMenu (action-menu-visible), Nested accordion, long-heading truncation, WrappedInCard, title tooltip, Customization.
- **Notable diff:** SLDS 2 self-manages the open section; React `AccordionPanel` is fully consumer-controlled.

### alert
- **React:** 8 stories [Info, Warning, ErrorAlert, Offline, Dismissible, DismissibleInteractive, WithHeadingLink, AllVariants]; 2 controls [variant, dismissible]; interactive dismiss/reopen + heading-link action.
- **SLDS 2:** 5 stories [Base, Error, Offline, Warning, Customization]; 0 controls.
- **Gaps:** Customization theming story.
- **Notable diff:** React alert dismissal is consumer-controlled (`onRequestClose` + `isOpen`); SLDS 2 is a self-contained web component.

### app-launcher
- **React:** 4 stories [Default, WithTriggerName, WithSearch, WithLinks]; 0 controls; open/close via internal `useState`.
- **SLDS 2:** 6 stories [Base, DescriptionOverflow, DragAndDropTileGrabbed, DragAndDropTileMovedInList, DragAndDropTileDropped, Searching]; 0 controls.
- **Gaps:** drag-and-drop tile reorder states (grabbed/moved/dropped), description-overflow truncation, filtered "searching" state.
- **Notable diff:** SLDS 2 models DnD tile reordering as first-class states; React has no DnD story/feature.

### avatar
- **React:** 9 stories [BaseWithImage, UserInitials, UserCustomInitials, UserInitialsInverse, UserIcon, EntityInitials, EntityIcon, AllSizes, UserVsEntity]; 2 controls [size, variant (user/entity)].
- **SLDS 2:** 14 stories [Base, Variants, Circle, ProfileIcon, GroupIcon, Icons, Initials, InitialsInverse, Sizes, XSmall, Small, Medium, Large, Customization]; controls [alternative-text (required), fallback-icon-name, initials, size, src, variant (circle/square)].
- **Gaps:** GroupIcon composite, ProfileIcon, curated fallback-icon-name, Customization.
- **Notable diff:** SLDS 2 `variant` = shape (circle/square); React `variant` = semantics (user/entity).

### badge
- **React:** 9 stories [Default, WithIconLeft, WithIconRight, InverseBadge, LightBadge, SuccessBadge, WarningBadge, ErrorBadge, AllColorVariants]; 2 controls [color, iconAlignment].
- **SLDS 2:** 11 stories [Base, BaseWithLeftIcon, BaseWithRightIcon, Inverse, Light, Info, Success, Error, Warning, WithChildElement, Customization]; controls [icon-alternative-text (required), icon-position, icon-name, label, color (incl. info)].
- **Gaps:** "info" color variant, WithChildElement (HTML inside badge), Customization, required icon alt-text.
- **Notable diff:** React `icon` accepts an arbitrary node; SLDS 2 `icon-name` is a curated utility-icon string.

### brand-band
- **React:** 7 stories [Default, Small, Large, NoImage, UserImage, GroupImage, CoverBackground]; controls [size, image, backgroundSize].
- **SLDS 2:** 1 story [Base]; 1 control [size].
- **Gaps:** none notable — **React is the more complete side** (SLDS 2 has no image/background support).

### builder-header
- **React:** 3 stories [Default, CustomLabels, CustomIcon]; 0 controls.
- **SLDS 2:** 10 stories [Base, MenuOpen, WithTooltip, WithTruncation, WithToolbar, HasStatusText, HasStatusTextWithTooltip, HasStatusTextWithWarning, HasStatusTextWithError, HasStatusTextWithWarningandError]; 0 controls.
- **Gaps:** menu-open, toolbar, save/status-text messaging (plain/tooltip/warning/error/both), truncation, tooltip. *(Note: React `__examples__` already has `base-with-toolbar`, `successful-save`, `failed-save`, `base-with-utilities` — just not wired into stories.)*

### button
- **React:** 22 stories [Base, Neutral, Brand, Destructive, Success, Disabled, NeutralWithLeftIcon, NeutralWithRightIcon, IconOnly, IconLarge, InverseButton, InverseIconButton, InverseIconWithHint, OutlineBrandButton, DropdownButton, LinkButton, WithAriaLabel, WithDataAttribute, WithCustomId, + 3 DocSite]; 0 controls (raw `.args`).
- **SLDS 2:** 14 stories [Base, Neutral, Brand, BrandOutline, Inverse, Destructive, DestructiveText, Success, Stretch, IconOnly, FullWidth, DeprecatedSmall, DeprecatedSpaceLeft, Customization]; controls [icon-name, icon-position, label, stretch, variant, disabled].
- **Gaps:** brand-outline variant, destructive-text variant, stretch/full-width, Customization.
- **Notable diff:** React models link/dropdown/hint/icon-variant combos SLDS 2 lacks; SLDS 2 models stretch/full-width + deprecated legacy classes React lacks.

---

## Batch 2 — button-group … data-table

### button-group
- **React:** 6 stories [Default, IconGroup, ListVariant, WithLabel, MixedButtons, SingleButton]; 1 control [variant: checkbox/list].
- **SLDS 2:** 5 stories [Base, Disabled, Inverse, WithMenu, WithMenuDisabled]; 0 controls.
- **Gaps:** Disabled group, Inverse background, dropdown-menu-button-in-group (WithMenu/WithMenuDisabled).
- **Notable diff:** React `variant` targets checkbox/list form-groupings; SLDS 2 emphasizes button-with-menu composition.

### button-stateful
- **React:** 6 stories [Default, Controlled, IconVariant, IconFilledVariant, CustomStates, Disabled]; 1 control [variant].
- **SLDS 2:** 9 stories [Brand, Neutral, Destructive, Success, Inverse, NoIcon, Disabled, TextVariant, Customization]; 8 controls [variant, label-when-off/on, icon-name-when-off/on, selected, disabled, title].
- **Gaps:** Success + Text variants, Inverse, NoIcon, per-label/per-icon live controls, Customization.
- **Notable diff:** Variant vocabularies don't map 1:1 (React base/neutral/brand/destructive/icon/icon-filled vs SLDS 2 brand/neutral/destructive/inverse/success/text).

### card
- **React:** 8 stories [WithItems, InteractiveCard, EmptyCard, CustomHeader, CustomHeading, SetHeightCard, WithoutHeader, SimpleCard]; 0 controls; InteractiveCard has live filter/add/delete.
- **SLDS 2:** 16 stories [Base, NoHeaderIcon, NoHeader, NoFooter, NoPadding, WrappedCards, NestedCards, RelatedList, Collapsed, EmptyIllustration, Loading, DataTable, DataTiles, Custom, Deprecated, Customization]; 5 controls [title, icon-name, hide-header, padding, show-footer].
- **Gaps:** Collapsed, Loading, DataTiles, NestedCards, WrappedCards, richer EmptyIllustration, Customization.
- **Notable diff:** React Card is compositional (props + children); SLDS 2 Card swaps prebuilt HTML blueprints via `template`.

### carousel
- **React:** 7 stories [Default, WithNavigation, WithAutoplay, WithAutoplayAndNavigation, InfiniteLoop, ThreeItemsPerPanel, Controlled]; 5 argTypes [hasAutoplay, hasPreviousNextPanelNavigation, isInfinite, itemsPerPanel, autoplayInterval].
- **SLDS 2:** 2 stories [Base, CarouselWithoutAutoScroll]; 0 controls.
- **Gaps:** none notable — **React is far more complete.**

### checkbox
- **React:** 18 stories [Base, Checked, Disabled, DisabledChecked, Required, WithError, Indeterminate, WithAssistiveText, Toggle, ToggleChecked, ToggleDisabled, ToggleRequired, ToggleWithError, ToggleCustomLabels, ButtonGroup, + 3 DocSite]; action controls only.
- **SLDS 2:** 22 stories [Base, Required, Error, ErrorChecked, Disabled, DisabledChecked, Group, GroupRequired, GroupError, GroupDisabled, RTL, Indeterminate, FormElement* (7), Customization]; 4 controls [label, required, disabled, checked].
- **Gaps:** checkbox-group (fieldset) variants, RTL story, "view-mode" read-only display, help-text + help-text-tooltip blueprints, Customization.
- **Notable diff:** React `variant` covers Toggle + ButtonGroup rendering (separate components in SLDS 2); SLDS 2 covers fieldset grouping + non-interactive view-mode React lacks.

### color-picker
- **React:** 15 stories [DefaultStory, RightToLeft, NoLabel, CustomOnly, SwatchOnly, PredefinedColors, PredefinedColorsOnly, HiddenInput, CustomTabSelected, OuterInputErrorState, WorkingColorErrorState, CustomValidator, Disabled, MenuOpen, DocSiteDefault]; 0 declared argTypes.
- **SLDS 2:** 11 stories [Base, SummaryError, OpenDefaultTabSelected, OpenCustomTabSelected, OpenCustomTabSelectedErrorState, CustomOnly, OpenCustomOnly, OpenWithErrorCustomOnly, PredefinedOnly, SwatchesOnly, OpenSwatchesOnly]; 0 controls.
- **Gaps:** closed-state "summary error" display, pre-opened popover snapshots per tab combo (for visual-regression coverage).
- **Notable diff:** React exposes pluggable validator callbacks + RTL story; SLDS 2 emphasizes pre-opened static snapshots.

### combobox
- **React:** 13 stories [Base, BaseWithMenuSubheader, InlineSingle, InlineMultiple, ReadonlySingle, ReadonlySingleWithSelection, ReadonlyMultiple, ReadonlyWithDeselect, ReadonlyDisabled, WithErrorState, WithLoadingSpinner, WithMenuSpinner, PredefinedOptionsOnly]; 0 argTypes; fully interactive. *(30+ extra `__examples__` files — RTL, dialog, custom menu items — NOT wired into stories.)*
- **SLDS 2:** 18 stories [Base, Disabled, Required, Grouped* (4), PicklistMultipleSelection* (3), Lookup* (5), ButtonStyle* (3)]; 5 controls [label, value, placeholder, disabled, required].
- **Gaps:** "button style" combobox variant (Closed/Open/Selected); separately snapshotted open/closed static states per variant. *(React's `__examples__` covers RTL/dialog/custom items but they aren't exported as stories.)*
- **Notable diff:** React stories are live/interactive; SLDS 2 stories are static open/closed snapshots.

### data-table
- **React:** 17 stories [BasicFluidLayout* (5), BasicFixedLayout, AdvancedFixedLayout, AdvancedSingleSelect* (2), AdvancedWithHeaderRow, FixedHeader, InteractiveElements, FixedHeaderHorizontalScrolling, JoinedWithPageHeader, CustomClasses, InfiniteScrolling, ResizableColumns]; 0 argTypes.
- **SLDS 2:** 10 stories [Base, WithSorting, WithInlineEdit, Headless, WithRowActions, WithRowNumbers, WithTextWrapping, WithStripedRows, WithColumnDividers, EditedCellWithRowLevelError]; 6 controls [hide-checkbox-column, show-row-number-column, show-action-menu, hide-table-header, suppress-bottom-bar, wrap-text-max-lines].
- **Gaps:** row-level error on edited cell, text-wrapping with max-lines control, column-divider styling.
- **Notable diff:** React emphasizes layout mechanics (fixed/fluid, resizable, infinite scroll); SLDS 2 emphasizes discrete attribute toggles on one base template.

---

## Batch 3 — date-picker … input

### date-picker
- **React:** 11 stories [Default, ISOWeekdays, RightToLeft, InlineMenu, Error, DisabledDates, CustomYearRange, RightAligned, Disabled, PreselectedDate, Internationalized]; 0 controls.
- **SLDS 2:** 13 stories [Base, Predefined, IsoDate, Placeholder, Required, Readonly, Disabled, MinMax, SelectedDateRange, SelectedDateRangeWithToday, SelectedDateRangeInDifferentWeek, SelectedDateRangeInAdjacentMonth, Deprecated]; 0 controls.
- **Gaps:** date-**range** selection (4 stories), MinMax bounds, explicit Required/Readonly/Placeholder/Predefined, Deprecated variant.
- **Notable diff:** React DatePicker is single-date only; SLDS 2 is a dual single/range picker with dedicated range UI.

### docked-composer
- **React:** 3 stories [Open, Closed, Interactive]; 0 controls.
- **SLDS 2:** 20 stories [Base, Open, OpenFocused, Closed, ClosedFocused, PoppedOut, OverflowMenu, LogATask, EmailComposer, VoiceCall* (10 call-states), Deprecated]; 0 controls.
- **Gaps:** focused states, popped-out mode, overflow menu, log-a-task type, **entire voice/telephony call-state suite (10 stories)**, Deprecated.
- **Notable diff:** SLDS 2 dockedComposer is a multi-purpose shell covering voice/telephony UIs; React's is a generic composer shell.

### expandable-section
- **React:** 6 stories [Default, InitiallyCollapsed, NonCollapsible, Controlled, MultipleSections, WithRichContent]; 2 controls [isOpen, nonCollapsible].
- **SLDS 2:** 3 stories [Base, NonCollapsible, Closed]; 0 controls.
- **Gaps:** none notable — **React is more complete.**

### expression
- **React:** 4 stories [Default, AllConditions, AnyCondition, CustomLogic]; 1 control [triggerType: all/any/custom/always/formula].
- **SLDS 2:** 12 stories [Base, InitialState, WithMultipleConditions, WithDisabledInputs, WithAnError, WithExpressionGroup, CustomLogic, Formula, Filters, FiltersWithNarrowExpressionGroup, ErrorWithNarrow, WithLockedFilters]; 0 controls.
- **Gaps:** error state, disabled-inputs, nested expression groups, Formula trigger demo, filters view, narrow/responsive layouts, locked filters.
- **Notable diff:** React lists "always"/"formula" triggerType options but no story exercises them; SLDS 2 has materially deeper coverage.

### global-header
- **React:** 3 stories [Default, WithNavigation, WithActions]; 0 controls; **search/profile omitted — `react-onclickoutside` incompatible with React 19.**
- **SLDS 2:** 3 stories [Standard, Notification, SearchOpen]; 0 controls.
- **Gaps:** interactive notification panel + search-open states — **blocked in React by the react-onclickoutside/React 19 incompatibility.**
- **Notable diff:** React's search/profile dropdowns are effectively disabled pending a dependency fix.

### icon
- **React:** 23 stories [Category* (6), Size* (4), Color* (6), BaseStandardCustomStyles, BaseImported, ProductThemes, + 3 DocsSite]; 0 controls; exhaustive category/size/color/RTL breakdown.
- **SLDS 2:** 3 stories [Base, Variants, Customization]; token controls only; Base/Variants delegate to LBC icon example wrappers.
- **Gaps:** styling-hook/token Customization story.
- **Notable diff:** React hand-builds categorical/size/color demos; SLDS 2 mostly delegates to LBC wrappers + one theming story.

### illustration
- **React:** 5 stories [SmallImageAndText, LargeImageAndText, HeadingOnly, MessageOnly, HeadingAndMessage]; 0 controls; purely compositional slots.
- **SLDS 2:** 14 stories across 2 files — [Base, ErrorFetching, EmptyStateIllustrations, InitialStateIllustrations] w/ argTypes [illustrationName, alternativeText] + SLDS1/2 toggle; legacy file [LegacyBase, MessageBody, LargeIllustration, Informational, NoData, Error, Custom, Miscellaneous, CallToAction, TextOnly].
- **Gaps:** name/catalog-driven lookup (`illustrationName`), invalid-name error-fetching, empty/initial-state catalogs, SLDS1↔SLDS2 toggle, named legacy views.
- **Notable diff:** SLDS 2 illustration is catalog-driven (looks up prebuilt SVGs by name w/ error handling); React's is purely compositional — different architectures.

### input
- **React:** 19 stories [Base, AssistiveTextLabel, ErrorState, InlineHelp, WithLeftIcon, WithRightIcon, WithClickableIcons, WithSpinner, FixedText, ReadOnly, Disabled, Static, Counter, CounterDecimal, CounterStatic, FieldLevelHelp, CustomStyling, Controlled, InputTypes]; 6 controls [variant, type, disabled, readOnly, required, isStatic].
- **SLDS 2:** 23 stories [Base, LeftIcon, RightIcon, IconAndClearButton, ClearButtonWithSpinner, EmailInput, DateInput, DateInputWithDateSelected, SearchInput, URLInput, TelephoneInput, FixedText, InlineHelp, FieldLevelHelp, Required, Disabled, DisabledWithIcon, Error, ErrorWithIcon, ErrorWithIconInHorizontalForm, ReadOnly, TextInputFocus, Customization]; 11 controls [type (radio incl. checkbox/color/file/range/toggle), label, placeholder, value, name, field-level-help, required, disabled, read-only, date-style, is-loading].
- **Gaps:** date-style control, native input types (checkbox/color/file/range/toggle), horizontal-form error+icon, automated focus-state test, Customization.
- **Notable diff:** SLDS 2 `type` covers many native HTML types React never exposes; React's counter/decimal-step variant has no SLDS 2 equivalent.

---

## Batch 4 — lookup … progress-indicator

### lookup
- **React:** 7 stories [Standard, Disabled, StandardWithAccounts, CustomEmptyMessageContent, + 3 DocsSite]; 0 argTypes; live selection + custom render.
- **SLDS 2:** 2 stories [DeprecatedBase, DeprecatedSearch] — **"Legacy Components/Lookup"**; 0 controls.
- **Gaps:** none notable — **React covers more.**
- **Notable diff:** SLDS 2 lookup is deprecated/legacy; React's is actively demoed.

### modal
- **React:** 16 stories [Default, WithFooter, DirectionalFooter, Large, Medium, Small, NoHeader, Prompt* (4), NotDismissible, TopAligned, CustomHeader, AlwaysOpen]; 3 controls [size, prompt, align].
- **SLDS 2:** 13 stories [Base, BaseDeprecated, LayoutTaglines(+Deprecated), LayoutHeadless(+Deprecated), LayoutFootless, LayoutDirectional, Size* (Small/Medium/Large/Full), Customization]; 0 controls.
- **Gaps:** SizeFull (React has no "full" size), tagline layout as a named story, Customization.
- **Notable diff:** React models prompt (notification) variants via a `prompt` prop; SLDS 2 treats layouts as static templates w/ deprecated counterparts.

### page-header
- **React:** 5 stories [Base, ObjectHome, RecordHome, RelatedList, Joined]; 1 control [variant].
- **SLDS 2:** 6 stories [Base, ObjectHome, RecordHome, RelatedList, VerticalRecordHome, Deprecated] — **"Legacy Components"**; 0 controls.
- **Gaps:** VerticalRecordHome variant, Deprecated markup story.
- **Notable diff:** React adds a "Joined" (page-header + data-table) story; SLDS 2 filed as legacy.

### panel
- **React:** 3 stories [Default, FiltersVariant, ScrollableContent]; 1 control [variant].
- **SLDS 2:** 6 stories [Base, DrillIn, TruncatedTitle, SecondaryAction, positionLeft, PositionRight] — **"Legacy Components"**; 0 controls.
- **Gaps:** DrillIn navigation, TruncatedTitle, SecondaryAction header button, left/right docking.
- **Notable diff:** React Panel is content-agnostic; SLDS 2 has docking + drill-in patterns (legacy).

### pill
- **React:** 8 stories [LinkedPill, UnlinkedPill, WithIcon, WithAvatar, BarePill, ErrorPill, TruncatedPill, MultiplePills]; 3 controls [variant, bare, hasError].
- **SLDS 2:** 8 stories [Base, Avatar, Error, Icon, ListBoxPills, UnorderedListBoxPills, BareListBoxPills, Customization]; 0 controls.
- **Gaps:** listbox-of-pills container patterns (ordered/unordered/bare with roles), Customization.
- **Notable diff:** SLDS 2 pill examples are dual LBC + native; React is single prop-driven component.

### popover
- **React:** 11 stories [Default, Controlled, Alignments, ErrorVariant, WarningVariant, FeatureVariant, WalkthroughVariant, WalkthroughActionVariant, WithFooter, NoNubbin, NoCloseButton]; 2 controls [align (12 options), variant].
- **SLDS 2:** 7 stories [Base, Widths, Nubbins, NubbinsLogical, FeedbackStates, Examples, Deprecated] — **"Legacy Components"**; 0 controls.
- **Gaps:** logical (RTL-aware) nubbin positioning, dedicated Widths story, Deprecated markup.
- **Notable diff:** React exposes feature/walkthrough/walkthrough-action (product-tour) variants SLDS 2 lacks; SLDS 2 filed as legacy.

### progress-bar
- **React:** 7 stories [Default, Descriptive, SuccessColor, CircularRadius, ThicknessVariants, Vertical, ProgressValues]; 5 controls [value, thickness, orientation, color, radius].
- **SLDS 2:** 15 stories [Base, InAction, Variant, Declarative, xSmall, Small, Medium, Large, Success, Vertical, VerticalProgress* (0/25/50/75/100%)]; 0 controls.
- **Gaps:** none real — SLDS 2's vertical value sweep is static duplication of what React's range control does dynamically.
- **Notable diff:** React has a `radius: circular` variant with **no SLDS 2 counterpart** (React-only feature); SLDS 2 lacks live controls.

### progress-indicator
- **React:** 8 stories [Default, Interactive, Vertical, WithError, WithDisabledSteps, ModalVariant, SetupAssistantVariant, AllComplete]; 2 controls [orientation, variant].
- **SLDS 2:** 12 stories [Base, CompletedStep, ErrorStep, InAModal, OnAGrayBackground, VerticalBase, VerticalNext, VerticalSuccess, VerticalError, VerticalMultiline, VerticalOnGrayBackground, Customization] + separate deprecated file [ButtonMarkers]; 0 controls.
- **Gaps:** OnAGrayBackground / VerticalOnGrayBackground theming, VerticalMultiline (wrapped labels), Customization, deprecated ButtonMarkers.
- **Notable diff:** React has a dedicated `setup-assistant` variant + interactive step nav; SLDS 2 has background/multiline variants React lacks.

---

## Batch 5 — progress-ring … tabs

### progress-ring
- **React:** 7 stories [Default, Active, Warning, Expired, Complete, FillDirection, AllThemes]; 4 controls [value, theme, flowDirection, size].
- **SLDS 2:** 13 stories [Base, PartiallyDrained, PartiallyFilled, PartiallyDrainedWithWarning, PartiallyFilledWithWarning, WithExpiredIcon, Complete, LargeSize, ActiveStep, ThemeWarning, ThemeExpired, ThemeComplete, Customization]; 0 controls.
- **Gaps:** partially-drained-vs-filled shown separately with warning combos, dedicated ActiveStep, Customization.
- **Notable diff:** React has live controls; SLDS 2 has static fixtures + token customization.

### radio-button-group
- **React:** 5 stories [Base, Disabled, Required, Error, DocsSiteBase]; 0 controls.
- **SLDS 2:** 4 stories [Button, ButtonDisabled, ButtonRequired, WithIcons]; 0 controls.
- **Gaps:** icon-adorned radio buttons (WithIcons).

### radio-group
- **React:** 6 stories [Default, ButtonGroupVariant, Required, Disabled, WithError, WithAssistiveText]; 3 controls [variant (base/button-group), required, disabled].
- **SLDS 2:** 8 stories [Base, Required, RequiredWithHelpTextIcon, RequiredWithHelpTextIconWithTooltip, Disabled, DisabledChecked, ErrorUnchecked, ErrorChecked]; 4 controls [label, disabled, required, variant (standard/label-hidden/label-inline/label-stacked)].
- **Gaps:** required-with-help-icon (± tooltip), disabled-checked, error-checked, label-placement variants.
- **Notable diff:** SLDS 2 variant axis = label placement; React variant axis = base vs button-group (orthogonal).

### setup-assistant
- **React:** 3 stories [Default, WithCard, Interactive]; 0 controls.
- **SLDS 2:** 4 stories [Base, WithStepProgress, HubWithExpandableSteps, InACard] — **"Legacy Components"**; 0 controls.
- **Gaps:** richer "hub" layout variant, step-progress as its own story.
- **Notable diff:** SLDS 2 files this under Legacy (deprecating); React treats it as first-class.

### slider
- **React:** 7 stories [Default, CustomRange, WithStep, Disabled, WithError, Vertical, Sizes]; 7 controls [value, min, max, step, disabled, vertical, size].
- **SLDS 2:** 6 stories [Base, Sizes, Type, Variant, Error, Customization]; 0 controls.
- **Gaps:** "Type" variant story, Customization.
- **Notable diff:** React has a `vertical` orientation story; no SLDS 2 vertical-slider story found.

### spinner
- **React:** 15 stories [Default, Size* (5), Brand* (3), Inverse* (2), WithDelay, InlineSpinner, NoContainer, AllSizes]; 5 controls [size, variant, hasContainer, isDelayed, isInline].
- **SLDS 2:** 6 stories [Base, WithContainer, Brand, Sizes, Inverse, Customization]; 0 controls.
- **Gaps:** Customization (token) story, explicit rtl-noflip tagging.
- **Notable diff:** React far more granular/interactive; SLDS 2 consolidates into fewer static templates + customization.

### split-view
- **React:** 5 stories [Default, InitiallyClosed, Controlled, CustomWidth, WithEventHandlers]; 0 controls.
- **SLDS 2:** 4 stories [Base, SelectedItem, UnreadItems, CollapsedPanel] — **"Legacy Components"**; 0 controls.
- **Gaps:** selected-item visual state, unread-item indicator.
- **Notable diff:** SLDS 2 filed as Legacy; React focuses on interaction, SLDS 2 on list-item visual states.

### tabs
- **React:** 6 stories [Default, Scoped, Vertical, WithDisabledTab, DefaultSelectedIndex]; 1 control [variant].
- **SLDS 2:** 6 stories [Base, BaseActiveTab, BaseConditionalTab, Scoped, ScopedWithOverflow, ScopedVertical]; 0 controls.
- **Gaps:** conditional/dynamically-rendered tab, scoped-with-overflow (menu) behavior, scoped+vertical pairing.

---

## Batch 6 — textarea … welcome-mat

### textarea
- **React:** 11 stories [Standard, WithValue, Disabled, Required, WithError, WithMaxLength, AssistiveTextOnly, + 3 DocSite]; action controls.
- **SLDS 2:** 8 stories [Base, Disabled, DisabledReadOnly, Required, Error, ReadOnly, Focus, Customization]; 1 control [template].
- **Gaps:** ReadOnly + DisabledReadOnly states, Focus-state story with interaction test, Customization.
- **Notable diff:** React exercises real controlled behavior; SLDS 2 is static templates.

### time-picker
- **React:** 8 stories [Default, FifteenMinuteIntervals, OneHourIntervals, Required, Disabled, PreselectedValue, TwentyFourHourFormat, RelativePosition]; controlled props.
- **SLDS 2:** 2 stories [Base, Advanced]; 0 controls.
- **Gaps:** none notable — **React more complete** (though React's TimePicker is itself deprecated in favor of Combobox).
- **Notable diff:** React TimePicker is a full JS autocomplete widget (deprecated); SLDS 2 "Advanced" borrows lightning-input examples.

### toast
- **React:** 10 stories [Info, Success, Warning, Error, WithHeadingLink, ErrorWithDetails, WithCloseCallback, WithDuration, AllVariants]; 1 control [variant].
- **SLDS 2:** 6 stories [Base, SmallColumn, Warning, Success, Error, ErrorWithDetails]; 1 control [template].
- **Gaps:** SmallColumn layout variant.
- **Notable diff:** React demonstrates interactive behavior (heading-link click, close callback, auto-dismiss); SLDS 2 static.

### tooltip
- **React:** 13 stories [Default, Open, InfoTheme, ErrorTheme, LearnMore, AllAlignments, WithIconTrigger, WithSpanTrigger, WithDelay, AnchoredNubbin, InButtonGroup, Controlled, DefaultTrigger]; 9 controls [align, theme, variant, position, hoverOpenDelay, hoverCloseDelay, isOpen, hasAnchoredNubbin, hasStaticAlignment].
- **SLDS 2:** 12 stories [Base, IconLink, ButtonIcon, Button, Motion* (4 directions), ToggleRise, ToggleFall, Deprecated, Customization]; 1 control [template].
- **Gaps:** directional motion transitions (4), toggle rise/fall animation states, Deprecated legacy style, Customization.
- **Notable diff:** React is controlled/interactive (delays, controlled state, flipping); SLDS 2 foregrounds CSS motion/animation variants React lacks.

### trial-bar
- **React:** 1 story [Default]; 0 controls.
- **SLDS 2:** 2 stories [Base, menuOpen] — **"Legacy Components"**; 1 control [template].
- **Gaps:** menuOpen (open dropdown) state.

### vertical-navigation
- **React:** 4 stories [Default, Interactive, SingleCategory, MultipleCategories]; 0 controls.
- **SLDS 2:** 13 stories [Basic, Advanced, Badge, Compact, Href, Icon, Iteration, Overflow, Selected, Shaded, Validation, Customization, CustomizationAdvanced, Deprecated]; 1 control [template].
- **Gaps:** Badge, Compact density, Href-link, Icon, Overflow handling, Shaded background, Validation state, Customization.
- **Notable diff:** SLDS 2 offers many visual/state variants that likely don't exist as props in the React component — a **real feature gap**, not just missing stories.

### visual-picker
- **React:** 5 stories [RadioPicker, CheckboxPicker, LargeSize, VerticalLayout, Coverable]; 3 controls [size, vertical, coverable].
- **SLDS 2:** 13 stories [Base, CoverableContent* (Small/Medium/Large/Disabled), CoverableContent*Checkboxes (3), NonCoverableContent(+Disabled), Vertical(+Disabled), Link] — **"Legacy Components"**; 1 control [template].
- **Gaps:** small size tier (React has only medium/large), disabled state, checkbox size variants, non-coverable content, vertical+disabled, Link-based construction.
- **Notable diff:** SLDS 2 disabled-state + small tier + non-coverable aren't represented as React props.

### welcome-mat
- **React:** 6 stories [Default, StepsComplete, InfoOnly, Splash, Trailhead, TrailheadComplete]; 0 controls.
- **SLDS 2:** 5 stories [Base, BaseWithCloseInHeader, CompletedSteps, InfoOnly, Splash] — **"Legacy Components"**; 1 control [template].
- **Gaps:** BaseWithCloseInHeader (close control in header).
- **Notable diff:** React has two Trailhead-branded variants SLDS 2 lacks.

---

## Synthesis — the highest-value gaps

Ranked by leverage (breadth × user value), grouped so they can become ROADMAP items.

### A. Cross-cutting: no `Customization` / token-theming stories (systemic)
SLDS 2 attaches a **`Customization` story** — a live styling-hook/design-token panel — to
~20 components (accordion, alert, avatar, badge, button, button-stateful, card, icon, input,
modal, pill, progress-indicator, progress-ring, slider, spinner, textarea, tooltip,
vertical-navigation, checkbox, radio-group…). React has **zero**. This is the single most
repeated gap and the most on-theme for "components using SLDS 2." A shared decorator or a
per-component "Theming" story that documents the CSS custom properties would close it broadly.

### B. Real feature gaps (component lacks the capability, not just the story)
These are where SLDS 2 demonstrates behavior the React component apparently can't do:
- **vertical-navigation** — badge, compact, icon, shaded, overflow, validation variants.
- **visual-picker** — small size tier, disabled state, non-coverable content, Link construction.
- **date-picker** — date-**range** selection (SLDS 2's is dual single/range; React single-only).
- **app-launcher** — drag-and-drop tile reordering.
- **global-header** — interactive search + notification (blocked by `react-onclickoutside`/React 19; ties to P1-style dependency work).
- **input** — native input types (checkbox/toggle/range/color/file) exposed as `type`.

### C. Missing-story gaps (component likely supports it; story just absent)
High-value states worth adding stories for:
- **docked-composer** — voice/telephony call-state suite (biggest single story gap: ~10).
- **builder-header** — status-text/save messaging + toolbar (examples already exist in `__examples__`, just unwired).
- **card** — Loading, Collapsed, NestedCards, DataTiles.
- **checkbox** — fieldset group variants, view-mode (read-only) display, help-text.
- **expression** — error/disabled/nested-group/locked-filters/formula.
- **accordion** — ActionMenu, Nested, WrappedInCard, heading truncation.
- **tooltip** — directional motion + rise/fall (may need CSS support).
- **modal** — SizeFull.
- **tabs** — conditional tab, scoped-with-overflow.
- **radio-group** — help-icon(+tooltip), disabled-checked, error-checked, label-placement.

### D. Where React is already ahead (no action)
brand-band (image/background support), carousel (nav/infinite/multi-item/controlled),
expandable-section, lookup, time-picker — React covers more than SLDS 2, and several SLDS 2
counterparts are filed "Legacy Components" (lookup, page-header, panel, popover, split-view,
setup-assistant, trial-bar, visual-picker, welcome-mat). **Don't chase legacy-only variants** —
they're being deprecated upstream.

### Recommended intake into ROADMAP P2
1. Add a token-theming ("Customization") story pattern — start with a shared decorator + 3–4 exemplar components (button, card, input, avatar). *(Gap A)*
2. Wire builder-header's existing `__examples__` (toolbar, save states) into stories — near-zero cost. *(Gap C)*
3. Export combobox's 30+ existing `__examples__` (RTL, dialog, custom items) as stories — near-zero cost. *(Gap C)*
4. Add the docked-composer voice/call-state stories. *(Gap C)*
5. File real feature gaps (vertical-navigation variants, visual-picker states, date-range) as component-enhancement issues, not story issues. *(Gap B)*

---

## Inventory note (out of scope for this pass)

- **48 matched pairs** compared above.
- **19 React-only** components (no SLDS 2 same-name counterpart): breadcrumb, dynamic-icon,
  files, filter, global-navigation-bar, grid, icon-settings, location-map, media-object,
  menu-dropdown, menu-picklist, navigation, notification, pill-container, popover-tooltip,
  portal-settings, radio, scoped-notification, tree.
- **44 SLDS 2-only** components with stories that have no React same-name counterpart — a
  separate forward-looking "what could we add" analysis if desired.
