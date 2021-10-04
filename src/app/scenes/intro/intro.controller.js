(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('IntroController', IntroController);

  /** @ngInject */
  function IntroController($log, $timeout, $window, Game, $rootScope) {
    var vm = this;

    //Game.resizeWindow();
    Game.showMenu();

    vm.currentItem = 0;

    vm.continue = function(){
      //Game.gotoTela(0,0);
      Game.data.iniciated = true;
      //Game.gotoMenu();
      Game.gotoTela(0,1);
    }

  }
  IntroController.$inject = ['$log', '$timeout', '$window', 'Game', '$rootScope'];
})();
