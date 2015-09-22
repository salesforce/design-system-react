# Why Use Behavior Driven Tests #

We have slightly redefined "behavior" to a broader scope. In this project, a "behavior" is anything the user does (interaction via the DOM, and what is traditionally considered behavioral testing), or anything the application does (interaction with the framework via the API, which is the behavior of the application itself).

The following are two top-level goals of these behavior driven tests.

## Framework Agnostic ##

We want this project to be framework agnostic. That means it should be usable with jQuery, Marionette, React, and any other number of frameworks.

## Easy to Consume ##

We want the components exported by this project to be easy to consume from within any of our defined frameworks. As part of this, we want to honor the style and expected API of each framework. For example, in jQuery this means making use of the ``.data()`` storage and exporting backward-compatible jQuery plugins accessed off of ``$.fn``. This means using Backbone models and collections when using the Marionette framework. This means using ``props`` and and an external state-machine for React.

## One test, multiple framework APIs ##

If the API for accessing a component is different from framework to framework, then it becomes difficult to write one test which covers all frameworks. Yet, if you don't have a single test which is applied to all frameworks, then it is easy for the frameworks to diverge and end up with unique bugs and quirks between them. Therefore we needed to define a framework agnostic testing approach.

# Overview #

We have structured the tests such that the behavior tests drive the API, and from there the code. Unit testing has been abstracted to a higher level--the behavior tests execute functions that get implemented in facade specific ways that _then_ manipulate the components. You could call it a "testing API" for the components that guarantee parity across all the facades. They are structured like this:

```Text
				  --- Facade Tests (jQuery) ------- Facade Specific API ---
				 /                                                         \
Behavior Tests ------ Facade Tests (Marionette) --- Facade Specific API ------- Core
				 \                                                         /
				  --- Facade Tests (React) -------- Facade Specific API ---
```

Behavior test files should be named ``tests/behavior/{{component}}-test.js``

Facade test files should be named ``tests/{{facade}}/{{component}}-test.js``

Component files should be named ``src/{{facade}}/{{component}}/{{component}}.js``

This document covers the expectations of the Behavior Tests, the ``behaviorHandlers`` exported by the Facade Tests, and the declaration of the Test Contract between Behavior Tests and Facade Tests.

# Requirements #

The behavior driven tests have the following requirements:
* Facades for frameworks listed in ``package.json``
* Components listed in ``package.json``
* A behavior test file for each component: ``tests/behavior/{{component}}-test.js``
	* A well documented set of the API behaviors expected of the component
		* Import the ``tests/tests-api.js`` file
		* A call to ``verifyFacadeProvidesBehaviorCallbacks`` to test the test API
	* Tests covering each logical grouping of behaviors which use
		* A call to ``registerBehaviorTestCombinations`` for each combination
		* **NOTE:** Keep these combinations small! They have a multiplicative effect.
* A facade-specific test file for each facade for each component: ``tests/{{facade}}/{{component}}-test.js``
	* Any API-specific tests (e.g. verify that data is stored in given location)
	* Exports behavior methods which define each approach for performing a given behavior

## Sample Behavior Tests ##

```javascript
// tests/behavior/sample-test.js

import { verifyFacadeProvidesBehaviorCallbacks, registerBehaviorTestCombinations } from '../lib/behavior-test-runner';
import { tree as componentFacadeTestLib } from '../tests-api';

const chai = require('chai');

/* Testing Contract: Expected values on each facade's exported behaviorHandlers

component createComponent( initData )
	This should return the object which represents the component (to be passed back in on later calls)
	initData => {
		color: String, optional, default color of the thing
	}

getComponentElement( component )
	This should return the outermost unordered list element (beginning of the official tree HTML)
	component => returned value from createComponent

clickComponent( component )
	Simulate a click of the component
	component => returned value from createComponent

destroyComponent( component )
	This should perform all cleanup tasks such that it appears the tree never existed.
	component => returned value from createComponent

*/

describe('Sample Component', function () {
	verifyFacadeProvidesBehaviorCallbacks(componentFacadeTestLib, [
		'createComponent',
		'getComponentElement',
		'destroyComponent',
		'clickComponent'
	]);

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createComponent',
		'getComponentElement',
		'destroyComponent'
	], [
		// other behaviors required for tests
	], function (testingBehaviorHandlers) {
		describe('Create and Destroy component', function () {
			it('should do something on create', function () {
				const component = testingBehaviorHandlers.createComponent();
				// assert here
				testingBehaviorHandlers.destroyComponent(component);
			});

			it('should return a DOM element', function () {
				const component = testingBehaviorHandlers.createComponent();

				const el = testingBehaviorHandlers.getComponentElement(component);
				// assert here

				testingBehaviorHandlers.destroyComponent(component);
			});

			it('should do something on destroy', function () {
				const component = testingBehaviorHandlers.createComponent();
				testingBehaviorHandlers.destroyComponent(component);
				// assert here
			});
		});
	});

	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'clickComponent'
	], [
		// other behaviors required for tests
		'createComponent',
		'destroyComponent'
	], function (testingBehaviorHandlers) {
		describe('Click component', function () {
			it('should do something on click', function () {
				const component = testingBehaviorHandlers.createComponent();

				testingBehaviorHandlers.clickComponent(component);
				// assert here that component change color

				testingBehaviorHandlers.destroyComponent(component);
			});
		});
	});
});
```

