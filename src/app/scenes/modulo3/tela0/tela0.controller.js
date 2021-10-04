(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo3_Tela0Controller', Modulo3_Tela0Controller);

  /** @ngInject */
  function Modulo3_Tela0Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo3_Tela0Controller.$inject = ['$log', '$timeout', 'Game'];
})();
