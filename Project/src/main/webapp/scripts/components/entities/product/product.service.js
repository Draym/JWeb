'use strict';

angular.module('jwebApp')
    .factory('Product', function ($resource, DateUtils) {
        return $resource('api/products/:id', {}, {
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
    }).factory('Products', function ($resource, DateUtils) {
        return $resource('api/stackProducts', {}, {
            'query': {method: 'GET', isArray: true}
        });
    }).factory('ProductsById', function ($resource, DateUtils) {
        return $resource('api/stackProducts/:id', {}, {
            'query': {method: 'GET', isArray: true}
        });
    });
