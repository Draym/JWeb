'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('subscription', {
                parent: 'entity',
                url: '/subscriptions',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.subscription.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subscription/subscriptions.html',
                        controller: 'SubscriptionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('subscription');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('subscription.detail', {
                parent: 'entity',
                url: '/subscription/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'jwebApp.subscription.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/subscription/subscription-detail.html',
                        controller: 'SubscriptionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('subscription');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Subscription', function($stateParams, Subscription) {
                        return Subscription.get({id : $stateParams.id});
                    }]
                }
            })
            .state('subscription.new', {
                parent: 'subscription',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subscription/subscription-dialog.html',
                        controller: 'SubscriptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    idMarketPlace: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('subscription', null, { reload: true });
                    }, function() {
                        $state.go('subscription');
                    })
                }]
            })
            .state('subscription.edit', {
                parent: 'subscription',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subscription/subscription-dialog.html',
                        controller: 'SubscriptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Subscription', function(Subscription) {
                                return Subscription.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('subscription', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('subscription.delete', {
                parent: 'subscription',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/subscription/subscription-delete-dialog.html',
                        controller: 'SubscriptionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Subscription', function(Subscription) {
                                return Subscription.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('subscription', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
