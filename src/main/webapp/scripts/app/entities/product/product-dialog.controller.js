'use strict';

angular.module('jwebApp').controller('ProductDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Product', 'BaseProducts', 'Promotion', 'CartProductList', 'MarketPlace',
        function($scope, $stateParams, $uibModalInstance, entity, Product, BaseProducts, Promotion, CartProductList, MarketPlace) {

        $scope.product = entity;
        $scope.baseproducts = BaseProducts.query();
        $scope.promotions = Promotion.query();
        $scope.cartproductlists = CartProductList.query();
        $scope.marketplaces = MarketPlace.query();
        $scope.load = function(id) {
            Product.get({id : id}, function(result) {
                $scope.product = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jwebApp:productUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.product.id != null) {
                Product.update($scope.product, onSaveSuccess, onSaveError);
            } else {
                Product.save($scope.product, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
