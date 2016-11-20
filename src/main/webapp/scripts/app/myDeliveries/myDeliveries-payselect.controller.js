'use strict';

angular.module('jwebApp')
    .controller('MyDeliveriesPaySelectController', function ($scope, $stateParams, $location, Delivery, Payment, Status, cartProducts, Product, AlertService) {

        var onNextSuccess = function (result) {
            $scope.$emit('jwebApp:deliveryUpdate', result);
            $location.url("/MyDeliveries/" + $scope.delivery.id + "/confirm");
        };

        var onNextError = function (result) {
            $location.url("/MyDeliveries");
        };

        var onBackSuccess = function (result) {
            $scope.$emit('jwebApp:deliveryUpdate', result);
            $location.url("/MyDeliveries/" + $scope.delivery.cart.id + "/create");
        };

        var onBackError = function (result) {
            $location.url("/MyDeliveries");
        };

        $scope.selectPayment = function (param) {
            $scope.delivery.payment = param;
        };

        $scope.loadAll = function () {
            $scope.delivery = {id: null, payment: null};
            $scope.payments = [];
            $scope.paymentSelected = {id: null};
            Delivery.get({id: $stateParams.id}, function (result) {
                $scope.delivery = result;
                Payment.query(function (result) {
                    $scope.payments = result;
                    Status.get({id: 3}, function (result) {
                        $scope.delivery.status = result;
                    });
                });
            });
        };

        $scope.updateDelivery = function () {
            Delivery.update($scope.delivery, onNextSuccess, onNextError);
        };

        $scope.checkDeliveryProducts = function (callback) {
            var valid = true;

            cartProducts.query({id: $scope.delivery.cart.id}, function (result) {
                var name = "";
                for (var i = 0; i < result.length; ++i) {
                    if (result[i].quantity > result[i].product.stock || result[i].product.valid === false) {
                        valid = false;
                        name = result[i].product.baseProduct.name;
                        break;
                    }
                }
                if (valid == false || result.length == 0) {
                    AlertService.error("Error: " + name + " doesn't have sufficient stock for your order.");
                    $scope.backAndSave();
                } else {
                    i = 0;
                    var max = result.length;
                    angular.forEach(result, function (item) {
                        item.product.stock -= item.quantity;
                        Product.update(item.product, function () {
                            if (i === max - 1) {
                                callback();
                            }
                            ++i;
                        });
                    });
                }
            });
        };

        $scope.resetOrder = function () {
            cartProducts.query({id: $scope.delivery.cart.id}, function (result) {
                var max = result.length;
                var i = 0;
                angular.forEach(result, function (item) {
                    item.product.stock += item.quantity;
                    Product.update(item.product, function () {
                        if (i === max - 1) {
                            Delivery.delete($scope.delivery, onBackSuccess, onBackError);
                        }
                        ++i;
                    });
                });
            });
        };

        $scope.nextAndSave = function () {
            Status.get({id: 4}, function (result) {
                $scope.delivery.status = result;
                if ($scope.delivery.payment !== null) {
                    $scope.checkDeliveryProducts($scope.updateDelivery);
                }
            });
        };

        $scope.backAndSave = function () {
            $scope.resetOrder();
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
