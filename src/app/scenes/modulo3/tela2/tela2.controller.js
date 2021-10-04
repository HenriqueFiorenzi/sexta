(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo3_Tela2Controller', Modulo3_Tela2Controller);

  /** @ngInject */
  function Modulo3_Tela2Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    //Game.plantahide();

    Game.changeMenu(true);

    vm.openSlick = function(id){
      $timeout(function(){
        angular.element('#slick1'+id).slick({
          dots:true,
          infinite:false
        });
      }, 100);
    }
    angular.element('.click').mouseover(function () {
      var pop = this.className.replace("click pop", "");
      angular.element('#imga' + pop).addClass("active");
    });
    angular.element('.click').mouseout(function () {
      var pop = this.className.replace("click pop", "");
      angular.element('#imga' + pop).removeClass("active");
      console.log(pop);
    });

    //Game.data.outros.modulo3.tela2 = [false, false, false, false, false, false, false];

    if(!Game.data.outros.modulo3.tela2){
      Game.data.outros.modulo3.tela2 = [false, false, false, false, false, false, false];
    }

    vm.completeds = Game.data.outros.modulo3.tela2;

    vm.currentPop = -1;

    function isTrue(el){
      return el;
    }

    vm.select = function(id){
      Game.hideMenu();
      // Game.unlockAvancar();
      // Game.unlockVoltar();
      vm.openSlick(id);
      $timeout(function(){
        vm.completeds[id] = true;
        vm.currentPop = id;
        if(vm.completeds.every(isTrue)){
          Game.finishScreen();
        }
      })
    }

    vm.closePop = function(){
      $timeout(function(){
        Game.showMenu();
        vm.currentPop = -1;
      })
    }


  }
  Modulo3_Tela2Controller.$inject = ['$log', '$timeout', 'Game'];
})();
