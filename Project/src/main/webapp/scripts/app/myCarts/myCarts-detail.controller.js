'use strict';

angular.module('jwebApp')
    .controller('MyCartsDetailController',
    ['$scope', '$stateParams', 'Cart', 'myUser', 'CartProductList', 'cartProducts',
        function ($scope, $stateParams, Cart, myUser, CartProductList, cartProducts) {

            $scope.loadCarts = function () {
                $scope.cartContainer = {products: [], cart: null};

                myUser.query(function(result) {
                    $scope.user = result;
                    Cart.query(function(result) {
                        $scope.carts = result;
                        angular.forEach(result, function (cart) {
                            if (cart.id === parseInt($stateParams.id) && cart.user.id === $scope.user.id) {
                                cartProducts.query({id: cart.id}, function (result) {
                                    $scope.cartContainer.products = result;
                                    $scope.cartContainer.cart = cart;
                                    angular.forEach(result, function(item){
                                        $scope.deliveryTotal += ((item.product.price - item.product.promotion.reduction - item.product.price * item.product.promotion.percent / 100) * item.quantity);
                                    });
                                });
                            }
                        });
                    })
                });
            };

            $scope.loadAll = function () {
                $scope.deliveryTotal = 0;
                $scope.loadCarts();
            };

            $scope.loadAll();

            $scope.refresh = function () {
                $scope.loadAll();
            };
        }]);
