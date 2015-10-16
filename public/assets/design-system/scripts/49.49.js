webpackJsonp([49],{

/***/ 666:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _siteIndexJsx = __webpack_require__(667);

	var _siteIndexJsx2 = _interopRequireDefault(_siteIndexJsx);

	exports['default'] = _react2['default'].cloneElement(_siteIndexJsx2['default'], { 'url': '/' });
	module.exports = exports['default'];

/***/ },

/***/ 667:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var _app_modulesSiteComponentsCtaLink = __webpack_require__(1);

	var _app_modulesSiteComponentsCtaLink2 = _interopRequireDefault(_app_modulesSiteComponentsCtaLink);

	var _app_modulesUiSvgIcon = __webpack_require__(309);

	var _app_modulesUiSvgIcon2 = _interopRequireDefault(_app_modulesUiSvgIcon);

	var _app_modulesSiteComponentsPageBody = __webpack_require__(221);

	var _app_modulesSiteComponentsPageBody2 = _interopRequireDefault(_app_modulesSiteComponentsPageBody);

	var _generatedSiteVersion = __webpack_require__(316);

	var _generatedSiteVersion2 = _interopRequireDefault(_generatedSiteVersion);

	var _app_modulesSiteComponentsDynamicShapes = __webpack_require__(668);

	var _app_modulesSiteComponentsDynamicShapes2 = _interopRequireDefault(_app_modulesSiteComponentsDynamicShapes);

	var _app_modulesSitePreferencesComponent = __webpack_require__(317);

	var _app_modulesSitePreferencesComponent2 = _interopRequireDefault(_app_modulesSitePreferencesComponent);

	var _app_modulesGlobal = __webpack_require__(182);

	var _app_modulesGlobal2 = _interopRequireDefault(_app_modulesGlobal);

	var _app_modulesUiUtilComponent = __webpack_require__(174);

	var SHAPES_X = 1170;
	var SHAPES_Y = 330;

	var Overview = (function (_React$Component) {
	  function Overview(props) {
	    _classCallCheck(this, Overview);

	    _get(Object.getPrototypeOf(Overview.prototype), 'constructor', this).call(this, props);

	    this.state = {
	      mouse: { x: 500, y: 10 }
	    };
	  }

	  _inherits(Overview, _React$Component);

	  _createClass(Overview, [{
	    key: 'onMouseMove',
	    value: function onMouseMove(e) {
	      if (e && e.pageX && e.pageY) {
	        this.setState({
	          mouse: { x: e.pageX, y: e.pageY }
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { onMouseMove: this.onMouseMove.bind(this) },
	        _react2['default'].createElement(
	          'header',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('site-masthead--landing p-around--xx-large container--buffer') },
	          _react2['default'].createElement(
	            'h1',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('site-text-heading--large') },
	            'Lightning ',
	            _react2['default'].createElement(
	              'span',
	              { className: 'text-no-wrap' },
	              'Design System'
	            )
	          ),
	          _react2['default'].createElement(
	            'h2',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('site-text-heading--medium m-bottom--xx-large') },
	            'Create the world’s best enterprise app experiences.'
	          ),
	          _react2['default'].createElement(
	            _app_modulesSitePreferencesComponent2['default'],
	            { role: 'regular' },
	            _react2['default'].createElement(
	              'p',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('site-cta-buttons m-bottom--medium') },
	              _react2['default'].createElement(
	                _app_modulesSiteComponentsCtaLink2['default'],
	                { href: '/getting-started', className: (0, _app_modulesUiUtilComponent.prefix)('button button--neutral site-cta-tutorial'),
	                  ctaEventName: 'tutorials-top' },
	                'Read Tutorials'
	              ),
	              ' ',
	              _react2['default'].createElement(
	                _app_modulesSiteComponentsCtaLink2['default'],
	                { href: '/resources/downloads',
	                  className: (0, _app_modulesUiUtilComponent.prefix)('button button--neutral button-space-left site-cta-download'), ctaEventName: 'downloads-top' },
	                'Get Design System'
	              )
	            )
	          ),
	          _react2['default'].createElement(
	            'p',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('m-bottom--medium') },
	            'Current release: ',
	            _react2['default'].createElement(
	              _app_modulesSiteComponentsCtaLink2['default'],
	              { href: '/release-notes', ctaEventName: 'release-notes-top' },
	              _generatedSiteVersion2['default'].sldsVersion
	            )
	          )
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: (0, _app_modulesUiUtilComponent.prefix)('container--buffer container--large') },
	          _react2['default'].createElement(
	            'section',
	            { className: (0, _app_modulesUiUtilComponent.prefix)('site-grid--landing p-vertical--xx-large site-text-longform') },
	            _react2['default'].createElement(
	              'ul',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('grid wrap grid--pull-padded-large site-grid--landing-primary') },
	              _react2['default'].createElement(
	                'li',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large p-vertical--xx-large clearfix') },
	                _react2['default'].createElement(
	                  'p',
	                  { className: (0, _app_modulesUiUtilComponent.prefix)('size--1-of-1 medium-size--1-of-2 float--right') },
	                  _react2['default'].createElement('img', { className: 'image', src: '/assets/images/landing/img-icon-group.svg', alt: 'Image of a grouping of icons' })
	                ),
	                _react2['default'].createElement(
	                  'dl',
	                  { className: (0, _app_modulesUiUtilComponent.prefix)('medium-size--1-of-2') },
	                  _react2['default'].createElement(
	                    'dt',
	                    { className: 'site-text-heading--large' },
	                    'Style with Ease'
	                  ),
	                  _react2['default'].createElement(
	                    'dd',
	                    null,
	                    'With the Design System you can build custom applications with a look and feel that is consistent with Salesforce core features — without reverse engineering our styles! Simply download our platform-agnostic CSS framework and get started today.'
	                  )
	                )
	              ),
	              _react2['default'].createElement(
	                'li',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large p-vertical--xx-large clearfix') },
	                _react2['default'].createElement(
	                  'p',
	                  { className: (0, _app_modulesUiUtilComponent.prefix)('size--1-of-1 medium-size--1-of-2 float--left') },
	                  _react2['default'].createElement('img', { className: 'image', src: '/assets/images/landing/img-expertise.svg', alt: 'Image for designing with expertise' })
	                ),
	                _react2['default'].createElement(
	                  'dl',
	                  { className: (0, _app_modulesUiUtilComponent.prefix)('medium-size--1-of-2 float--right') },
	                  _react2['default'].createElement(
	                    'dt',
	                    { className: 'site-text-heading--large' },
	                    'Design with Expertise'
	                  ),
	                  _react2['default'].createElement(
	                    'dd',
	                    null,
	                    'Utilize our detailed guidelines to confidently design excellent apps that fit right into the Salesforce ecosystem. With the Design System, you get access to all of the Salesforce core visual and interaction design patterns so that you can follow established best practices and build apps that have a consistent look and feel with the Salesforce user experience.'
	                  )
	                )
	              )
	            ),
	            _react2['default'].createElement(
	              'ul',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('grid wrap grid--align-spread grid--pull-padded-large') },
	              _react2['default'].createElement(
	                'li',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large size--1-of-1 large-size--1-of-3') },
	                _react2['default'].createElement(
	                  'figure',
	                  { className: 'grid-card' },
	                  _react2['default'].createElement('img', { src: '/assets/images/landing/icon-trust.svg', alt: 'Trustworthy Image' }),
	                  _react2['default'].createElement(
	                    'figcaption',
	                    null,
	                    _react2['default'].createElement(
	                      'dl',
	                      null,
	                      _react2['default'].createElement(
	                        'dt',
	                        { className: 'site-text-heading--label-weak-large' },
	                        'Trustworthy'
	                      ),
	                      _react2['default'].createElement(
	                        'dd',
	                        null,
	                        _react2['default'].createElement('hr', { className: 'hr hr--orange' }),
	                        'We’ve put the design system through its paces. We’ve engaged in thousands of hours of user research, and tested the system in all of the same browsers that the Lightning Experience supports.\u2028'
	                      )
	                    )
	                  )
	                )
	              ),
	              _react2['default'].createElement(
	                'li',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large size--1-of-1 large-size--1-of-3') },
	                _react2['default'].createElement(
	                  'figure',
	                  { className: 'grid-card' },
	                  _react2['default'].createElement('img', { src: '/assets/images/landing/icon-platform.svg', alt: 'Platform-Agnostic Image' }),
	                  _react2['default'].createElement(
	                    'figcaption',
	                    null,
	                    _react2['default'].createElement(
	                      'dl',
	                      null,
	                      _react2['default'].createElement(
	                        'dt',
	                        { className: 'site-text-heading--label-weak-large' },
	                        'Platform-Agnostic'
	                      ),
	                      _react2['default'].createElement(
	                        'dd',
	                        null,
	                        _react2['default'].createElement('hr', { className: 'hr hr--purple' }),
	                        'You can use our CSS framework with any technology stack you can dream up. Additionally, we provide guidance around how to use it in conjunction with Salesforce technologies such as Lightning, Visualforce, and Heroku.\u2028'
	                      )
	                    )
	                  )
	                )
	              ),
	              _react2['default'].createElement(
	                'li',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large size--1-of-1 large-size--1-of-3') },
	                _react2['default'].createElement(
	                  'figure',
	                  { className: 'grid-card' },
	                  _react2['default'].createElement('img', { src: '/assets/images/landing/icon-living.svg', alt: 'Living Design System Image' }),
	                  _react2['default'].createElement(
	                    'figcaption',
	                    null,
	                    _react2['default'].createElement(
	                      'dl',
	                      null,
	                      _react2['default'].createElement(
	                        'dt',
	                        { className: 'site-text-heading--label-weak-large' },
	                        'Living'
	                      ),
	                      _react2['default'].createElement(
	                        'dd',
	                        null,
	                        _react2['default'].createElement('hr', { className: 'hr hr--pink' }),
	                        'The Salesforce UX team actively designs, develops, tests, and maintains the design system. As Salesforce pushes out UI changes with every release, the design system stays seamlessly in sync.\u2028'
	                      )
	                    )
	                  )
	                )
	              )
	            )
	          ),
	          _react2['default'].createElement(
	            _app_modulesSitePreferencesComponent2['default'],
	            { role: 'regular' },
	            _react2['default'].createElement(
	              'footer',
	              { className: (0, _app_modulesUiUtilComponent.prefix)('site-resources--landing p-vertical--xx-large') },
	              _react2['default'].createElement(
	                'ul',
	                { className: (0, _app_modulesUiUtilComponent.prefix)('grid wrap grid--align-spread grid--pull-padded-large') },
	                _react2['default'].createElement(
	                  'li',
	                  { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large size--1-of-1 large-size--1-of-2') },
	                  _react2['default'].createElement(
	                    'div',
	                    { className: 'grid-card' },
	                    _react2['default'].createElement(
	                      'div',
	                      { className: (0, _app_modulesUiUtilComponent.prefix)('grid grid--align-spread') },
	                      _react2['default'].createElement(
	                        'h3',
	                        { className: (0, _app_modulesUiUtilComponent.prefix)('site-text-heading--label-weak-large align-middle'), id: 'downloads-header' },
	                        'Downloads'
	                      ),
	                      _react2['default'].createElement('img', { src: '/assets/images/landing/icon-download.svg', alt: 'Downloads' })
	                    ),
	                    _react2['default'].createElement('hr', { className: 'hr hr--pink' }),
	                    _react2['default'].createElement(
	                      'p',
	                      null,
	                      'Get all of the pieces of the ',
	                      _app_modulesGlobal2['default'].displayName,
	                      ', including our icons, fonts, and CSS framework.'
	                    ),
	                    _react2['default'].createElement(
	                      _app_modulesSiteComponentsCtaLink2['default'],
	                      { 'aria-describedby': 'downloads-header', className: (0, _app_modulesUiUtilComponent.prefix)('button button--neutral m-top--large'), href: '/resources/downloads', ctaEventName: 'downloads-bottom' },
	                      'Learn More'
	                    )
	                  )
	                ),
	                _react2['default'].createElement(
	                  'li',
	                  { className: (0, _app_modulesUiUtilComponent.prefix)('col--padded-large size--1-of-1 large-size--1-of-2') },
	                  _react2['default'].createElement(
	                    'div',
	                    { className: 'grid-card' },
	                    _react2['default'].createElement(
	                      'div',
	                      { className: (0, _app_modulesUiUtilComponent.prefix)('grid grid--align-spread') },
	                      _react2['default'].createElement(
	                        'h3',
	                        { className: (0, _app_modulesUiUtilComponent.prefix)('site-text-heading--label-weak-large align-middle'), id: 'tutorials-header' },
	                        'Tutorials'
	                      ),
	                      _react2['default'].createElement('img', { src: '/assets/images/landing/icon-tutorial.svg', alt: 'Tutorials' })
	                    ),
	                    _react2['default'].createElement('hr', { className: 'hr hr--orange' }),
	                    _react2['default'].createElement(
	                      'p',
	                      null,
	                      'Learn best practices, tips and tricks on how to use, customize, and implement the ',
	                      _app_modulesGlobal2['default'].displayName,
	                      '.'
	                    ),
	                    _react2['default'].createElement(
	                      _app_modulesSiteComponentsCtaLink2['default'],
	                      { 'aria-describedby': 'tutorials-header', className: (0, _app_modulesUiUtilComponent.prefix)('button button--neutral m-top--large'), href: '/getting-started', ctaEventName: 'tutorials-bottom' },
	                      'Learn More'
	                    )
	                  )
	                )
	              )
	            )
	          )
	        ),
	        _react2['default'].createElement(_app_modulesSiteComponentsDynamicShapes2['default'], { x: SHAPES_X, y: SHAPES_Y, mouseX: this.state.mouse.x, mouseY: this.state.mouse.y })
	      );
	    }
	  }]);

	  return Overview;
	})(_react2['default'].Component);

	exports['default'] = _react2['default'].createElement(
	  _app_modulesSiteComponentsPageBody2['default'],
	  { contentClassName: 'site-landing-page' },
	  _react2['default'].createElement(Overview, null)
	);
	module.exports = exports['default'];
	/* Hero */ /* Grid */ /* This comes after opensource
	                      <li className={pf('col--padded-large p-vertical--xx-large clearfix')}>
	                       <p className={pf('size--1-of-1 medium-size--1-of-2 float--right')}>
	                         <img className="image" src="/assets/images/landing/img-opensource.svg" alt="Image of open source code" />
	                       </p>
	                       <dl className={pf('medium-size--1-of-2')}>
	                         <dt className={pf('text-heading--large')}>Contribute with Purpose</dt>
	                         <dd>The Design System is an open source project on GitHub, meaning you can directly impact its evolution by filing issues and submitting pull requests.. This is as much your tool as it is ours, and we look forward to collaborating with developers and partners on making it even better.</dd>
	                       </dl>
	                      </li>*/ /* Resources */ /* Shapes */

