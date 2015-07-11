'use strict';
var crypto = require('crypto');
var isObj = require('is-obj');
var sortKeys = require('sort-keys');

module.exports = function (x, opts) {
	if (!isObj(x)) {
		throw new TypeError('Expected an object');
	}

	opts = opts || {};

	var enc = opts.encoding || 'hex';

	if (enc === 'buffer') {
		enc = undefined;
	}

	return crypto
		.createHash(opts.algorithm || 'sha512')
		.update(JSON.stringify(sortKeys(x, {deep: true})), 'utf8')
		.digest(enc);
};
