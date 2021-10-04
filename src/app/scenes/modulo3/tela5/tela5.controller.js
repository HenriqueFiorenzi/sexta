(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo3_Tela5Controller', Modulo3_Tela5Controller);

  /** @ngInject */
  function Modulo3_Tela5Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(true);



    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo3_Tela5Controller.$inject = ['$log', '$timeout', 'Game'];
})();
