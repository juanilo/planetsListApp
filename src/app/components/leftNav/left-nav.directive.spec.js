'use strict';

describe('Directive : left-nav', function() {
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
        compiledDirective = $compile('<left-nav ></left-nav>')($scope);
        $rootScope.$digest();
    });

    it('Renders the container', function() {
        expect(compiledDirective.html()).toContain("left-nav");
    });

    it('Renders the nav items container', function() {
        expect(compiledDirective.html()).toContain("left-nav__nav");
    });

    xit('Renders link', function() {
        expect(compiledDirective.html()).toContain("left-nav__link");
    });

});