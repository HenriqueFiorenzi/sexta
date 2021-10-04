(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .controller('Modulo5_Tela2Controller', Modulo5_Tela2Controller);

  /** @ngInject */
  function Modulo5_Tela2Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    Game.showMenu();

    /*if(!Game.data.outros.modulo5.screens){
      Game.data.outros.modulo5.screens = [false, false, false, false, false, false, false];
      Game.data.outros.modulo5.currentPage = 0;
    }*/

    vm.started = false;

    vm.screensVisited = Game.data.outros.modulo5.screens || [true, false, true, true, true, true, true];
    vm.currentPage = Game.data.outros.modulo5.currentPage || 0;
    vm.maxPages = 0;
    vm.animating = false;
    vm.scrollDirection = "scrollDown";

    vm.scrollDown = function(){
      $timeout(function(){
        if(vm.currentPage < vm.maxPages - 1 && !vm.animating){
          vm.scrollTo(vm.currentPage + 1)
          /*vm.animating = true;
          vm.scrollDirection = 'scrollDown';
          vm.currentPage += 1;

          vm.screensVisited[vm.currentPage] = true;

          $timeout(function(){
            vm.animating = false;
          },200)*/
        }
      })
    }

    vm.scrollUp = function(){
      $timeout(function(){
        if(vm.currentPage > 0 && !vm.animating){
          vm.scrollTo(vm.currentPage - 1);
          /*vm.animating = true;
          vm.scrollDirection = 'scrollUp';
          vm.currentPage -= 1;

          $timeout(function(){
            vm.animating = false;
          },200)*/
        }
      })
    }

    vm.scrollTo = function(ind){
      if(ind > 0){
        if(!vm.screensVisited[ind - 1]) return;
      }
      $timeout(function(){
        vm.animating = true;
        if(ind > vm.currentPage) vm.scrollDirection = 'scrollDown';
        else  vm.scrollDirection = 'scrollUp';
        vm.currentPage = ind;

        if(vm.currentPage === 2 || vm.currentPage === 3 || vm.currentPage === 4 || vm.currentPage === 6) vm.screensVisited[vm.currentPage] = true;

        if(vm.screensVisited.every(function(el){
          return el
        })){
          Game.finishScreen();
        }

        $timeout(function(){
          vm.animating = false;
        },200)
      })
    }

    vm.checkFinished = function(){
      if(vm.screensVisited.every(function(el){
        return el;
      })){
        Game.finishScreen();
      }
    }

    $timeout(function(){

      var addSubpage = false;
      if(!Game.data.outros.modulo5.tela6){
        Game.data.outros.modulo5.tela6 = [];
        addSubpage = true;
      }
      var subpages = angular.element(".subpage");
      var subpagesNav = angular.element(".subpage-navigation");

      for (var j = 0; j < subpages.length; j++) {
        var subpage = angular.element(subpages[j]);
        if(addSubpage) Game.data.outros.modulo5.tela6.push(j === 0 ? true : false);

        subpage.attr('ng-show', 'vm.currentSelected.tela6 === ' + j);
        //subpage.attr('ng-class', '{current: vm.currentPage === ' + i + '}');

        $compile(subpage)($scope)

        var newNav = angular.element('<div class="subpage-nav" ng-class="{visited: vm.completeds.tela6[' + j + '], current: vm.currentSelected.tela6 === ' + j + '}" ng-click="vm.select(' + "'tela6'" + ', ' + j + ')">' + (j + 1) + '</div>')

        subpagesNav.append(newNav)

      }
      vm.completeds.tela6 = Game.data.outros.modulo5.tela6;
      $compile(subpagesNav)($scope)

      var pages = angular.element(".page");
      var pageMenu = angular.element('.page-menu');
      vm.maxPages = pages.length;

      for (var i = 0; i < pages.length; i++) {
        var page = angular.element(pages[i]);

        //if(i === 0) page.addClass('current')

        page.attr('ng-show', 'vm.currentPage === ' + i);
        //page.attr('ng-class', '{current: vm.currentPage === ' + i + '}');

        $compile(page)($scope)

        var newPageNav = angular.element('<div class="menu-nav" ng-class="{current:vm.currentPage === ' + i + '}" ng-click="vm.scrollTo(' + i + ')"></div>')

        pageMenu.append(newPageNav);
      }

      $compile(pageMenu)($scope);

      $timeout(function(){
        vm.started = true;

        $timeout(function(){

          angular.element('#slick5_1').slick({
            dots:true,
            infinite:false
          });

          angular.element('#slick5_3').slick({
            dots:false,
            infinite:false
          });

          angular.element('#slick5_10').slick({
            dots:false,
            infinite:false
          });

          angular.element('#slick5_16').slick({
            dots:true,
            infinite:false
          });



          //angular.element('#slick5_1').on('afterChange', checkSlick);
          angular.element('#slick5_3').on('afterChange', checkSlick3);
          angular.element('#slick5_10').on('afterChange', checkSlick10);
          angular.element('#slick5_16').on('afterChange', checkSlick16);

        }, 100);
      },500)


      //angular.element(window).on('wheel', function(e){
      window.addEventListener('wheel', function(e) {
        if (e.deltaY > 0){
          vm.scrollDown();
        }else{
          vm.scrollUp();
        }
      })

      angular.element(document).keydown(vm.keyHandler);

    })

    function checkSlick3(event, slick, currentSlide){
      if(slick.currentSlide == slick.slideCount - 1){
        vm.finishSubtela('tela6', 2)
      }
    }
    function checkSlick10(event, slick, currentSlide){
      if(slick.currentSlide == slick.slideCount - 1){
        vm.finishSubtela('tela6', 9)
      }
    }
    function checkSlick16(event, slick, currentSlide){
      if(slick.currentSlide == slick.slideCount - 1){
        vm.finishSubtela('tela6', 15)
      }
    }

    vm.keyHandler = function(e) {
      switch(e.which) {
        case 37: // left
          if(vm.currentPage === 0){
            vm.select('tela1', 1)
          }
          if(vm.currentPage === 1){
            if(vm.currentSelected.tela2 > 0) vm.select('tela2', vm.currentSelected.tela2 - 1)
          }
          if(vm.currentPage === 5){
            if(vm.currentSelected.tela6 > 0) vm.select('tela6', vm.currentSelected.tela6 - 1)
          }
         break;

        case 38: // up
          vm.scrollUp();
          break;

        case 39: // right
          if(vm.currentPage === 0){
            vm.select('tela1', 0)
          }
          if(vm.currentPage === 1){
            if(vm.currentSelected.tela2 < vm.completeds.tela2.length - 1) vm.select('tela2', vm.currentSelected.tela2 + 1)
          }
          if(vm.currentPage === 5){
            if(vm.currentSelected.tela6 < vm.completeds.tela6.length - 1) vm.select('tela6', vm.currentSelected.tela6 + 1)
          }
          break;

        case 40: // down
          vm.scrollDown()
          break;

        default: return;
      }
      e.preventDefault();
    }


    //---------------------------------------------------------
    //--------------------- Interações ------------------------
    //---------------------------------------------------------

    //------------ Funções tela com pops ---------------------

    vm.completeds = {
      //Aquei entram as telas e suas características. Ex:
      //tela2: Game.data.outros.modulo6.tela2
    }
    vm.selecteds = {
      //Aquei entram as telas e suas características. Ex:
      //tela2: Game.data.outros.modulo6.tela2
    }
    vm.currentSelected = {
      //Aqui entram as telas e seus valores de pop. Ex:
      //tela2: -1
    }
    vm.callbacks = {
      //Aqui entram os callbacks quando finalizam os pops. Ex:
      //tela2: function(){
        //Game.finishScreen();
      //}
    }
    vm.nextPulsing = {
      //Aqui entram as telas e seus valores de pop. Ex:
      //tela2: 0
    }

    vm.finishAndGo = function(tela, go){
      $timeout(function(){
        console.log(vm.completeds[tela], vm.currentSelected[tela]);
        vm.completeds[tela][vm.currentSelected[tela]] = true;
        vm.selecteds[tela][vm.currentSelected[tela]] = true;

        vm.select(tela, go);
      })

    }

    vm.finishSubtela = function(tela, subtela){
      if(vm.currentSelected[tela] !== subtela) return;

      $timeout(function(){
        vm.completeds[tela][vm.currentSelected[tela]] = true;
        vm.selecteds[tela][vm.currentSelected[tela]] = true;

        vm.checkCompleted(tela);
      })
    }

    vm.select = function(tela, id, callback, evt){
      $timeout(function(){

        if(id > 0){
          if(id >  vm.completeds[tela].length - 1) return;

          if(!vm.completeds[tela][id - 1]) return;
        }else if(id < 0){
          return;
        }

        if(id === vm.currentSelected[tela]){
          return;
          //vm.currentSelected[tela] = -1;
          //vm.selecteds[tela] = [];
        }else{
          //vm.completeds[tela][id] = true;
          vm.currentSelected[tela] = id;
          vm.selecteds[tela] = [];
          vm.selecteds[tela][id] = true;
        }


        if(angular.isDefined(vm.nextPulsing[tela])){
          vm.nextPulsing[tela] = -1;
          for(var i = 0; i < vm.completeds[tela].length; i++){
            if(!vm.completeds[tela][i]){
              vm.nextPulsing[tela] = i;
              break;
            }
          }
        }

        vm.checkCompleted(tela);

        if(callback){
          $timeout(function(){
            callback();
          }, 200)
        }

        vm.updateSlick();
      })
    }

    vm.checkCompleted = function(tela){
      if(vm.completeds[tela].every(function(el){
        return el;
      })){
        if(vm.callbacks[tela]){
          vm.callbacks[tela]();
          vm.checkFinished();
        }
      }
    }

    vm.updateSlick = function(){
      $timeout(function(){
        angular.element('.slick').slick('refresh')
        $timeout(function(){
          angular.element('.slick').slick('refresh')
        },500)
      })

    }

    vm.close = function(tela){
      $timeout(function(){
        vm.currentSelected[tela] = -1;
      })
    }

    $timeout(function(){
      /*angular.element('#slick5_1').slick({
        dots:true,
        infinite:false
      });*/

      //angular.element('#slick4_2').on('afterChange', checkSlick);
    }, 100);

    //------------ pg1 -----------------------------

    if(!Game.data.outros.modulo5.tela1){
      Game.data.outros.modulo5.tela1 = [false, false];
    }

    vm.completeds.tela1 = Game.data.outros.modulo5.tela1;
    vm.currentSelected.tela1 = -1;
    vm.nextPulsing.tela1 = 0;
    vm.callbacks.tela1 = function(){
      vm.screensVisited[0] = true;
    }

    //------------ pg2 -----------------------------

    if(!Game.data.outros.modulo5.tela2){
      Game.data.outros.modulo5.tela2 = [false, false, false, false, false, false, false];
    }

    vm.completeds.tela2 = Game.data.outros.modulo5.tela2;
    vm.currentSelected.tela2 = -1;
    vm.nextPulsing.tela2 = 0;
    vm.callbacks.tela2 = function(){
      vm.screensVisited[1] = true;
    }

    //------------ pg6 -----------------------------

    if(!Game.data.outros.modulo5.tela6){
      Game.data.outros.modulo5.tela6 = [true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      Game.data.outros.modulo5.tela6sub = [false, true, true, false, false, true, true, false, true, true, true, false, true, true, false, true];
    }

    //vm.completeds.tela6 = Game.data.outros.modulo5.tela6;
    vm.currentSelected.tela6 = 0;
    vm.nextPulsing.tela6 = 0;
    vm.callbacks.tela6 = function(){
      vm.screensVisited[5] = true;
    }


    Game.bfFunction = function(){
      angular.element(document).unbind('keydown', vm.keyHandler);

      angular.element('#slick5_3').off('afterChange', checkSlick3);
      angular.element('#slick5_10').off('afterChange', checkSlick10);
      angular.element('#slick5_16').off('afterChange', checkSlick16);
    }

  }
  Modulo5_Tela2Controller.$inject = ['$log', '$timeout', 'Game'];
})();
