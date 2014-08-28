requirejs.config({

  baseUrl: '/',

  paths: {

    'jquery': 'bower_components/jquery/jquery',

    'angular': 'bower_components/angular/angular',
    'angularRoute': 'bower_components/angular-route/angular-route',

    'pageController': 'scripts/controllers/pageController',

    'app': 'scripts/app',
    'config': 'scripts/config',
    'routes': 'scripts/routes'
  },

  shim: {

    'jquery': {
      exports: 'jQuery'
    },
    'angular': {
      deps: [ 'jquery' ],
      exports: 'angular'
    },
    'angularRoute': {
      deps: [ 'angular' ]
    }
  }
});


require([

  'angular',
  'config',
  'routes'

], function(angular) {

  'use strict';

  angular.bootstrap(document, ['smtp-fake-server']);
});
