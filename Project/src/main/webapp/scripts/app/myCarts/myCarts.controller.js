'use strict';

angular.module('jwebApp')
    .controller('MyCartsController',
    ['$scope', 'myCarts', 'CartProductList', 'cartProducts',
        function ($scope, myCarts, CartProductList, cartProducts) {

            $scope.loadCarts = function () {
                $scope.carts = [];
                myCarts.query(function (result) {
                    angular.forEach(result, function (cart) {
                        cartProducts.query({id: cart.id}, function (result) {
                            var item = {products: [], cart: null};
                            item.products = result;
                            item.cart = cart;
                            item.total = 0;
                            angular.forEach(result, function(value){
                                item.total += ((value.product.price - value.product.promotion.reduction - value.product.price * value.product.promotion.percent / 100) * value.quantity);
                            });
                            $scope.carts.push(item);
                        });
                    });
                });
            };

            $scope.loadAll = function () {
                $scope.loadCarts();
            };

            $scope.changeQuantity = function (param) {
                CartProductList.get({id: param.id}, function (result) {
                    var product = result;
                    product.quantity = param.quantity;
                    CartProductList.update(product);
                });
            };

            $scope.deleteProduct = function (param) {
                CartProductList.delete({id: param.id}, function () {
                    $scope.refresh();
                });
            };

            $scope.loadAll();

            $scope.refresh = function () {
                $scope.loadAll();
            };
        }]);
