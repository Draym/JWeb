'use strict';

angular.module('jwebApp').controller('CartProductListDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'CartProductList', 'Cart', 'Product',
        function($scope, $stateParams, $uibModalInstance, entity, CartProductList, Cart, Product) {

        $scope.cartProductList = entity;
        $scope.carts = Cart.query();
        $scope.products = Product.query();
        $scope.load = function(id) {
            CartProductList.get({id : id}, function(result) {
                $scope.cartProductList = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jwebApp:cartProductListUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.cartProductList.id != null) {
                CartProductList.update($scope.cartProductList, onSaveSuccess, onSaveError);
            } else {
                CartProductList.save($scope.cartProductList, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
