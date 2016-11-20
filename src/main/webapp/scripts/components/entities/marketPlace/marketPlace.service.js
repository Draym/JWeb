'use strict';

angular.module('jwebApp')
    .factory('MarketPlace', function ($resource, DateUtils) {
        return $resource('api/marketPlaces/:id', {}, {
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
    }).factory('MarketPlaces', function ($resource, DateUtils) {
        return $resource('api/marketPlaces', {}, {
            'query': {method: 'GET', isArray: true}
        });
    }).factory('myMarketPlace', function ($resource, DateUtils) {
        return $resource('api/myMarketPlace', {}, {
            'query': {method: 'GET'}
        });
    }).factory('MarketPlaceProducts', function ($resource, DateUtils) {
        return $resource('api/marketPlaces/:id/products', {}, {
            'query': {method: 'GET', isArray: true}
        });
    });

