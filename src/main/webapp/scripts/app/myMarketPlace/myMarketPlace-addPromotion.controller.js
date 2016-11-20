'use strict';

angular.module('jwebApp').controller('MyMarketPlaceAddPromotionController',
    ['$scope', '$stateParams', '$uibModalInstance', 'Product', 'Promotion',
        function ($scope, $stateParams, $uibModalInstance, Product, Promotion) {

            $scope.loadAll = function () {
                Product.get({id: $stateParams.id}, function (result) {
                    $scope.product = result;
                });

                Promotion.query(function (result) {
                    $scope.promotions = result;
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
                if ($scope.product.promotion != null) {
                    if ($scope.product.id != null) {
                        Product.update($scope.product, onSaveSuccess, onSaveError);
                    } else {
                        Product.save($scope.product, onSaveSuccess, onSaveError);
                    }
                }
                $scope.isSaving = false;
            };

            $scope.loadAll();

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
