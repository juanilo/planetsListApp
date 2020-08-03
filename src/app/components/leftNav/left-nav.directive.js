(function() {
    'use strict';

    angular
        .module('planetsListApp')
        .directive('leftNav', leftNav);

    function leftNav() {
    var directive = {
        restrict: 'E',
        templateUrl: 'app/components/leftNav/left-nav.html',
        scope: {
            title: '=',
            links: '='
        },
        controller: LeftNavController,
        controllerAs: 'vm',
        bindToController: true
    };


    function LeftNavController() {
        var vm = this;

        vm.$onInit = function activate() {
            // component initialization
        }
    }

    return directive;
  }

})();
