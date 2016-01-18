'use strict';

angular.module('jwebApp')
    .controller('MyMarketPlaceStockController',  function ($scope, $location, myMarketPlace, MarketPlaceProducts, Promotion, Product) {

        $scope.getState = function(param){
            if (param.stock == 0) {
                return $scope.states[2];
            } else if (param.stock <= param.sill) {
                return $scope.states[1];
            } else {
                return $scope.states[0];
            }
        };

        $scope.isState = function(product, param){
            return $scope.getState(product).id == param;
        };

        var onSaveProduct = function (result) {
            $scope.$emit('jwebApp:productUpdate', result);
            $scope.refresh();
        };

        $scope.addQuantity = function(param){
            param.product.stock += $scope.quantity;

            Product.update(param.product, onSaveProduct);
        };

        $scope.changeQuantity = function(value){
            $scope.quantity = value.quantity;
        };

        $scope.loadProducts = function () {
            $scope.products = [];
            $scope.quantity = 0;
            MarketPlaceProducts.query({id: $scope.marketPlace.id}, function (result) {

                $scope.products = result;
                for (var i = 0; i < $scope.products.length; ++i) {
                    if (($scope.state.id != -1 && $scope.getState($scope.products[i]).id !== $scope.state.id)
                        || !$scope.products[i].baseProduct.name.toLowerCase().includes($scope.path.toLowerCase())) {
                        $scope.products.splice(i, 1);
                        --i;
                    }
                }
            });
        };

        $scope.loadMarketPlace = function () {
            myMarketPlace.query(function (result) {
                $scope.marketPlace = result;
                $scope.loadProducts();
            }, function (result) {
                $location.url("/MyMarketPlace");
            });
        };


        $scope.loadParser = function () {
            $scope.states = [{id: -1, name: "All"}, {id: 0, name: "Warning"}, {id: 1, name: "Alert"}];
            $scope.state = $scope.states[0];

            $scope.path = "";
        };

        $scope.parseState = function () {
            $scope.loadProducts();
        };

        $scope.parseName = function () {
            $scope.loadProducts();
        };

        $scope.loadAll = function () {
            $scope.loadParser();
            $scope.loadMarketPlace();
        };

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });

