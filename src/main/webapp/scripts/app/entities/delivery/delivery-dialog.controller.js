'use strict';

angular.module('jwebApp').controller('DeliveryDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Delivery', 'Status', 'Payment', 'User', 'Cart',
        function($scope, $stateParams, $uibModalInstance, $q, entity, Delivery, Status, Payment, User, Cart) {

        $scope.delivery = entity;
        $scope.statuss = Status.query();
        $scope.payments = Payment.query();
        $scope.users = User.query();
        $scope.carts = Cart.query({filter: 'delivery-is-null'});
        $q.all([$scope.delivery.$promise, $scope.carts.$promise]).then(function() {
            if (!$scope.delivery.cart || !$scope.delivery.cart.id) {
                return $q.reject();
            }
            return Cart.get({id : $scope.delivery.cart.id}).$promise;
        }).then(function(cart) {
            $scope.carts.push(cart);
        });
        $scope.load = function(id) {
            Delivery.get({id : id}, function(result) {
                $scope.delivery = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jwebApp:deliveryUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.delivery.id != null) {
                Delivery.update($scope.delivery, onSaveSuccess, onSaveError);
            } else {
                Delivery.save($scope.delivery, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
