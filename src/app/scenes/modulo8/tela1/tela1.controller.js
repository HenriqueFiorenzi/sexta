(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo8_Tela1Controller', Modulo8_Tela1Controller);

  /** @ngInject */
  function Modulo8_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo8_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
