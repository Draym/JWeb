angular.module('jwebApp').controller('MyMarketPlaceAddProductController',
    ['$scope', '$stateParams', '$uibModalInstance', 'Product', 'myUser', 'myMarketPlace', 'BaseProducts', 'Promotion',
        function ($scope, $stateParams, $uibModalInstance, Product, myUser, myMarketPlace, BaseProducts, Promotion) {

            $scope.loadProduct = function () {
                $scope.product = {};
                $scope.product.id = null;
                $scope.product.valid = true;
                $scope.product.stock = 0;
                myUser.query(function (result) {
                    $scope.product.user = result;
                    myMarketPlace.query(function (result) {
                        $scope.product.marketPlace = result;
                        Promotion.get({id: 1}, function(result){
                           $scope.product.promotion = result;
                        });
                    });
                });
            };

            $scope.loadBaseProducts = function () {
                $scope.baseProducts = [];

                BaseProducts.query(function (result) {
                    $scope.baseProducts = result;
                });
            };

            $scope.loadAll = function () {
                $scope.loadProduct();
                $scope.loadBaseProducts();
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
                if ($scope.product.baseProduct != null) {
                    if ($scope.product.id != null) {
                        Product.update($scope.product, onSaveSuccess, onSaveError);
                    } else {
                        Product.save($scope.product, onSaveSuccess, onSaveError);
                    }
                } else {
                    $scope.isSaving = false;
                }
            };

            $scope.loadAll();

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
