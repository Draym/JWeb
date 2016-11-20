'use strict';

angular.module('jwebApp')
    .controller('MyDeliveriesController', function ($scope, $location, myDeliveries, Status, cartProducts) {

        $scope.loadDeliveries = function () {
            $scope.deliveries = [];
            myDeliveries.query(function (result) {
                $scope.deliveries = result;

                for (var i = 0; i < $scope.deliveries.length; ++i) {
                    if (($scope.state.id != -1 && $scope.deliveries[i].status.id !== $scope.state.id)
                        || !$scope.deliveries[i].id.toString().toLowerCase().includes($scope.id.toString().toLowerCase())) {
                        $scope.deliveries.splice(i, 1);
                        --i;
                    }
                }
                angular.forEach($scope.deliveries, function(delivery){
                    delivery.total = 0;
                    cartProducts.query({id: delivery.cart.id}, function (result) {
                        angular.forEach(result, function(value){
                            delivery.total += (value.product.price - value.product.promotion.reduction - value.product.price * value.product.promotion.percent / 100) * value.quantity;
                        });
                    });
                })
            });
        };

        $scope.continueDelivery = function(param){
            for (var i = 0; i < $scope.deliveries.length; ++i){
                if ($scope.deliveries[i].id === param){
                    if ($scope.deliveries[i].status.id == 3) {
                        $location.url("/MyDeliveries/" + $scope.deliveries[i].id.toString() + "/payselect");
                    } else if ($scope.deliveries[i].status.id == 4) {
                        $location.url("/MyDeliveries/" + $scope.deliveries[i].id.toString() + "/confirm");
                    }
                }
            }
        };

        $scope.loadParser = function () {
            $scope.id = "";
            $scope.state = {id: -1, name: "All"};
            $scope.status = [];
            Status.query(function (result) {
                $scope.status = result;
                $scope.status.splice(0, 0, $scope.state);
                $scope.state = $scope.status[0];
            });
        };

        $scope.parseStatus = function () {
            $scope.loadDeliveries();
        };

        $scope.parseID = function () {
            $scope.loadDeliveries();
        };

        $scope.loadAll = function () {
            $scope.loadParser();
            $scope.loadDeliveries();
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
