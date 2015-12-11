var Module = require('module');

// Delete ourselves from `require()` cache so that each `require()` call runs this file again.
// This means `module.parent` will always be the module that `require()`d us, allowing us to
// resolve relative module paths correctly.
delete Module._cache[module.id];

// Store our implementation onto Module so that we are immune to module cache clearing.
var mockeryLibProp = '__mockery_lib__';
var mockeryLib = Module[mockeryLibProp] || (Module[mockeryLibProp] = require('./lib/mockery'));

module.exports = mockeryLib.init(module.parent);
