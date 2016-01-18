'use strict';

angular.module('jwebApp')
	.controller('DeliveryDeleteController', function($scope, $uibModalInstance, entity, Delivery) {

        $scope.delivery = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Delivery.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
