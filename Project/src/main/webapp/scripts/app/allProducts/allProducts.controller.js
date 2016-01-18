'use strict';

angular.module('jwebApp')
    .controller('AllProductsController', function ($scope, Products, Types) {

        $scope.loadProducts = function () {
            $scope.unparsedProducts = [];
            $scope.products = [];
            Products.query(function (result) {
                for (var i = 0; i < result.length; ++i) {
                    $scope.unparsedProducts.push(toArray(result[i]));
                }
                for (i = 0; i < $scope.unparsedProducts.length; ++i) {
                    $scope.unparsedProducts[i].sort(compareProducts);
                    $scope.products.push($scope.unparsedProducts[i]);
                }
                for (i = 0; i < $scope.products.length; ++i) {
                    if ($scope.products[i].length > 0) {
                        if (($scope.type.id != -1 && $scope.products[i][0].baseProduct.type.id !== $scope.type.id)
                            || !$scope.products[i][0].baseProduct.name.toLowerCase().includes($scope.path.toLowerCase())) {
                            $scope.products.splice(i, 1);
                            --i;
                        }
                    }
                }
            });
        };

        $scope.loadParser = function () {
            $scope.types = [];
            $scope.type = {id: -1, name: "All"};

            Types.query(function (result) {
                $scope.types = result;
                $scope.types.splice(0, 0, {name: "All", id: -1});
                $scope.type = $scope.types[0];
            });

            $scope.path = "";
        };

        $scope.parseType = function () {
            $scope.loadProducts();
        };

        $scope.parseName = function () {
            $scope.loadProducts();
        };

        $scope.loadAll = function () {
            $scope.loadParser();
            $scope.loadProducts();
        };

        function toArray(a) {
            var result = [];

            for (var i in a) {
                if (a.hasOwnProperty(i)) {
                    result.push(a[i]);
                }
            }
            return result;
        }

        function compareProducts(a, b) {
            if (a.stock === 0)
                return 1;
            else if (b.stock === 0)
                return -1;
            else if (a.id === 3)
                return 1;
            else if (b.id === 3)
                return -1;
            else if (a.price < b.price)
                return -1;
            else
                return 1;
        }

        $scope.loadAll();

        $scope.refresh = function () {
            $scope.loadAll();
        };
    });