/***/ },

/***/ 668:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _inherits = __webpack_require__(2)['default'];

	var _get = __webpack_require__(241)['default'];

	var _createClass = __webpack_require__(7)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _defineProperty = __webpack_require__(248)['default'];

	var _Object$defineProperty = __webpack_require__(8)['default'];

	var _interopRequireDefault = __webpack_require__(18)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _react = __webpack_require__(19);

	var _react2 = _interopRequireDefault(_react);

	var NEG_HALF_PI = Math.PI / -2;
	var HALF_PI = Math.PI / 2;
	var PI = Math.PI;
	var TAU = Math.PI * 2;
	var GRAY = '#dddddd';
	var LIGHT_STRENGTH = 0.6;

	var DynamicShapes = (function (_React$Component) {
	  function DynamicShapes(props) {
	    _classCallCheck(this, DynamicShapes);

	    _get(Object.getPrototypeOf(DynamicShapes.prototype), 'constructor', this).call(this, props);

	    // Angles are in radians but below are shown in degrees because
	    // it's easier to type nnn/360. 0 rad = 0 deg = right. 1/2 PI =
	    // 90 deg = up. PI = 180 deg = left. PI 1 1/2 = 270 deg = down.
	    //
	    // left/top/width/height: The center point and size of the shape.
	    // light: The full-strength color of the face in light. Will be
	    //     multiplied by LIGHT_STRENGTH.
	    // baseFillsAngles: Tuples per face in the format
	    //     [red, green, blue, angle of face]
	    // fills: DO NOT SET -- updated with current mouse position.

	    this.state = {
	      bal: {
	        left: -90, top: -207, width: 130, height: 130,
	        light: [248, 202, 114],
	        baseFillsAngles: [[214, 123, 44, TAU * 26 / 360], [234, 153, 49, TAU * 26 / 360], [234, 153, 49, TAU * 206 / 360], [214, 123, 44, TAU * 206 / 360]],
	        fills: [null, null, null, null]
	      },
	      cub: {
	        left: -262, top: -107, width: 250, height: 250,
	        light: [204, 208, 253],
	        baseFillsAngles: [[119, 121, 203, TAU * 344 / 360], [119, 121, 203, TAU * 150 / 360], [119, 121, 203, TAU * 250 / 360]],
	        // baseFillsAngles: [[105, 108, 180, TAU * 344 / 360], [119, 121, 203, TAU * 150 / 360], [131, 132, 227, TAU * 250 / 360]],
	        fills: [null, null, null]
	      },
	      dten: {
	        left: 280, top: -284, width: 128, height: 128,
	        light: [243, 189, 207],
	        baseFillsAngles: [[233, 114, 147, TAU * 334 / 360], [233, 114, 147, TAU * 152 / 360], [233, 114, 147, TAU * 206 / 360]],
	        // baseFillsAngles: [[192, 76, 118, TAU * 334 / 360], [239, 114, 153, TAU * 152 / 360], [211, 84, 123, TAU * 206 / 360]],
	        fills: [null, null, null]
	      },
	      rect: {
	        left: 140, top: -120, width: 110, height: 110,
	        light: [149, 244, 226],
	        baseFillsAngles: [[76, 162, 152, TAU * 330 / 360], [87, 187, 176, TAU * 118 / 360], [101, 207, 195, TAU * 240 / 360]],
	        fills: [null, null, null]
	      },
	      tri: {
	        left: -77, top: -282, width: 160, height: 160,
	        light: [151, 236, 185],
	        baseFillsAngles: [[80, 161, 120, TAU * 0 / 360], [80, 161, 120, TAU * 120 / 360], [80, 161, 120, TAU * 240 / 360]],
	        // baseFillsAngles: [[72, 145, 108, TAU * 0 / 360], [80, 161, 120, TAU * 120 / 360], [90, 183, 134, TAU * 240 / 360]],
	        fills: [null, null, null]
	      }
	    };
	  }

	  _inherits(DynamicShapes, _React$Component);

	  _createClass(DynamicShapes, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updateLightning();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      this.updateLightning(props);
	    }
	  }, {
	    key: 'getIlluminatedRGB',

	    // Angles in radians. Intensity is mixing amount multiplied by
	    // global LIGHT_STRENGTH.
	    value: function getIlluminatedRGB(baseR, baseG, baseB, baseAngle, lightR, lightG, lightB, lightAngle) {
	      var angleDiff = lightAngle - baseAngle;
	      var mix = Math.cos(angleDiff) * LIGHT_STRENGTH;

	      function mixLR(a, b, mix) {
	        return Math.floor(a + (b - a) * mix);
	      }

	      return 'rgb(' + mixLR(baseR, lightR, mix) + ', ' + mixLR(baseG, lightG, mix) + ', ' + mixLR(baseB, lightB, mix) + ')';
	    }
	  }, {
	    key: 'updateLightning',
	    value: function updateLightning(overrideProps) {
	      var _this = this;

	      var _ref = overrideProps || this.props;

	      var x = _ref.x;
	      var y = _ref.y;
	      var mouseX = _ref.mouseX;
	      var mouseY = _ref.mouseY;

	      ['tri', 'cub', 'bal', 'dten', 'rect'].forEach(function (shapeName) {
	        var shape = _this.state[shapeName];
	        var deltaX = mouseX - (x + shape.left + shape.width / 2);
	        var deltaY = mouseY - (y + shape.top + shape.height / 2);
	        var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

	        // Ultimate angle is 0 to absolute right, PI/2 to top, PI to absolute left,
	        // PI*3/2 to bottom. Subtract PI/2 because atan2() overrotates.
	        var angle = Math.atan2(deltaX, deltaY) - HALF_PI;
	        var light = shape.light;
	        shape.baseFillsAngles.forEach(function (rgbA, idx) {
	          _this.state[shapeName].fills[idx] = _this.getIlluminatedRGB(rgbA[0], rgbA[1], rgbA[2], rgbA[3], light[0], light[1], light[2], angle);
	        });

	        _this.setState(_defineProperty({}, shapeName, _this.state[shapeName]));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: 'site-shapes', style: { width: 1, height: 1, position: 'absolute', left: this.props.x, top: this.props.y } },
	        _react2['default'].createElement(
	          'svg',
	          { x: '0px', y: '0px', viewBox: '0 0 100 100', 'enable-background': 'new 0 0 100 100', style: {
	              position: 'absolute', top: this.state.tri.top, left: this.state.tri.left,
	              width: this.state.tri.width, height: this.state.tri.height,
	              animation: 'floater 24s ease-out .5s infinite'
	            } },
	          _react2['default'].createElement('path', { id: 'tri240', fill: this.state.tri.fills[2] || GRAY, d: 'M90.8,0.5c-1-0.6-2.3-0.6-3.3,0L6.6,47.3c-1,0.6-1.6,1.6-1.6,2.8s0.6,2.2,1.6,2.8l80.9,46.7 c1,0.6,2.3,0.6,3.3,0s1.6-1.6,1.6-2.8V3.3C92.4,2.1,91.8,1.1,90.8,0.5z' }),
	          _react2['default'].createElement('path', { id: 'tri120', fill: this.state.tri.fills[1] || GRAY, d: 'M90.8,0.5L90.8,0.5c-1-0.6-2.3-0.6-3.3,0L6.6,47.3c-1,0.6-1.6,1.6-1.6,2.8 c28,0,57.2,0,57.2,0L90.8,0.5z' }),
	          _react2['default'].createElement('path', { id: 'tri0', fill: this.state.tri.fills[0] || GRAY, d: 'M62.2,50.1c0,0,14.6-25.3,28.6-49.6c1,0.6,1.6,1.7,1.6,2.8v93.5c0,1.2-0.6,2.2-1.6,2.8 l0,0L62.2,50.1z' })
	        ),
	        _react2['default'].createElement(
	          'svg',
	          { x: '0px', y: '0px', viewBox: '0 0 100 100', 'enable-background': 'new 0 0 100 100', style: {
	              position: 'absolute', top: this.state.cub.top, left: this.state.cub.left,
	              width: this.state.cub.width, height: this.state.cub.height,
	              animation: 'floater 32s ease-out .5s infinite'
	            } },
	          _react2['default'].createElement('path', { id: 'cub240', fill: this.state.cub.fills[2] || GRAY, d: 'M95.2,30.3c0.1-0.8-0.3-1.6-0.9-2L51.6,0.4c-0.5-0.3-1-0.4-1.5-0.3l0,0c-0.3,0.1-0.7,0.3-0.9,0.5L13.9,31.2 c-0.3,0.3-0.5,0.7-0.6,1.1L4.8,69l0,0v0.2C4.6,70,5,70.9,5.7,71.3l43.8,28.4c0.3,0.2,0.6,0.3,1,0.3s0.8-0.1,1.2-0.4L88,73.8 c0.2-0.1,0.3-0.3,0.4-0.4l0,0c0.2-0.3,0.3-0.6,0.4-0.9L95.2,30.3z' }),
	          _react2['default'].createElement('path', { id: 'cub120', fill: this.state.cub.fills[1] || GRAY, d: 'M39.8,41.2L50.1,0.1c-0.3,0.1-0.7,0.3-0.9,0.5L13.9,31.2c-0.3,0.3-0.5,0.7-0.6,1.1L4.8,69 L39.8,41.2z' }),
	          _react2['default'].createElement('path', { id: 'cub0', fill: this.state.cub.fills[0] || GRAY, d: 'M94.3,28.3L51.6,0.4c-0.5-0.3-1-0.4-1.5-0.3L39.8,41.2l48.6,32.2c0.2-0.3,0.3-0.6,0.4-0.9 l6.4-42.2C95.3,29.5,94.9,28.7,94.3,28.3z' })
	        ),
	        _react2['default'].createElement(
	          'svg',
	          { x: '0px', y: '0px', viewBox: '0 0 100 100', 'enable-background': 'new 0 0 100 100', style: {
	              position: 'absolute', top: this.state.dten.top, left: this.state.dten.left,
	              width: this.state.dten.width, height: this.state.dten.height,
	              animation: 'floater-2 24s ease-out infinite'
	            } },
	          _react2['default'].createElement('path', { id: 'dtenCenter', fill: 'rgb(233, 114, 147)', d: 'M99.6,41.8L69.9,3.5c-0.2-0.2-0.3-0.3-0.6-0.5c-0.1,0-0.2-0.1-0.3-0.1c-0.3-0.1-0.7-0.1-1-0.1L20,9.3 c-0.7,0.1-1.3,0.6-1.6,1.3L0.1,55.4C0.1,55.6,0,55.8,0,56c0,0.1,0,0.2,0,0.3c0,0.4,0.2,0.8,0.4,1.1L30,95.7c0.4,0.5,1,0.8,1.6,0.8 c0.1,0,0.2,0,0.3,0l48-6.5c0.4-0.1,0.6-0.2,0.9-0.4c0.1,0,0.1-0.1,0.1-0.1c0.2-0.2,0.5-0.6,0.6-0.9l18.3-44.8 C100.1,43.2,100,42.4,99.6,41.8z' }),
	          _react2['default'].createElement('path', { id: 'dtenc', fill: this.state.dten.fills[2] || GRAY, d: 'M0,56.3c0,0.4,0.2,0.8,0.4,1.1L30,95.7c0.4,0.5,1,0.8,1.6,0.8c0.1,0,0.2,0,0.3,0l48-6.5 c0.4-0.1,0.6-0.2,0.9-0.4L0,56.3z' }),
	          _react2['default'].createElement('path', { id: 'dtena', fill: this.state.dten.fills[0] || GRAY, d: 'M99.6,41.8L69.9,3.5c-0.2-0.2-0.3-0.3-0.6-0.5l11.6,86.5c0.2-0.2,0.5-0.6,0.6-0.9l18.3-44.8 C100.1,43.2,100,42.4,99.6,41.8z' }),
	          _react2['default'].createElement('path', { id: 'dtenb', fill: this.state.dten.fills[1] || GRAY, d: 'M69,2.9c-0.3-0.1-0.7-0.1-1-0.1L20,9.3c-0.7,0.1-1.3,0.6-1.6,1.3L0.1,55.4C0.1,55.6,0,55.8,0,56 L69,2.9z' })
	        ),
	        _react2['default'].createElement(
	          'svg',
	          { x: '0px', y: '0px', viewBox: '0 0 100 100', 'enable-background': 'new 0 0 100 100', style: {
	              position: 'absolute', top: this.state.rect.top, left: this.state.rect.left,
	              width: this.state.rect.width, height: this.state.rect.height,
	              animation: 'floater 24s ease-out .5s infinite'
	            } },
	          _react2['default'].createElement('path', { fill: this.state.rect.fills[2] || GRAY, d: 'M94.2,65.2L83.6,14.1c-0.1-0.2-0.2-0.5-0.3-0.6c-0.3-0.7-0.9-1.2-1.7-1.4l-52.4-12c-1.1-0.3-2.2,0.3-2.8,1.3L0.3,52 c-0.1,0.3-0.2,0.6-0.3,0.8c-0.1,0.8,0.2,1.6,0.8,2.2l40.6,35.9c0.3,0.3,0.6,0.4,1,0.5l31.4,8.6c0.2,0.1,0.4,0.1,0.7,0.1 s0.7-0.1,1-0.2l0,0c0.5-0.2,0.9-0.6,1.2-1.1L94,66.9C94.2,66.3,94.3,65.8,94.2,65.2z' }),
	          _react2['default'].createElement('path', { fill: this.state.rect.fills[0] || GRAY, d: 'M94.2,65.2L83.6,14.1c0-0.2-0.1-0.4-0.2-0.5l-30.1,52l22.2,34.3c0.5-0.2,0.9-0.6,1.2-1.1 L94,66.9C94.2,66.3,94.3,65.8,94.2,65.2z' }),
	          _react2['default'].createElement('path', { fill: this.state.rect.fills[1] || GRAY, d: 'M53.2,65.5l30.1-52c-0.3-0.7-0.9-1.2-1.7-1.4L29.2,0.1c-1.1-0.3-2.2,0.3-2.8,1.3L0.3,52 c-0.1,0.3-0.2,0.6-0.3,0.8L53.2,65.5z' })
	        )
	      );
	    }
	  }]);

	  return DynamicShapes;
	})(_react2['default'].Component);

	exports['default'] = DynamicShapes;
	module.exports = exports['default'];

/***/ }

});