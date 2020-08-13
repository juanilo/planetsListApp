'use strict';

describe('Directive : paginator', function() {
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
        compiledDirective = $compile('<paginator></paginator>')($scope);
        $rootScope.$digest();
    });

    it('Renders the container', function() {
        expect(compiledDirective.html()).toContain("paginator");
    });

    it('Renders the left link', function() {
        expect(compiledDirective.html()).toContain("paginator__left");
    });

    it('Renders the right link', function() {
        expect(compiledDirective.html()).toContain("paginator__right");
    });

});
