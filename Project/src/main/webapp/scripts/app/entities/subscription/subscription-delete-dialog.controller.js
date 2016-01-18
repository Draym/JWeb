'use strict';

angular.module('jwebApp')
	.controller('SubscriptionDeleteController', function($scope, $uibModalInstance, entity, Subscription) {

        $scope.subscription = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Subscription.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
