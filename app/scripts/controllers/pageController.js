define(['app', 'config'], function (app) {

    'use strict';

    app.controller('PageController', ['$scope', 'config', function ($scope, config) {

        $scope.foo = config.foo;

    }]);

});