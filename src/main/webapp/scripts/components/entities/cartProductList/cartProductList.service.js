'use strict';

angular.module('jwebApp')
    .factory('CartProductList', function ($resource, DateUtils) {
        return $resource('api/cartProductLists/:id', {}, {
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
    });
