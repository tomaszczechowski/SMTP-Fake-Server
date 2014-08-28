define(['app', 'pageController'], function (app) {

    'use strict';

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/', {
                templateUrl: './templates/page.html',
                controller: 'PageController'
            });
    }]);
});
