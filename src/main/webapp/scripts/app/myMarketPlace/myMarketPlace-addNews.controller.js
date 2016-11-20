'use strict';

angular.module('jwebApp').controller('MyMarketPlaceAddNewsController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'News', 'myMarketPlace',
        function($scope, $stateParams, $uibModalInstance, entity, News, myMarketPlace) {

            $scope.news = entity;

            $scope.loadAll = function () {
                $scope.news.date = new Date();
                myMarketPlace.query(function(result){
                    $scope.news.marketPlace = result;
                });
            };

            $scope.loadAll();

            var onSaveSuccess = function (result) {
                $scope.$emit('jwebApp:newsUpdate', result);
                $uibModalInstance.close(result);
                $scope.isSaving = false;
            };

            var onSaveError = function (result) {
                $scope.isSaving = false;
            };

            $scope.save = function () {
                $scope.isSaving = true;
                if ($scope.news.id != null) {
                    News.update($scope.news, onSaveSuccess, onSaveError);
                } else {
                    News.save($scope.news, onSaveSuccess, onSaveError);
                }
            };

            $scope.clear = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }]);
