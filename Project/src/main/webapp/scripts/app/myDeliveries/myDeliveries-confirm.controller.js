'use strict';

angular.module('jwebApp')
    .controller('MyDeliveriesConfirmController', function ($scope, $stateParams, $location, Delivery, Status, myUser, Cart, CartProductList, cartProducts) {

        var onNextSuccess = function (result) {
            $scope.$emit('jwebApp:deliveryUpdate', result);
            $location.url("/MyDeliveries");
        };

        var onNextError = function (result) {
            $location.url("/MyDeliveries");
        };

        var onBackSuccess = function (result) {
            $scope.$emit('jwebApp:deliveryUpdate', result);
            $location.url("/MyDeliveries/" + $scope.delivery.id + "/payselect");
        };

        var onBackError = function (result) {
            $location.url("/MyDeliveries");
        };

        $scope.nextAndSave = function () {
            Status.get({id: 5}, function (result) {
                $scope.delivery.status = result;
                Delivery.update($scope.delivery, onNextSuccess, onNextError);
            });
        };

        $scope.backAndSave = function () {
            Status.get({id: 3}, function (result) {
                $scope.delivery.status = result;
                Delivery.update($scope.delivery, onBackSuccess, onBackError);
            });
        };

        $scope.loadCarts = function () {
            $scope.cartContainer = {products: [], cart: null};

            myUser.query(function(result) {
                $scope.user = result;
                Cart.query(function(result) {
                    $scope.carts = result;
                    angular.forEach(result, function (cart) {
                        if (cart.id === parseInt($scope.delivery.cart.id) && cart.user.id === $scope.user.id) {
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
            Delivery.get({id: $stateParams.id}, function (result) {
                $scope.delivery = result;
                $scope.loadCarts();
            });
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
