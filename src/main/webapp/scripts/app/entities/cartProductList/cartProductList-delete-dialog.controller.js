'use strict';

angular.module('jwebApp')
	.controller('CartProductListDeleteController', function($scope, $uibModalInstance, entity, CartProductList) {

        $scope.cartProductList = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            CartProductList.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
