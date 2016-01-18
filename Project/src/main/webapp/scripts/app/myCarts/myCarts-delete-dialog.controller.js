'use strict';

angular.module('jwebApp')
	.controller('MyCartsDeleteController', function($scope, $uibModalInstance, entity, Cart, cartProducts, CartProductList) {

        $scope.cart = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.deleteCartProducts = function(id, callback) {
            cartProducts.query({id: id}, function (result) {

                if (result.length != 0) {
                    angular.forEach(result, function (item) {
                        CartProductList.delete({id: item.id}, function () {
                            callback(id);
                        });
                    });
                } else {
                    callback(id);
                }
            });
        };

        $scope.deleteCart = function(id) {
            cartProducts.query({id: id}, function (result) {
            if (result.length == 0) {
                Cart.delete({id: id},
                    function () {
                        $uibModalInstance.close(true);
                    });
            }});
        };

        $scope.confirmDelete = function (id) {
            $scope.deleteCartProducts(id, $scope.deleteCart);
        };
    });
