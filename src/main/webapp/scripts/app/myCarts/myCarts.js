'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('myCarts', {
                parent: 'site',
                url: '/MyCarts',
                data: {
                    pageTitle: 'jwebApp.mycarts.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myCarts/myCarts.html',
                        controller: 'MyCartsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('delivery');
                        return $translate.refresh();
                    }]
                }
            }).state('myCarts.detail', {
                parent: 'myCarts',
                url: '/{id}/detail',
                data: {
                    pageTitle: 'jwebApp.mycarts.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/myCarts/myCarts-detail.html',
                        controller: 'MyCartsDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cart');
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('product');
                        $translatePartialLoader.addPart('delivery');
                        return $translate.refresh();
                    }]
                }
            }).state('myCarts.new', {
                parent: 'myCarts',
                url: '/new',
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myCarts/myCarts-dialog.html',
                        controller: 'MyCartsDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    id: null
                                };
                            }
                        }
                    }).result.then(function (result) {
                            $state.go('myCarts', null, {reload: true});
                        }, function () {
                            $state.go('myCarts');
                        })
                }]
            }).state('myCarts.delete', {
                parent: 'myCarts',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myCarts/myCarts-delete-dialog.html',
                        controller: 'MyCartsDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Cart', function (Cart) {
                                return Cart.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('myCarts', null, {reload: true});
                        }, function () {
                            $state.go('myCarts');
                        })
                }]
            }).state('myCarts.addProduct', {
                parent: 'myCarts',
                url: '/{id}/addProduct/{nbr}',
                onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/myCarts/myCarts-addProduct.html',
                        controller: 'MyCartsAddProductController',
                        size: 'lg',
                        resolve: {
                            entity: ['Product', function (Product) {
                                return Product.get({id: $stateParams.id});
                            }]
                        }
                    }).result.then(function (result) {
                            $state.go('myCarts', null, {reload: true});
                        }, function () {
                            $state.go('myCarts');
                        })
                }]
            });
    });
