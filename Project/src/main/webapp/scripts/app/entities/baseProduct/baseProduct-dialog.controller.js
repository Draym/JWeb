'use strict';

angular.module('jwebApp').controller('BaseProductDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'BaseProduct', 'Types', 'Product',
        function ($scope, $stateParams, $uibModalInstance, entity, BaseProduct, Types, Product) {

            $scope.baseProduct = entity;

            $scope.loadTypes = function () {
                Types.query(function (result) {
                    $scope.types = result;
                })
            };

            $scope.products = Product.query();
            $scope.load = function (id) {
                BaseProduct.get({id: id}, function (result) {
                    $scope.baseProduct = result;
                });
            };

            $scope.loadAll = function () {
                $scope.loadTypes();
            };

            $scope.loadAll();

            var onSaveSuccess = function (result) {
                $scope.$emit('jwebApp:baseProductUpdate', result);
                $uibModalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.baseProduct.id != null) {
                    BaseProduct.update($scope.baseProduct, onSaveSuccess, onSaveError);
                } else {
                    BaseProduct.save($scope.baseProduct, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
