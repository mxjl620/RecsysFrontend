var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'application.html',
            controller: 'applicationController'
        })
        .when('/data', {
            templateUrl: 'data.html',
            controller: 'dataFileController'
        })
        .when('/service', {
            templateUrl: '/service',
            controller: 'serviceManagementController'
        })
        .otherwise({
            templateUrl: 'application.html',
            controller: 'applicationController'
        });
});

app.service('myService', function () {
   var application = {};

    return {
        getApplication: function () {
            return application;
        },
        setApplication: function(value) {
            application = angular.copy(value);
        }
    };
});

app.controller('mainController', function($scope) {});