(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('pin', pin);

  /** @ngInject */
  function pin($timeout, $rootScope) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/pin/pin.html',
      scope: {
        image:"@",
        hover:"@",
        text:"@",
        twidth:"@"
      },
      controller: pinController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function pinController(){
      var vm = this;

      vm.playSound = function(){
        $rootScope.playSound("btn");
      }

    }
  }
  pin.$inject = ['$timeout', '$rootScope'];

})();
