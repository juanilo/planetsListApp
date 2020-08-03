(function() {
  'use strict';

    angular
        .module('planetsListApp')
        .directive('listSw', listSW);

    /** @ngInject */
    function listSW() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/listSw/list-sw.html',
            scope: {
                elements: '=',
                sorts: '=',
                defaultSort: '='
            },
            controller: ListSWController,
            controllerAs: 'vm',
            bindToController: true
        };

        ListSWController.$inject = [];

        function ListSWController() {
            var vm = this;

            vm.$onInit = function $onInit() {
                vm.error = false;
                vm.orderReverse = false;
            }
        }

        return directive;
    }

})();
