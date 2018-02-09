var app = angular.module('contactApp', []);

var mainApp = angular.module('mainApp', ['ngRoute']);

/**
 * Route configuration
 */
mainApp.config(function($routeProvider, $locationProvider, $httpProvider, $provide) {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/items', {
            templateUrl: 'items.html',
            controller: 'ItemsController'
        })
        .when('/items/:itemId', {
            template: '<div class="item_details">item-details</div>',
            controller: 'ItemDetailsController'
        })
        .when('/profile', {
            template: '<div class="profile">profile</div>',
            controller: 'ProfileController'
        })
        .when('/settings', {
            templateUrl: 'settings.html',
            controller: 'SettingsController'
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

mainApp.controller('HomeController', function($scope) {
    //alert('HomeController');
});
mainApp.controller('ItemsController', function($scope, $http) {
    $scope.items = [];

    $http.get('items.json?_=' + new Date().getTime()).then(function(response){
        $scope.items = response.data;
    });
});
mainApp.controller('ItemDetailsController', function($scope) {
    //alert('ItemDetailsController');
});
mainApp.controller('ProfileController', function($scope) {
    //alert('ProfileController');
});

mainApp.controller('SettingsController', function($scope, $http, $timeout) {
    $scope.autoSave = true;
    $scope.settings = {};
    $scope.toast = null;

    $scope.loadSettings = function(response){
        $scope.settings = response.data;
        if($scope.toast){
            Materialize.toast($scope.toast, 1000);
            $scope.toast = null;
        }
        $timeout(Materialize.updateTextFields);
    }

    $scope.saveForm = function(auto){
        if(!auto || auto && $scope.autoSave){
            $scope.toast = 'Settings have been saved';
            $http.post('settings.json', $scope.settings).then($scope.loadSettings);
        }
    }

    $http.get('settings.json?_=' + new Date().getTime()).then($scope.loadSettings);

});