'use strict';

angular.module('jwebApp')
    .factory('BaseProduct', function ($resource, DateUtils) {
        return $resource('api/baseProducts/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    }).factory('BaseProducts', function ($resource, DateUtils) {
        return $resource('api/allBaseProducts', {}, {
            'query': {method: 'GET', isArray: true}
        });
    });
