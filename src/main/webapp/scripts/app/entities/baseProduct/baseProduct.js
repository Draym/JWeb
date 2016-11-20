'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('baseProduct', {
                parent: 'entity',
                url: '/baseProducts',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.baseProduct.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/baseProduct/baseProducts.html',
                        controller: 'BaseProductController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('baseProduct');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('baseProduct.detail', {
                parent: 'entity',
                url: '/baseProduct/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.baseProduct.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/baseProduct/baseProduct-detail.html',
                        controller: 'BaseProductDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('baseProduct');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'BaseProduct', function($stateParams, BaseProduct) {
                        return BaseProduct.get({id : $stateParams.id});
                    }]
                }
            })
            .state('baseProduct.new', {
                parent: 'baseProduct',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/baseProduct/baseProduct-dialog.html',
                        controller: 'BaseProductDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    description: null,
                                    image: null,
                                    rating: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('baseProduct', null, { reload: true });
                    }, function() {
                        $state.go('baseProduct');
                    })
                }]
            })
            .state('baseProduct.edit', {
                parent: 'baseProduct',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/baseProduct/baseProduct-dialog.html',
                        controller: 'BaseProductDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['BaseProduct', function(BaseProduct) {
                                return BaseProduct.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('baseProduct', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('baseProduct.delete', {
                parent: 'baseProduct',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/baseProduct/baseProduct-delete-dialog.html',
                        controller: 'BaseProductDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['BaseProduct', function(BaseProduct) {
                                return BaseProduct.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('baseProduct', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
