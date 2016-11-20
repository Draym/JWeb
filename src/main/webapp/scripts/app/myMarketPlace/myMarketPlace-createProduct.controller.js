angular.module('jwebApp').controller('MyMarketPlaceCreateProductController',
    ['$scope', '$stateParams', '$uibModalInstance', 'Product', 'myUser', 'myMarketPlace', 'BaseProduct', 'Types', 'Promotion',
        function ($scope, $stateParams, $uibModalInstance, Product, myUser, myMarketPlace, BaseProduct, Types, Promotion) {

            $scope.loadProduct = function () {
                $scope.product = {};
                $scope.product.id = null;
                $scope.product.valid = true;
                $scope.product.stock = 0;
                myUser.query(function (result) {
                    $scope.product.user = result;
                    myMarketPlace.query(function (result) {
                        $scope.product.marketPlace = result;
                        Types.query(function(result) {
                            $scope.types = result;
                        });
                        Promotion.get({id: 1}, function(result){
                            $scope.product.promotion = result;
                        });
                    });
                });
            };

            $scope.loadBaseProducts = function () {
                $scope.baseProduct = {};

                $scope.baseProduct.id = null;
                $scope.baseProduct.rating = 0.1;
                $scope.baseProduct.type = null;
            };

            $scope.loadAll = function () {
                $scope.loadProduct();
                $scope.loadBaseProducts();
            };

            var onProductSaveSuccess = function (result) {
                $scope.$emit('jwebApp:productUpdate', result);
                $uibModalInstance.close(result);
                $scope.isSaving = false;
            };

            var onBaseSaveSuccess = function (result) {
                $scope.$emit('jwebApp:baseProductUpdate', result);
                $scope.product.baseProduct = result;
                if ($scope.product.baseProduct != null) {
                    if ($scope.product.id != null) {
                        Product.update($scope.product, onProductSaveSuccess, onSaveError);
                    } else {
                        Product.save($scope.product, onProductSaveSuccess, onSaveError);
                    }
                } else {
                    $scope.isSaving = false;
                }
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.baseProduct.type != null) {
                    BaseProduct.save($scope.baseProduct, onBaseSaveSuccess, onSaveError);
                } else {
                    $scope.isSaving = false;
                }
            };

            $scope.loadAll();

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