### Imports ###

We should always use both of the methods from the ``tests/lib/behavior-test-runner.js`` file, so we import them. This may be imported via wild-card instead of explicitly, if desired, but we suggest naming them explicitly so that we can detect during ``eslint`` if one of the methods is not used.

We use the name ``componentFacadeTestLib`` to standardize the calls to ``verifyFacadeProvidesBehaviorCallbacks`` and ``registerBehaviorTestCombinations``. The file ``tests-api`` is auto-generated by Grunt from the ``package.json`` file.

### Test API Contract ###

First, we write a contract. These are the behaviors that we expect this component to have, regardless of its facade. These will be things like
* There is a way to create the component
* There is a way to destroy the component
* There is a way to change a selection
* There is a way to click an item

This should be mostly human-readable and exist as a comment block. When writing the test API for a given facade, refer to this contract.

### Verify Test API ###

Next we check that each facade provided the expected behaviors by calling ``verifyFacadeProvidesBehaviorCallbacks``. This is technically a test of the test suite, but gives us a higher level of confidence that tests were actually written and (hopefully) make sense.

**All behaviors should be listed in the ``verifyFacadeProvidesBehaviorCallbacks`` call.**

### Define Behavior Tests ###

Then we use ``registerBehaviorTestCombinations`` to describe the behaviors we want to test in combination with each other, and list the behaviors we will need to be able perform those tests.

Within each call to ``registerBehaviorTestCombinations`` can be multiple levels of ``describe()`` and ``it()`` tests. Each of them should use the value passed as ``testingBehaviorHandlers`` to interact with the component. **DO NOT INTERACT WITH THE COMPONENT DIRECTLY.**

This is where the behavioral tests begin. We might want to check that on click, the component changes color. This is a test of the component's behavior. These should be abstract enough to be agnostic of facade, but concrete enough to be meaningful.

