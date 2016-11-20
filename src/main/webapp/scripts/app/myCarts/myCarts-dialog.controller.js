'use strict';

angular.module('jwebApp').controller('MyCartsDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Cart', 'myUser',
        function ($scope, $stateParams, $uibModalInstance, entity, Cart, myUser) {

            $scope.cart = entity;

            myUser.query(function(result) {
                $scope.cart.user = result;
            });
            $scope.load = function(id) {
                Cart.get({id : id}, function(result) {
                    $scope.cart = result;
                });
            };

            var onSaveFinished = function (result) {
                $scope.$emit('jwebApp:cartUpdate', result);
                $uibModalInstance.close(result);
            };

            $scope.save = function () {
                if ($scope.cart.id != null) {
                    Cart.update($scope.cart, onSaveFinished);
                } else {
                    Cart.save($scope.cart, onSaveFinished);
                }
            };

            $scope.clear = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
