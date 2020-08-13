(function() {
  'use strict';

  angular
    .module('planetsListApp')
    .directive('paginator', paginator);

  /** @ngInject */
  function paginator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/paginator/paginator.html',
      scope: {
          hasPrev: '=',
          prevAction: '&',
          hasNext: '=',
          nextAction: '&',
          partial: '=',
          total: '<'
      },
      controller: PaginatorController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function PaginatorController() {
        var vm = this;

        vm.$onInit  = function(){}
    }

    return directive;
  }

})();
