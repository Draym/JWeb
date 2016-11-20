'use strict';

angular.module('jwebApp')
    .controller('DeliveryDetailController', function ($scope, $rootScope, $stateParams, entity, Delivery, Status, Payment, User, Cart) {
        $scope.delivery = entity;
        $scope.load = function (id) {
            Delivery.get({id: id}, function(result) {
                $scope.delivery = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:deliveryUpdate', function(event, result) {
            $scope.delivery = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
