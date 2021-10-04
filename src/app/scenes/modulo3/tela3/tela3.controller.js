(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo3_Tela3Controller', Modulo3_Tela3Controller);

  /** @ngInject */
  function Modulo3_Tela3Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.resizeWindow();
    Game.showMenu();
    Game.changeMenu(false);

    // $timeout(function(){

    //   angular.element('.slick2').slick({
    //     dots:true,
    //     infinite:false
    //   });

    //   angular.element('#slick2').on('afterChange', function(event, slick, direction){
    //     if(slick.currentSlide == slick.slideCount - 1){
    //       Game.finishScreen();
    //     }
    //   });

    // }, 500);

    $timeout(function(){
      Game.finishScreen();
    }, 1000)

  }
  Modulo3_Tela3Controller.$inject = ['$log', '$timeout', 'Game'];
})();
