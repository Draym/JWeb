'use strict';

angular.module('jwebApp')
    .controller('ProductListDetailController', function ($scope, $rootScope, $stateParams, Product, ProductsById) {

        $scope.quantity = 1;

        $scope.loadAll = function () {
            $scope.products = [];
            $scope.product = {};

            Product.get({id: $stateParams.id}, function (result) {
                $scope.product = result;
                ProductsById.query({id: $scope.product.baseProduct.id}, function (result) {
                    $scope.products = result;
                    $scope.products.sort(compareProducts);
                });
            });
        };

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
    });
