'use strict';

angular.module('jwebApp')
    .factory('Delivery', function ($resource, DateUtils) {
        return $resource('api/deliverys/:id', {}, {
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
    }).factory('myDeliveries', function ($resource, DateUtils) {
        return $resource('api/myDeliveries', {}, {
            'query': {method: 'GET', isArray: true}
        });
    });
