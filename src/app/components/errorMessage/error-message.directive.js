(function() {
  'use strict';

  angular
    .module('planetsListApp')
    .directive('errorMessage', ErrorMessage);

  function ErrorMessage() {
    var directive = {
        restrict: 'E',
        templateUrl: 'app/components/errorMessage/error-message.html',
        scope: {
            retry: '&'
        },
        controller : ErrorMessageController,
        controllerAs: 'vm',
        bindToController: true
    };


    function ErrorMessageController() {
        var vm = this;

        vm.$onInit = function activate() {
            // component initialization
        }
    }

    return directive;
  }

})();
