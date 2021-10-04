(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo5_Tela6Controller', Modulo5_Tela6Controller);

  /** @ngInject */
  function Modulo5_Tela6Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo5_Tela6Controller.$inject = ['$log', '$timeout', 'Game'];
})();
