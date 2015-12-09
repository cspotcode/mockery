// Delete ourselves from `require()` cache so that each `require()` call runs this file again.
// This means `module.parent` will always be the module that `require()`d us, allowing us to
// resolve relative module paths correctly.
delete require('module')._cache[module.id];

module.exports = require('./lib/mockery').init(module.parent);
