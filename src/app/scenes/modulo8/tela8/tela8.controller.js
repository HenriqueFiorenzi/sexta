(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo8_Tela8Controller', Modulo8_Tela8Controller);

  /** @ngInject */
  function Modulo8_Tela8Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo8_Tela8Controller.$inject = ['$log', '$timeout', 'Game'];
})();
