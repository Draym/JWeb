'use strict';

angular.module('jwebApp')
    .controller('StatusDetailController', function ($scope, $rootScope, $stateParams, entity, Status, Delivery) {
        $scope.status = entity;
        $scope.load = function (id) {
            Status.get({id: id}, function(result) {
                $scope.status = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:statusUpdate', function(event, result) {
            $scope.status = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
