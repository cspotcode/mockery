/*
This file named 1-general.js for a reason, it is so this
test is executed first so we can catch the "warmup" of the
module and test the dead code cases.
*/
var vows = require('vows'),
    assert = require('assert'),
    m = require('module'),
    mockery = require('../mockery');

var tests = {
    'when mockery is required while useCleanCache is enabled': {
        topic: function () {
            mockery.enable({useCleanCache: true});
            mockery.registerMock('fs', 'not really fs');
            mockery.registerMock('./fixtures/fake_module', {
                foo: function() {
                    return 'not really fake_module';
                }
            });
            return require('../mockery');
        },
        'mockery\'s internal state is still shared': function (mockery) {
            mockery.deregisterMock('./fixtures/fake_module');
            assert.equal(require('./fixtures/fake_module').foo(), 'real foo');
            assert.equal(require('fs'), 'not really fs');
        },
        teardown: function() {
            mockery.deregisterAll();
            mockery.disable();
        }
    }
};

vows.describe('clean-cache').addBatch(tests).export(module);
