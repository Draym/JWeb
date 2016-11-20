'use strict';

angular.module('jwebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('type', {
                parent: 'entity',
                url: '/types',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.type.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/type/types.html',
                        controller: 'TypeController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('type');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('type.detail', {
                parent: 'entity',
                url: '/type/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'jwebApp.type.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/type/type-detail.html',
                        controller: 'TypeDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('type');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Type', function($stateParams, Type) {
                        return Type.get({id : $stateParams.id});
                    }]
                }
            })
            .state('type.new', {
                parent: 'type',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/type/type-dialog.html',
                        controller: 'TypeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('type', null, { reload: true });
                    }, function() {
                        $state.go('type');
                    })
                }]
            })
            .state('type.edit', {
                parent: 'type',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/type/type-dialog.html',
                        controller: 'TypeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Type', function(Type) {
                                return Type.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('type', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('type.delete', {
                parent: 'type',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/type/type-delete-dialog.html',
                        controller: 'TypeDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Type', function(Type) {
                                return Type.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('type', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
