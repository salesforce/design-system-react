define(['exports', 'react', 'prop-types', 'react-dom'], function (exports, _react, _propTypes, _reactDom) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Portal = function (_Component) {
		_inherits(Portal, _Component);

		function Portal(props) {
			_classCallCheck(this, Portal);

			var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, props));

			_this.portalNode = null;
			_this.state = {
				isOpen: false
			};
			return _this;
		}

		_createClass(Portal, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.renderPortal();
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				this.renderPortal();
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.unmountPortal();
			}
		}, {
			key: 'getChildren',
			value: function getChildren() {
				return _react.Children.only(this.props.children);
			}
		}, {
			key: 'getPortalParentNode',
			value: function getPortalParentNode() {
				var element = void 0;
				if (typeof this.props.renderTo === 'string') {
					element = document.querySelector(this.props.renderTo);
				} else {
					element = this.props.renderTo || document.body;
				}
				return element;
			}
		}, {
			key: 'setupPortalNode',
			value: function setupPortalNode() {
				var parentParentNode = this.getPortalParentNode();

				this.portalNode = document.createElement(this.props.renderTag);
				parentParentNode.appendChild(this.portalNode);
				this.portalNodeInstance = this.props.onMount ? this.props.onMount(undefined, { portal: this.portalNode }) : this.portalNode;
			}
		}, {
			key: 'unmountPortal',
			value: function unmountPortal() {
				if (this.portalNode) {
					_reactDom2.default.unmountComponentAtNode(this.portalNode);
					this.portalNode.parentNode.removeChild(this.portalNode);
				}
				this.portalNode = null;
			}
		}, {
			key: 'updatePortal',
			value: function updatePortal() {
				var _this2 = this;

				if (this.props.id) {
					this.portalNode.id = this.props.id;
				}

				if (this.props.className) {
					this.portalNode.className = this.props.className;
				}

				if (this.props.style) {
					Object.keys(this.props.style).forEach(function (key) {
						_this2.portalNode.style[key] = _this2.props.style[key];
					});
				}

				if (this.props.onUpdate) {
					this.portalNodeInstance = this.props.onUpdate(this.portalNodeInstance);
				}
			}
		}, {
			key: 'renderPortal',
			value: function renderPortal() {
				var _this3 = this;

				// if no portal contents, then unmount
				if (!this.getChildren()) {
					this.unmountPortal();
					return;
				}

				if (!this.portalNode) {
					this.setupPortalNode();
				}

				if (this.props.portalMount) {
					this.props.portalMount({
						instance: this,
						reactElement: this.getChildren(),
						domContainerNode: this.portalNode,
						updateCallback: function updateCallback() {
							_this3.updatePortal(); // update after subtree renders
						}
					});
				} else {
					// actual render
					_reactDom2.default.unstable_renderSubtreeIntoContainer(this, this.getChildren(), this.portalNode, function () {
						_this3.updatePortal(); // update after subtree renders

						if (_this3.state.isOpen === false) {
							if (_this3.props.onOpen) {
								_this3.props.onOpen(undefined, { portal: _this3.getChildren() });
							}
							_this3.setState({ isOpen: true });
						}
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return null;
			}
		}]);

		return Portal;
	}(_react.Component);

	Portal.displayName = 'Portal';

	Portal.propTypes = {
		/*
   * What tag to use for the portal, defaults to `div`.
   */
		renderTag: _propTypes2.default.string,
		/*
   * What node the portal is rendered to, defaults to `document.body`.
   */
		renderTo: _propTypes2.default.any,
		/*
   * React id prop.
   */
		id: _propTypes2.default.string,
		/*
   * Accepts a _single_ element or component.
   */
		children: _propTypes2.default.node,
		/*
   * ClassName added to .
   */
		className: _propTypes2.default.any,
		/*
   * An object of styles that are applied to the portal.
   */
		style: _propTypes2.default.object,
		/*
   * Triggers when Portal render tree mounts. Pass in an undefined event and `{ portal: [node] }``
   */
		onMount: _propTypes2.default.func,
		/*
   * Triggers when the portal is mounted.
   */
		onOpen: _propTypes2.default.func,
		/*
   * Triggers when Portal re-renders its tree.
   */
		onUpdate: _propTypes2.default.func,
		/*
   * Triggers when Portal render tree unmounts.
   */
		onUnmount: _propTypes2.default.func,
		/**
   * If a dialog is `positione="overflowBoundaryElement"`, it will be rendered in a portal or separate render tree. This `portalMount` callback will be triggered instead of the the default `ReactDOM.unstable_renderSubtreeIntoContainer` and the function will mount the portal itself. Consider the following code that bypasses the internal mount and uses an Enzyme wrapper to mount the React root tree to the DOM.
   *
   * ```
   * <Popover
   *   isOpen
   *   portalMount={({ instance, reactElement, domContainerNode }) => {
   *     portalWrapper = Enzyme.mount(reactElement, { attachTo: domContainerNode });
   *   }}
   *   onOpen={() => {
   *     expect(portalWrapper.find(`#my-heading`)).to.exist;
   *     done();
   *   }}
   * />
   * ```
   */
		portalMount: _propTypes2.default.func
	};

	Portal.defaultProps = {
		renderTag: 'span',
		renderTo: null,
		onMount: function onMount() {
			return null;
		},
		onOpen: function onOpen() {
			return null;
		},
		onUpdate: function onUpdate() {
			return null;
		},
		onUnmount: function onUnmount() {
			return null;
		}
	};

	exports.default = Portal;
});