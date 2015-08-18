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
export function registerTestsForBehaviorCallbacks (componentFacadeTestLib, requiredBehaviorNames) {
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
 * @param {array} requiredBehaviorNames - An array of strings listing the behaviors expected for this component
 * @param {function} registerTestSuiteCallback - A method which receives a specific combination of approaches for the given behaviors and registers the behavioral tests with Mocha
 *   registerTestSuiteCallback(testingBehaviorHandlers)
 *     testingBehaviorHandlers will be an object
 *       the key on the object will be behaviorName
 *       the value on the object will be one of the functions from facadeTestLib.behaviorHandlers[behaviorName]
 */
export function registerBehaviorTestCombinations (componentFacadeTestLib, requiredBehaviorNames, registerTestSuiteCallback) {
	_.each(componentFacadeTestLib, function (facadeTestLib, facadeName) {
		const facadeHandlers = _.clone(facadeTestLib.behaviorHandlers) || {};
		requiredBehaviorNames.forEach(function (behaviorName) {
			facadeHandlers[behaviorName] = facadeHandlers[behaviorName] || {};
		});

		describe('behavior tests for ' + facadeName, function () {
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

			combineHandlers(requiredBehaviorNames, {});
		});
	});
}
