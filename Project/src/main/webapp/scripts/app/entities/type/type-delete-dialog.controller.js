'use strict';

angular.module('jwebApp')
	.controller('TypeDeleteController', function($scope, $uibModalInstance, entity, Type) {

        $scope.type = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Type.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
