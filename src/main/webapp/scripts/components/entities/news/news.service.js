'use strict';

angular.module('jwebApp')
    .factory('News', function ($resource, DateUtils) {
        return $resource('api/newss/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.date = DateUtils.convertDateTimeFromServer(data.date);
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    }).factory('Newss', function ($resource, DateUtils) {
        return $resource('api/newss', {}, {
            'query': {method: 'GET', isArray: true}
        });
    }).factory('MarketPlaceNews', function ($resource, DateUtils) {
        return $resource('api/marketPlaceNews/:id', {}, {
            'query': {method: 'GET', isArray: true}
        });
    });
