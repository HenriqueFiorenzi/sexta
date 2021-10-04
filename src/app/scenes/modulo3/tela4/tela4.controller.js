(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo3_Tela4Controller', Modulo3_Tela4Controller);

  /** @ngInject */
  function Modulo3_Tela4Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo3_Tela4Controller.$inject = ['$log', '$timeout', 'Game'];
})();