We expect to find these kinds of behavioral tests:
* validating that the DOM elements produced match the component's expectations (for CSS styling and ability to apply a theme override)
* validating that the component reacts correctly when interacted with via the DOM
* validating that the component reacts correctly when interacted with by the application (via the facade's API)

Where possible, you should create both positive and negative tests. For example:
* Test 1: Call ``testingBehaviorHandlers.clickComponent(component)`` and verify that something changed
* Test 2: Disable component by calling ``testingBehaviorHandlers.disable(component)``, then call ``testingBehaviorHandlers.clickComponent(component)`` and verify that nothing changed

This will help enforce reusable test API methods. Note that both Test 1 and Test 2 in the example called the same behavior method of ``clickComponent``. If a facade short-circuited the method to change something instead of simulating a click, then Test 2 would very likely fail, exposing the bad test API method.

## Test API ##

```javascript
// tests/jquery/sample-test.js

// Write any API-specific Mocha tests here

export const behaviorHandlers = {
	createComponent: {
		approach1: function (initData) {
			// Via widget interface
			$(initData.container).sample();
			return $(initData.container).data('sample');
		},

		approach2: function () {
			// Direct
			const control = new Sample({ el: initData.container });
			return control;
		}
	},

	getComponentElement: {
		default: function (component) {
			// component returned from createComponent is always the instantiated class, and element is aliased on that class
			return component.el;
		}
	},

	destroyComponent: {
		default: function (component) {
			// Via widget interface
			$(component.el).sample('destroy');
		},

		direct: function (component) {
			// Direct
			component.destroy();
		}
	}
};
```

### API-specific tests ###

Sometimes you may want to test a particular aspect of a component which is specific to a given facade. Within that facade's test file for that component, feel free to test what you like. In the sample above where it says, "Write any API-specific Mocha tests here", you might put something like this:

```javascript
describe('Sample Component for jQuery', function () {
	describe('declarative instantiation', function () {
		it('should have already initialized elements with data-initialize="sample"', function () {
			expect($('#testElement').data('sample')).to.be.an('object');
		});
	});
});
```

This test is specific to the declarative instantiation format for jQuery. It would not be applicable to React or Marionette, and it cannot be tested separate from the page load, so running a single test immediately against a given element (which presumably was placed along with ``data-initialize="sample"`` into the DOM as part of the test page).

This can be anything you think is important to test about the specific implementation of this component for this facade.

These tests should not cover behavior driven interactions, such as clicking, making API calls, or otherwise doing things that would happen "outside" the component.

### export ``behaviorHandlers`` ###

For each combination of facade and component there should be an exported ``behaviorHandlers`` object, which gets imported into that component's behavior tests. The object follows this generic format:

```javascript
behaviorHandlers = {
	BEHAVIOR_NAME: {
		APPROACH_NAME: CALLBACK_FUNCTION
	}
}
```

Each ``behaviorHandlers`` object should contain at least one of each defined behavior. Any missing behaviors will result in an error when running the tests.

The ``BEHAVIOR_NAME`` comes from the contract defined by the behavior tests file.

#### Approaches ####

We added the concept of "approaches" for a behavior, because some facades have more than one way of doing a thing. For example, in jQuery you might be able to execute a method using the widget syntax ``$(...).componentName('methodName')`` **or** execute the same method directly on the instantiated component ``$(...).data('componentName').methodName()``. When we execute our tests, we want to make sure that both approaches to the same behavior achieve the same goal. This is where the power of the ``registerBehaviorTestCombinations`` method is exposed.

Say you have three approaches for creating a component (call these ``A1``, ``A2``, and ``A3``) , and three approaches for destroying it (call these ``D1``, ``D2``, and ``D3``). Your ``behaviorHandlers`` object would look something like this:

```javascript
export const behaviorHandlers = {
	createComponent: {
		A1: function(...) { ... },
		A2: function(...) { ... },
		A3: function(...) { ... },
	}

	destroyComponent: {
		D1: function(...) { ... },
		D2: function(...) { ... },
		D3: function(...) { ... },
	}
};

```

If you made the following call in your behavior tests:

```javascript
describe('Sample Component', function () {
	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'createComponent',
		'destroyComponent'
	], [
		// other behaviors required for tests
	], function (testingBehaviorHandlers) {
		it('should narfle the garthok when created and then destroyed', function () {
			const component = testingBehaviorHandlers.createComponent();
			testingBehaviorHandlers.destoryComponent(component);
			assert(component.garthok.isNarfled());
		});
	});
});
```

You would end up with the following tests in Mocha:
* Sample Component
	* Using ``A1`` for ``createComponent``
		* Using ``D1`` for destroyComponent
			* should narfle the garthok when created and then destroyed
		* Using ``D2`` for destroyComponent
			* should narfle the garthok when created and then destroyed
		* Using ``D3`` for destroyComponent
			* should narfle the garthok when created and then destroyed
	* Using ``A2`` for ``createComponent``
		* Using ``D1`` for destroyComponent
			* should narfle the garthok when created and then destroyed
		* Using ``D2`` for destroyComponent
			* should narfle the garthok when created and then destroyed
		* Using ``D3`` for destroyComponent
			* should narfle the garthok when created and then destroyed
	* Using ``A3`` for ``createComponent``
		* Using ``D1`` for destroyComponent
			* should narfle the garthok when created and then destroyed
		* Using ``D2`` for destroyComponent
			* should narfle the garthok when created and then destroyed
		* Using ``D3`` for destroyComponent
			* should narfle the garthok when created and then destroyed

As you can see, this potentially results in **many** tests. This is why **it is very important to only list the behaviors that you are actually testing**, instead of wrapping all of your tests in a one giant call to ``registerBehaviorTestCombinations``.

If you need to **use** a behavior to help you test a different behavior, then you probably don't want this multiplicative effect. Therefore you should use the ``usedBehaviorNames`` parameter of ``registerBehaviorTestCombinations``.

```javascript
describe('Sample Component', function () {
	registerBehaviorTestCombinations(componentFacadeTestLib, [
		// behaviors being tested
		'destroyComponent'
	], [
		// other behaviors required for tests
		'createComponent'
	], function (testingBehaviorHandlers) {
		it('should narfle the garthok WHEN DESTROYED', function () {
			const component = testingBehaviorHandlers.createComponent();
			testingBehaviorHandlers.destoryComponent(component);
			assert(component.garthok.isNarfled());
		});
	});
});
```

In this scenario, you would see the following tests registered with Mocha:
* Sample Component
	* Using ``D1`` for ``destroyComponent``
		* should narfle the garthok when created and then destroyed
	* Using ``D2`` for ``destroyComponent``
		* should narfle the garthok when created and then destroyed
	* Using ``D3`` for ``destroyComponent``
		* should narfle the garthok when created and then destroyed

Wait! Where did ``createComponent`` go? Any behavior which you specify as required but not being tested will use either the approach named ``default`` (if there is one), or else the **first** approach listed, which in this case would be ``A1``. It's not considered relevant to the test, since they should all result in a component with the same state, so it is not listed using ``describe()``.