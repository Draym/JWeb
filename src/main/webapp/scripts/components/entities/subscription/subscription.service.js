'use strict';

angular.module('jwebApp')
    .factory('Subscription', function ($resource, DateUtils) {
        return $resource('api/subscriptions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
