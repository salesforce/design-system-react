const _ = require('underscore');
const chai = require('chai');
const expect = chai.expect;

/**
 * This is a facility for registering tests to make sure that the API test
 * libraries export the expected behaviors and approaches for use by the
 * behavior tests
 * @param {object} componentFacadeTestLib - Should be imported from tests/tests-api.js
 * @param {array} requiredBehaviorNames - An array of strings listing the behaviors expected for this component
 */
export function verifyFacadeProvidesBehaviorCallbacks (componentFacadeTestLib, requiredBehaviorNames) {
	_.each(componentFacadeTestLib, function (facadeTestLib, facadeName) {
		const facadeHandlers = facadeTestLib.behaviorHandlers || {};

		describe('behavior test API expectations for ' + facadeName, function () {
			it('should export behaviorHandlers', function () {
				expect(facadeTestLib.behaviorHandlers).to.be.an('object');
			});

			requiredBehaviorNames.forEach(function (behaviorName) {
				describe(behaviorName + ' behavior', function () {
					it('should export a behavior handler object for ' + behaviorName, function () {
						expect(facadeHandlers[behaviorName]).to.be.an('object');
					});

					_.each(facadeHandlers[behaviorName], function (behaviorHandler, approachName) {
						it('approach "' + approachName + '" should be a function', function () {
							expect(behaviorHandler).to.be.a('function');
						});
					});
				});
			});
		});
	});
}

/**
 * This is a facility for registering tests for all combinations of a set of
 * aproaches for a set of behaviors.
 *
 * For example, if you have behaviors A and B, and three approaches for each,
 * you would expect to test these combinations to be tested: A1+B1, A1+B2,
 * A1+B3, A2+B1, A2+B2, A2+B3, A3+B1, A3+B2, A3+B3
 *
 * @param {object} componentFacadeTestLib - Should be imported from tests/tests-api.js
 * @param {array} testingBehaviorNames - An array of strings listing the behaviors expected for this component
 * @param {array} usedBehaviorNames - An array of strings listing the behaviors expected for this component
 * @param {function} registerTestSuiteCallback - A method which receives a specific combination of approaches for the given behaviors and registers the behavioral tests with Mocha
 *   registerTestSuiteCallback(testingBehaviorHandlers)
 *     testingBehaviorHandlers will be an object
 *       the key on the object will be behaviorName
 *       the value on the object will be one of the functions from facadeTestLib.behaviorHandlers[behaviorName]
 */
export function registerBehaviorTestCombinations (componentFacadeTestLib, testingBehaviorNames, usedBehaviorNames, registerTestSuiteCallback) {
	// A quick check of our input to help developers
	if (
		!_.isObject(componentFacadeTestLib)
		|| !_.isArray(testingBehaviorNames)
		|| !testingBehaviorNames.length
		|| !_.isArray(usedBehaviorNames)
		|| !_.isFunction(registerTestSuiteCallback)
	) {
		const err = new Error('invalid call to registerBehaviorTestCombinations');
		err.args = arguments;
		throw err;
	}

	_.each(componentFacadeTestLib, function (facadeTestLib, facadeName) {
		describe('behavior tests for ' + facadeName, function () {
			// Deeply clone down to the approaches, and make sure we have
			// containing objects (even if no approaches were defined)
			const facadeHandlers = _.clone(facadeTestLib.behaviorHandlers) || {};
			testingBehaviorNames.concat(usedBehaviorNames).forEach(function (behaviorName) {
				facadeHandlers[behaviorName] = _.clone(facadeHandlers[behaviorName]) || {};
			});

			let initialBehaviorHandlers;
			try {
				initialBehaviorHandlers = _.reduce(usedBehaviorNames, function (memo, behaviorName) {
					const facadeBehaviorHandlers = facadeHandlers[behaviorName];

					if (facadeBehaviorHandlers.default) {
						memo[behaviorName] = facadeBehaviorHandlers.default;
					} else {
						const approachName = _.first(_.keys(facadeBehaviorHandlers));
						memo[behaviorName] = facadeBehaviorHandlers[approachName];
					}

					if (!memo[behaviorName]) {
						throw new Error(behaviorName);
					}

					return memo;
				}, {});
			} catch (e) {
				it('cannot be tested due to lack of behavior handler object for ' + e.message);
				return;
			}

			function combineHandlers (behaviorsToSelect, previouslySelectedHandlers) {
				const remainingBehaviorsToSelect = _.clone(behaviorsToSelect);
				const behaviorName = remainingBehaviorsToSelect.pop();

				const facadeBehaviorHandlersSize = _.size( facadeHandlers[behaviorName] );
				_.each(facadeHandlers[behaviorName], function (facadeBehaviorHandler, approachName) {
					const selectedHandlers = _.clone(previouslySelectedHandlers) || {};
					selectedHandlers[behaviorName] = facadeBehaviorHandler;

					function handleSelected () {
						if (remainingBehaviorsToSelect.length) {
							combineHandlers(remainingBehaviorsToSelect, selectedHandlers);
						} else {
							registerTestSuiteCallback(selectedHandlers);
						}
					}

					if (facadeBehaviorHandlersSize !== 1) {
						describe('using ' + approachName + ' for ' + behaviorName, handleSelected);
					} else {
						handleSelected();
					}
				});
			}

			combineHandlers(testingBehaviorNames, initialBehaviorHandlers);
		});
	});
}
