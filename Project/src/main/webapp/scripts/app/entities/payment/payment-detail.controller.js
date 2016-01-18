'use strict';

angular.module('jwebApp')
    .controller('PaymentDetailController', function ($scope, $rootScope, $stateParams, entity, Payment, Delivery) {
        $scope.payment = entity;
        $scope.load = function (id) {
            Payment.get({id: id}, function(result) {
                $scope.payment = result;
            });
        };
        var unsubscribe = $rootScope.$on('jwebApp:paymentUpdate', function(event, result) {
            $scope.payment = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
