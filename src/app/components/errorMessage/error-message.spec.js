'use strict';

describe('Directive : error-message', function() {
    var $compile,
        $rootScope,
        $scope,
        compiledDirective;

    beforeEach(module('planetsListApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $scope = $rootScope.$new();
        compiledDirective = $compile('<error-message></error-message>')($scope);
        $rootScope.$digest();
    });

    it('Renders the container', function() {
        expect(compiledDirective.html()).toContain("error-message");
    });

    it('Renders the title', function() {
        expect(compiledDirective.html()).toContain("error-message__title");
    });

    it('Renders the retry button', function() {
        expect(compiledDirective.html()).toContain("error-message__retry");
    });

});
