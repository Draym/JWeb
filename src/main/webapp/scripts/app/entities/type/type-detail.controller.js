'use strict';

angular.module('jwebApp')
    .controller('TypeDetailController', function ($scope, $rootScope, $stateParams, entity, Type, BaseProduct) {
        $scope.type = entity;
        $scope.load = function (id) {
            Type.get({id: id}, function(result) {
                $scope.type = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:typeUpdate', function(event, result) {
            $scope.type = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
