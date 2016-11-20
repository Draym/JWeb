'use strict';

angular.module('jwebApp').controller('TypeDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Type', 'BaseProduct',
        function($scope, $stateParams, $uibModalInstance, entity, Type, BaseProduct) {

        $scope.type = entity;
        $scope.baseproducts = BaseProduct.query();
        $scope.load = function(id) {
            Type.get({id : id}, function(result) {
                $scope.type = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jwebApp:typeUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.type.id != null) {
                Type.update($scope.type, onSaveSuccess, onSaveError);
            } else {
                Type.save($scope.type, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
