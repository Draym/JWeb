'use strict';

angular.module('jwebApp').controller('MarketPlaceDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'MarketPlace', 'News', 'User', 'Product',
        function($scope, $stateParams, $uibModalInstance, $q, entity, MarketPlace, News, User, Product) {

        $scope.marketPlace = entity;
        $scope.newss = News.query();
        $scope.users = User.query();
        $scope.products = Product.query();
        $scope.load = function(id) {
            MarketPlace.get({id : id}, function(result) {
                $scope.marketPlace = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('jwebApp:marketPlaceUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.marketPlace.id != null) {
                MarketPlace.update($scope.marketPlace, onSaveSuccess, onSaveError);
            } else {
                MarketPlace.save($scope.marketPlace, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
