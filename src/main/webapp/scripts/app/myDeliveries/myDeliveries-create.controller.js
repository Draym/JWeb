'use strict';

angular.module('jwebApp')
    .controller('MyDeliveriesCreateController', function ($scope, $stateParams, $location, Cart, myUser, Delivery, Status, CartProductList, cartProducts) {

        var onNextSuccess = function (result) {
            $scope.$emit('jwebApp:deliveryUpdate', result);
            $location.url("/MyDeliveries/" + result.id + "/payselect");
        };

        var onNextError = function (result) {
            $location.url("/MyDeliveries");
        };

        $scope.loadAll = function () {
            $scope.deliveryTotal = 0;
            $scope.delivery = {id: null, status: null};
            Cart.get({id: $stateParams.id}, function (result) {
                $scope.cart = result;
                myUser.query(function (result) {
                    $scope.user = result;
                    Status.get({id: 2}, function (result) {
                        $scope.status = result;
                        $scope.delivery = {
                            id: null,
                            user: $scope.user,
                            cart: $scope.cart,
                            payment: null,
                            status: $scope.status
                        };
                    });
                });
            });
            $scope.loadCarts();
        };

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

        $scope.changeQuantity = function (param) {
            CartProductList.get({id: param.id}, function (result) {
                var product = result;
                product.quantity = param.quantity;
                CartProductList.update(product, function() {
                    $scope.loadAll();
                });
            });
        };

        $scope.deleteProduct = function (param) {
            CartProductList.delete({id: param.id}, function () {
                $scope.loadAll();
            });
            $scope.refresh();
        };

        $scope.nextAndSave = function () {
            Status.get({id: 3}, function (result) {
                $scope.delivery.status = result;
                Delivery.save($scope.delivery, onNextSuccess, onNextError);
            });
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
