"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react3 = require("@storybook/react");

var _constants = require("../../../utilities/constants");

var _appLauncher = require("../../app-launcher");

var _appLauncher2 = _interopRequireDefault(_appLauncher);

var _tile = require("../../app-launcher/tile");

var _tile2 = _interopRequireDefault(_tile);

var _section = require("../../app-launcher/section");

var _section2 = _interopRequireDefault(_section);

var _icon = require("../../icon");

var _icon2 = _interopRequireDefault(_icon);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _search = require("../../input/search");

var _search2 = _interopRequireDefault(_search);

var _globalNavigationBar = require("../../global-navigation-bar");

var _globalNavigationBar2 = _interopRequireDefault(_globalNavigationBar);

var _region = require("../../global-navigation-bar/region");

var _region2 = _interopRequireDefault(_region);

var _iconSettings = require("../../icon-settings");

var _iconSettings2 = _interopRequireDefault(_iconSettings);

var _SLDSSettings = require("../../SLDSSettings");

var _SLDSSettings2 = _interopRequireDefault(_SLDSSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SLDSSettings2.default.setAppElement('#root'); // used by Modal component


var standardTileDemoStyles = {
  width: '20rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem'
};
var smallTileDemoStyles = {
  width: '6rem',
  paddingLeft: '.5rem',
  paddingRight: '.5rem'
};
var DemoAppLauncherTile = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherTile',
  propTypes: {
    search: _propTypes2.default.string,
    size: _propTypes2.default.string
  },
  render: function render() {
    return _react2.default.createElement(_tile2.default, {
      title: "Marketing Cloud",
      iconText: "MC",
      description: "Send emails, track emails, read emails! Emails!",
      href: "https://www.marketingcloud.com/",
      onClick: (0, _react3.action)('Tile clicked! Actual href should be ignored'),
      search: this.props.search,
      size: this.props.size
    });
  }
});
var DemoAppLauncherSmallTile = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherSmallTile',
  render: function render() {
    return _react2.default.createElement(_tile2.default, {
      title: "Journey Builder",
      iconText: "JB",
      size: "small",
      onClick: (0, _react3.action)('Tiny tile clicked!')
    });
  }
});
var DemoAppLauncherTileWithIconNode = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherTileWithIconNode',
  propTypes: {
    search: _propTypes2.default.string,
    size: _propTypes2.default.string
  },
  render: function render() {
    var icon = _react2.default.createElement(_icon2.default, {
      name: "campaign",
      category: "standard",
      size: "large"
    });

    return _react2.default.createElement(_tile2.default, {
      title: "Sales Cloud",
      description: "The primary internal Salesforce org.",
      href: "https://www.salesforce.com/",
      iconNode: icon,
      onClick: (0, _react3.action)('Tile with icon node clicked!'),
      search: this.props.search,
      size: this.props.size
    });
  }
});
var DemoAppLauncherTileWithIconText = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherTileWithIconText',
  propTypes: {
    search: _propTypes2.default.string,
    size: _propTypes2.default.string
  },
  render: function render() {
    return _react2.default.createElement(_tile2.default, {
      title: "Sales Cloud",
      description: "The primary internal Salesforce org.",
      iconText: "SC",
      onClick: (0, _react3.action)('Tile with icon text clicked!'),
      search: this.props.search,
      size: this.props.size
    });
  }
});
var DemoAppLauncherTileWithTruncatedText = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherTileWithTruncatedText',
  propTypes: {
    search: _propTypes2.default.string,
    size: _propTypes2.default.string
  },
  render: function render() {
    return _react2.default.createElement(_tile2.default, {
      title: "Call Center",
      description: "The key to call center and contact center is not to use too many words!",
      iconText: "CC",
      onClick: (0, _react3.action)('Tile with icon text clicked!'),
      search: this.props.search,
      size: this.props.size
    });
  }
});
var DemoAppLauncherTileWithDescriptionHeading = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherTileWithDescriptionHeading',
  propTypes: {
    search: _propTypes2.default.string,
    size: _propTypes2.default.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      search: 'journey'
    };
  },
  render: function render() {
    return _react2.default.createElement(_tile2.default, {
      title: "Journey Builder",
      description: "Build 1:1 journeys blah blah blah and use way too many words",
      descriptionHeading: "Journey Builder",
      iconText: "SC",
      onClick: (0, _react3.action)('Tile with description heading clicked!'),
      search: this.props.search,
      size: this.props.size
    });
  }
});
var DemoAppLauncherTileWithSearchText = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherTileWithSearchText',
  propTypes: {
    search: _propTypes2.default.string,
    size: _propTypes2.default.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      search: 'Call'
    };
  },
  render: function render() {
    return _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, {
      search: this.props.search,
      size: this.props.size
    });
  }
});
var DemoAppLauncherSection = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherSection',
  render: function render() {
    return _react2.default.createElement("div", null, _react2.default.createElement(_section2.default, {
      assistiveText: {
        collapseSection: 'Collapse Section'
      },
      title: "All Items",
      toggleable: true,
      onToggleClick: (0, _react3.action)('Section `All Items` open -->')
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconText, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null)), _react2.default.createElement(_section2.default, {
      title: "All Apps",
      onToggleClick: (0, _react3.action)('Section `All App` open -->')
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null)));
  }
});
var DemoAppLauncherSectionWithSmallTiles = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherSectionWithSmallTiles',
  render: function render() {
    return _react2.default.createElement("div", null, _react2.default.createElement(_section2.default, {
      title: "All Items",
      onToggleClick: (0, _react3.action)('Section `All Items` open -->')
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconText, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null)), _react2.default.createElement(_section2.default, {
      title: "All Apps",
      onToggleClick: (0, _react3.action)('Section `All App` open -->')
    }, _react2.default.createElement(DemoAppLauncherTile, {
      size: "small"
    }), _react2.default.createElement(DemoAppLauncherTileWithIconNode, {
      size: "small"
    })));
  }
});
var DemoAppLauncher = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncher',
  getInitialState: function getInitialState() {
    return {
      search: '',
      appLauncherOpen: this.props.isOpen || false,
      // eslint-disable-line react/prop-types
      allItemsSectionIsOpen: false
    };
  },
  onClear: function onClear() {
    this.setState({
      search: ''
    });
  },
  onSearch: function onSearch(event) {
    this.setState({
      search: event.target.value
    });
  },
  toggleAppLauncher: function toggleAppLauncher() {
    this.setState({
      appLauncherOpen: !this.state.appLauncherOpen
    });
  },
  toggleSection: function toggleSection() {
    this.setState({
      allItemsSectionIsOpen: !this.state.allItemsSectionIsOpen
    });
  },
  render: function render() {
    var search = _react2.default.createElement(_search2.default, {
      clearable: this.state.search !== '',
      onChange: this.onSearch,
      onClear: this.onClear,
      placeholder: "Find an app",
      assistiveText: {
        label: 'Find an app'
      },
      value: this.state.search
    });

    var modalHeaderButton = _react2.default.createElement(_button2.default, {
      label: "App Exchange",
      onClick: (0, _react3.action)('Modal Button clicked!')
    });

    return _react2.default.createElement(_globalNavigationBar2.default, null, _react2.default.createElement(_region2.default, {
      region: "primary"
    }, _react2.default.createElement(_appLauncher2.default, {
      assistiveText: {
        trigger: 'Open App Launcher'
      },
      triggerName: "App Name",
      search: search,
      modalClassName: "custom-modal-class",
      modalHeaderButton: modalHeaderButton,
      isOpen: this.state.appLauncherOpen,
      triggerOnClick: this.toggleAppLauncher,
      onClose: this.toggleAppLauncher
    }, _react2.default.createElement(_section2.default, {
      toggleable: true,
      title: "All Items",
      isOpen: this.state.allItemsSectionIsOpen,
      onToggleClick: this.toggleSection
    }, _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithIconNode, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithIconText, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithIconNode, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithIconText, {
      search: this.state.search
    })), _react2.default.createElement(_section2.default, {
      title: "All Apps",
      toggleable: true
    }, _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithDescriptionHeading, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithDescriptionHeading, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithDescriptionHeading, {
      search: this.state.search
    })))));
  }
});
var DemoAppLauncherNoHeaderButton = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherNoHeaderButton',
  getInitialState: function getInitialState() {
    return {
      search: '',
      appLauncherOpen: false,
      allItemsSectionIsOpen: false
    };
  },
  onSearch: function onSearch(event) {
    this.setState({
      search: event.target.value
    });
  },
  toggleAppLauncher: function toggleAppLauncher() {
    this.setState({
      appLauncherOpen: !this.state.appLauncherOpen
    });
  },
  render: function render() {
    var search = _react2.default.createElement(_search2.default, {
      onChange: this.onSearch,
      placeholder: "Find an app",
      assistiveText: {
        label: 'Find an app'
      }
    });

    return _react2.default.createElement(_globalNavigationBar2.default, null, _react2.default.createElement(_region2.default, {
      region: "primary"
    }, _react2.default.createElement(_appLauncher2.default, {
      triggerName: "App Name",
      search: search,
      isOpen: this.state.appLauncherOpen,
      triggerOnClick: this.toggleAppLauncher,
      onClose: this.toggleAppLauncher
    }, _react2.default.createElement(_section2.default, {
      toggleable: true,
      title: "All Items"
    }, _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithIconNode, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithIconText, {
      search: this.state.search
    })), _react2.default.createElement(_section2.default, {
      title: "All Apps",
      toggleable: true
    }, _react2.default.createElement(DemoAppLauncherTile, {
      search: this.state.search
    }), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, {
      search: this.state.search
    })))));
  }
});
var DemoAppLauncherNoSearch = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherNoSearch',
  getInitialState: function getInitialState() {
    return {
      appLauncherOpen: false,
      allItemsSectionIsOpen: false
    };
  },
  toggleAppLauncher: function toggleAppLauncher() {
    this.setState({
      appLauncherOpen: !this.state.appLauncherOpen
    });
  },
  render: function render() {
    var modalHeaderButton = _react2.default.createElement(_button2.default, {
      label: "App Exchange",
      onclick: (0, _react3.action)('Modal Button clicked!')
    });

    return _react2.default.createElement(_globalNavigationBar2.default, null, _react2.default.createElement(_region2.default, {
      region: "primary"
    }, _react2.default.createElement(_appLauncher2.default, {
      triggerName: "App Name",
      modalHeaderButton: modalHeaderButton,
      isOpen: this.state.appLauncherOpen,
      triggerOnClick: this.toggleAppLauncher,
      onClose: this.toggleAppLauncher
    }, _react2.default.createElement(_section2.default, {
      toggleable: true,
      title: "All Items"
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null), _react2.default.createElement(DemoAppLauncherTileWithIconText, null)), _react2.default.createElement(_section2.default, {
      title: "All Apps",
      toggleable: true
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null)))));
  }
});
var DemoAppLauncherWithSeveralSections = (0, _createReactClass2.default)({
  displayName: 'DemoAppLauncherWithSeveralSections',
  onSearch: function onSearch() {// stub
  },
  render: function render() {
    var search = _react2.default.createElement(_search2.default, {
      onChange: this.onSearch,
      placeholder: "Find an app",
      assistiveText: {
        label: 'Find an app'
      }
    });

    var modalHeaderButton = _react2.default.createElement(_button2.default, {
      label: "App Exchange",
      onclick: (0, _react3.action)('Modal Button clicked!')
    });

    return _react2.default.createElement(_globalNavigationBar2.default, null, _react2.default.createElement(_region2.default, {
      region: "primary"
    }, _react2.default.createElement(_appLauncher2.default, {
      triggerName: "App Name",
      search: search,
      modalHeaderButton: modalHeaderButton
    }, _react2.default.createElement(_section2.default, {
      title: "First Section"
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react2.default.createElement(_section2.default, {
      title: "Second Section"
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react2.default.createElement(_section2.default, {
      title: "Third Section"
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react2.default.createElement(_section2.default, {
      title: "Fourth Section"
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null)), _react2.default.createElement(_section2.default, {
      title: "Fifth Section"
    }, _react2.default.createElement(DemoAppLauncherTile, null), _react2.default.createElement(DemoAppLauncherTileWithIconNode, null), _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null)))));
  }
});
(0, _react3.storiesOf)(_constants.APP_LAUNCHER, module).addDecorator(function (getStory) {
  return _react2.default.createElement("div", {
    className: "slds-p-around--medium"
  }, _react2.default.createElement(_iconSettings2.default, {
    iconPath: "/assets/icons"
  }, getStory()));
}).add('App Launcher (open)', function () {
  return _react2.default.createElement(DemoAppLauncher, {
    isOpen: true
  });
}).add('App Launcher', function () {
  return _react2.default.createElement(DemoAppLauncher, null);
}).add('App Launcher no header button', function () {
  return _react2.default.createElement(DemoAppLauncherNoHeaderButton, null);
}).add('App Launcher no search', function () {
  return _react2.default.createElement(DemoAppLauncherNoSearch, null);
}).add('App Launcher with several sections (no toggle)', function () {
  return _react2.default.createElement(DemoAppLauncherWithSeveralSections, null);
}).add('Tile', function () {
  return _react2.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherTile, null));
}).add('Small Tile', function () {
  return _react2.default.createElement("div", {
    style: smallTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherSmallTile, null));
}).add('Tile with Icon node', function () {
  return _react2.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherTileWithIconNode, null));
}).add('Tile with icon text', function () {
  return _react2.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherTileWithIconText, null));
}).add('Tile with search text', function () {
  return _react2.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherTileWithSearchText, null));
}).add('Tile with truncated text', function () {
  return _react2.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherTileWithTruncatedText, null));
}).add('Tile with description heading', function () {
  return _react2.default.createElement("div", {
    style: standardTileDemoStyles
  }, _react2.default.createElement(DemoAppLauncherTileWithDescriptionHeading, null));
}).add('Section', function () {
  return _react2.default.createElement(DemoAppLauncherSection, null);
}).add('Section with small tiles', function () {
  return _react2.default.createElement(DemoAppLauncherSectionWithSmallTiles, null);
});