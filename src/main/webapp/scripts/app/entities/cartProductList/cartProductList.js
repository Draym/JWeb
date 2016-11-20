'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('cartProductList', {
                parent: 'entity',
                url: '/cartProductLists',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.cartProductList.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cartProductList/cartProductLists.html',
                        controller: 'CartProductListController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cartProductList');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('cartProductList.detail', {
                parent: 'entity',
                url: '/cartProductList/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.cartProductList.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cartProductList/cartProductList-detail.html',
                        controller: 'CartProductListDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cartProductList');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'CartProductList', function($stateParams, CartProductList) {
                        return CartProductList.get({id : $stateParams.id});
                    }]
                }
            })
            .state('cartProductList.new', {
                parent: 'cartProductList',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cartProductList/cartProductList-dialog.html',
                        controller: 'CartProductListDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    quantity: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('cartProductList', null, { reload: true });
                    }, function() {
                        $state.go('cartProductList');
                    })
                }]
            })
            .state('cartProductList.edit', {
                parent: 'cartProductList',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cartProductList/cartProductList-dialog.html',
                        controller: 'CartProductListDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['CartProductList', function(CartProductList) {
                                return CartProductList.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('cartProductList', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('cartProductList.delete', {
                parent: 'cartProductList',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cartProductList/cartProductList-delete-dialog.html',
                        controller: 'CartProductListDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['CartProductList', function(CartProductList) {
                                return CartProductList.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('cartProductList', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
