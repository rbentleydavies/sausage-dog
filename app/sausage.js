'use strict';

var _startmailserver = require('./startmailserver.js');

var _startmailserver2 = _interopRequireDefault(_startmailserver);

var _startwebserver = require('./startwebserver.js');

var _startwebserver2 = _interopRequireDefault(_startwebserver);

var _startpopserver = require('./startpopserver.js');

var _startpopserver2 = _interopRequireDefault(_startpopserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _startmailserver2.default)();
(0, _startwebserver2.default)(3000);
(0, _startpopserver2.default)();