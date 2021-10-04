(function() {
    'use strict';

    angular
      .module('infi-prateleira')
      .controller('Modulo9_Tela2Controller', Modulo9_Tela2Controller);

    /** @ngInject */
    function Modulo9_Tela2Controller($log, $timeout, Game) {
      var vm = this;

      vm.game = Game;

      Game.resizeWindow();
      Game.showMenu();

      Game.changeMenu(true);

      $timeout(function(){
        Game.finishScreen();
      }, 1000)



    }
    Modulo9_Tela2Controller.$inject = ['$log', '$timeout', 'Game'];
  })();
