'use strict';

angular.module('jwebApp')
	.controller('BaseProductDeleteController', function($scope, $uibModalInstance, entity, BaseProduct) {

        $scope.baseProduct = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            BaseProduct.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
