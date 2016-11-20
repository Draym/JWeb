'use strict';

angular.module('jwebApp').controller('MyCartsAddProductController',
    ['$scope', '$location', '$stateParams', '$modalInstance', 'entity', 'myCarts', 'Cart', 'CartProductList', 'myUser',
        function ($scope, $location, $stateParams, $uibModalInstance, entity, myCarts, Cart, CartProductList, myUser) {

            $scope.carts = [];
            $scope.cart = {id: null};
            $scope.cartProductList = {id: null};

            $scope.loadAll = function () {
                CartProductList.query(function (result) {
                    $scope.cartProductLists = result;
                    myCarts.query(function (result) {
                        $scope.carts = result;
                        if ($scope.carts.length > 1) {
                            $scope.cart = $scope.carts[0];
                        } else {
                            if ($scope.carts.length == 0) {
                                myUser.query(function (result) {
                                    var item = {user: result, name: "default"};
                                    Cart.save(item, function (result) {
                                        $scope.cart = result;
                                        $scope.save();
                                    });
                                });
                            } else {
                                $scope.cart = $scope.carts[0];
                                $scope.save();
                            }
                        }
                    });
                })
            };

            $scope.loadCartList = function (cartId, productId) {
                for (var i = 0; i < $scope.cartProductLists.length; ++i) {
                    if ($scope.cartProductLists[i].cart.id == cartId && $scope.cartProductLists[i].product.id == productId) {
                        $scope.cartProductList = $scope.cartProductLists[i];
                        break;
                    }
                }
            };

            $scope.loadAll();

            var onSaveSuccess = function (result) {
                $scope.$emit('jwebApp:cartProductListUpdate', result);
                $scope.isSaving = false;
                if ($location.path().toLowerCase().indexOf("all") === -1
                    && $location.path().toLowerCase().indexOf("list") === -1) {
                    $location.url("/MyCarts");
                }
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.loadCartList($scope.cart.id, entity.id);
                $scope.isSaving = true;
                if ($scope.cartProductList.id != null) {
                    $scope.cartProductList.quantity += parseInt($stateParams.nbr);
                    CartProductList.update($scope.cartProductList, onSaveSuccess, onSaveError);
                } else {
                    $scope.cartProductList.quantity = parseInt($stateParams.nbr);
                    $scope.cartProductList.cart = $scope.cart;
                    $scope.cartProductList.product = entity;
                    CartProductList.save($scope.cartProductList, onSaveSuccess, onSaveError);
                }
                $uibModalInstance.close();
            };

            $scope.clear = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
