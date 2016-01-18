'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('promotion', {
                parent: 'entity',
                url: '/promotions',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.promotion.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/promotion/promotions.html',
                        controller: 'PromotionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('promotion');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('promotion.detail', {
                parent: 'entity',
                url: '/promotion/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.promotion.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/promotion/promotion-detail.html',
                        controller: 'PromotionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('promotion');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Promotion', function($stateParams, Promotion) {
                        return Promotion.get({id : $stateParams.id});
                    }]
                }
            })
            .state('promotion.new', {
                parent: 'promotion',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/promotion/promotion-dialog.html',
                        controller: 'PromotionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    percent: null,
                                    reduction: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('promotion', null, { reload: true });
                    }, function() {
                        $state.go('promotion');
                    })
                }]
            })
            .state('promotion.edit', {
                parent: 'promotion',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/promotion/promotion-dialog.html',
                        controller: 'PromotionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Promotion', function(Promotion) {
                                return Promotion.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('promotion', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('promotion.delete', {
                parent: 'promotion',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/promotion/promotion-delete-dialog.html',
                        controller: 'PromotionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Promotion', function(Promotion) {
                                return Promotion.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('promotion', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
