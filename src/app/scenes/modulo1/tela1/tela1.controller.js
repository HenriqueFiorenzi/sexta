(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo1_Tela1Controller', Modulo1_Tela1Controller);

  /** @ngInject */
  function Modulo1_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    //Game.resizeWindow();
    //Game.showMenu();

    if(!Game.data.outros.modulo1.items){
      Game.data.outros.modulo1 = {
        currentItem: 0,
        items: [true, false, false, false, false, false, false, false]
      }
    }

    vm.currentItem = Game.data.outros.modulo1.currentItem || 0;
    vm.items = Game.data.outros.modulo1.items || [true, false, false, false, false, false, false, false];


    vm.select = function(id){
      if(id > 0){
        if(!vm.items[id - 1]) return;
      }
      $timeout(function(){
        vm.currentItem = id;

        vm.items[id] = true;

        if(vm.items.every(function(el){
          return el;
        }))
        {
          console.log("finalizou p1");
          Game.finishScreen();
        }
      })
    }

  }
  Modulo1_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
