var mainApp = angular.module('mainApp', ['ngRoute']);

/**
 * Route configuration
 */
mainApp.config(function($routeProvider, $locationProvider, $httpProvider, $provide) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'inicio.html',
            controller: 'inicioController'
        })
        .when('/portfolio', {
            templateUrl: 'portfolio.html',
            controller: 'portfolioController'
        })
        .when('/servicios', {
            templateUrl: 'servicios.html',
            controller: 'serviciosController'
        })
        .when('/contacto', {
            templateUrl: 'contacto.html',
            controller: 'contactoController'
        });

    $httpProvider.interceptors.push('ajaxLoading');
});

/**
 * Capture any AJAX loading
 */
mainApp.factory('ajaxLoading', function($q, $rootScope){
    return {
        request: function(config){
            $rootScope.ajaxLoadingFlag = true;
            return config;
        },
        response: function(response){
            $rootScope.ajaxLoadingFlag = false;
            return response;
        },
        requestError: function(config){
            $rootScope.ajaxLoadingFlag = false;
            return $q.reject(config);
        },
        responseError: function(response){
            Materialize.toast(response.config.method + ' request to ' + response.config.url + ' was refused with status ' + response.status, 5000);
            $rootScope.ajaxLoadingFlag = false;
            return $q.reject(response);
        }
    };
});

mainApp.controller('inicioController', function($scope) {
    //alert('HomeController');
});
mainApp.controller('portfolioController', function($scope) {
    //alert('HomeController');
});
mainApp.controller('serviciosController', function($scope) {
    //alert('HomeController');
});
mainApp.controller('contactoController', function($scope) {
    //alert('HomeController');
});