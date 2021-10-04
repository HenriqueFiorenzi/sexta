(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('btn', btn);

  /** @ngInject */
  function btn($timeout, $rootScope) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/btn/btn.html',
      scope: {
        image: '@'
      },
      controller: btnController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function btnController(){
      var vm = this;

      vm.imgClass = String(vm.image);

      vm.playSound = function(evt){
        if(angular.element(evt.target).hasClass("btn-cover")){
          $rootScope.playSound("btn");
        }
      }

    }
  }
  btn.$inject = ['$timeout', '$rootScope'];

})();
