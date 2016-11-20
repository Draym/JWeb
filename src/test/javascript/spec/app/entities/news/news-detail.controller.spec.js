'use strict';

describe('News Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockNews, MockMarketPlace;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockNews = jasmine.createSpy('MockNews');
        MockMarketPlace = jasmine.createSpy('MockMarketPlace');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'News': MockNews,
            'MarketPlace': MockMarketPlace
        };
        createController = function() {
            $injector.get('$controller')("NewsDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'jwebApp:newsUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
