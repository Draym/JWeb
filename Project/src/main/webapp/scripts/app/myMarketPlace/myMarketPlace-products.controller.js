'use strict';

angular.module('jwebApp')
    .controller('MyMarketPlaceProductsController', function ($scope, $location, myMarketPlace, MarketPlaceProducts, Type, Product) {

        $scope.loadProducts = function () {
            $scope.products = [];
            MarketPlaceProducts.query({id: $scope.marketPlace.id}, function (result) {

                $scope.products = result;
                for (var i = 0; i < $scope.products.length; ++i) {
                    if (($scope.type.id != -1 && $scope.products[i].baseProduct.type.id !== $scope.type.id)
                        || ($scope.state.id != 0 && $scope.state.value != $scope.products[i].valid)
                        || !$scope.products[i].baseProduct.name.toLowerCase().includes($scope.path.toLowerCase())) {
                        $scope.products.splice(i, 1);
                        --i;
                    }
                }
            });
        };

        $scope.available = function (param) {
            Product.get({id: param.id}, function (result) {
                result.valid = !result.valid;
                Product.update(result, function (result) {
                    $scope.$emit('jwebApp:productUpdate', result);
                    $scope.refresh();
                });
            });
        };

        $scope.delete = function (param) {
            Product.get({id: param.id}, function (result) {
                Product.delete(result, function (result) {
                    $scope.$emit('jwebApp:productUpdate', result);
                    $scope.refresh();
                });
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
            $scope.types = [];
            $scope.type = {id: -1, name: "All"};
            $scope.states = [{id: 0, value: null, name: "All"}, {id:1, value: true, name:"True"}, {id:2, value:false, name:"False"}];
            $scope.state = $scope.states[0];

            Type.query(function (result) {
                $scope.types = result;
                $scope.types.splice(0, 0, {name: "All", id: -1});
                $scope.type = $scope.types[0];
            });

            $scope.path = "";
        };

        $scope.parseType = function () {
            $scope.loadProducts();
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

