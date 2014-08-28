require([
    'base/test/browser/utils',
    'base/public/js/main'

], function(utils) {

    'use strict';

    requirejs.config({

        baseUrl: 'base/public',

        paths:  {
            'angularMocks': 'components/angular-mocks/angular-mocks'
        },

        shim:  {
            'angularMocks': {
                deps: ['angular']
            }
        },

        deps: ['angularMocks'],

        callback: function() {

            var testFiles = utils.loadTestFiles(/Test\.js$/);

            require(testFiles, function(){
                window.__karma__.start();
            });
        }
    });
});
