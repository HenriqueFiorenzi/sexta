(function() {
  'use strict';

  angular
    .module('infi-prateleira')
    .directive('dragdrop', dragdrop);

  /** @ngInject */
  function dragdrop($log, $window, $timeout, $rootScope, Util) {
    var directive = {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'app/components/dragdrop/dragdrop.html',
      scope: {
        config: "=",
        id: "@"
      },
      controller: DragdropController,
      controllerAs: "dragdrop",
      bindToController: true
    };

    return directive;

    function DragdropController(){
      var vm = this;
      vm.wnd = angular.element($window);
      vm.feedbackvisible = false;
      vm.feedbacktext = "";
      vm.dragdropstyle = {};
      //vm.config.data.dropped = [];
      //vm.config.data.dragged = [];
      //vm.config.answered = false;

      vm.dragobj = null;
      vm.dragindex = null;

      vm.downpos = null;
      vm.elIniPos = null;
      vm.elSize = {};

      for (var i = 0; i < vm.config.dragables.length; i++) {
        vm.config.dragables[i].x = vm.config.dragables[i].inix;
        vm.config.dragables[i].y = vm.config.dragables[i].iniy;
        vm.config.dragables[i].key = i;
      }

      for (i = 0; i < vm.config.data.dropped.length; i++) {
        if(vm.config.data.dropped[i] != undefined){
          var dragindex = vm.config.data.dropped[i];
          vm.config.dragables[dragindex].x = vm.config.dropables[i].left;
          vm.config.dragables[dragindex].y = vm.config.dropables[i].top;
          vm.config.dragables[dragindex].key = i;
        }
      }

      vm.startDragging = function(e){
        e.stopPropagation();
        e.preventDefault();
        vm.dragobj = angular.element(this);
        vm.dragobj.addClass("dragging-obj");
        vm.dragindex = parseInt(vm.dragobj.attr('data-inarray'));

        if(vm.config.data.dragged[vm.dragindex] != undefined){
          //$log.debug("drop index: " + vm.config.data.dragged[vm.dragindex]);
          //$log.debug("drop value: " + vm.config.data.dropped[vm.config.data.dragged[vm.dragindex]]);
          var dropindex = vm.config.data.dragged[vm.dragindex];
          delete vm.config.data.dropped[dropindex];
          delete vm.config.data.dragged[vm.dragindex];
        }

        vm.downpos = Util.getEventPosition(e);
        vm.elIniPos = vm.dragobj.position();
        //vm.elSize.w = vm.dragobj.width();
        //vm.elSize.h = vm.dragobj.height();
        //var pos = vm.dragobj.position();//Util.getEventPosition(e);
        //vm.objOffset.x = pos.x - vm.dragobj.offset().left;
        //vm.objOffset.y = pos.y - vm.dragobj.offset().top;
        //$log.debug(pos);
        vm.wnd.bind("mousemove touchmove", vm.dragging);
        vm.wnd.bind("mouseup touchend", vm.stopDragging);
      }

      vm.dragging = function(e){
        e.preventDefault();
        var mousePos = Util.getEventPosition(e);
        var delta = {
          x:mousePos.x - vm.downpos.x,
          y:mousePos.y - vm.downpos.y
        }
        var newPos = {
          x:(vm.elIniPos.left + delta.x) / $rootScope.rootScale,
          y:(vm.elIniPos.top + delta.y) / $rootScope.rootScale
        }
        //$log.debug(pos);
        //vm.dragobj.css("left", Math.max(Math.min(newPos.x, (vm.ddsize.w - vm.config.width)), 0));
        //vm.dragobj.css("top", Math.max(Math.min(newPos.y, (vm.ddsize.h - vm.config.height)), 0));
        $timeout(function(){
          vm.config.dragables[vm.dragindex].x = Math.max(Math.min(newPos.x, 1170 - vm.config.width/*(vm.ddsize.w - vm.config.width)*/), 0);
          vm.config.dragables[vm.dragindex].y = Math.max(Math.min(newPos.y, 800 - vm.config.height/*(vm.ddsize.h - vm.config.height)*/), 0);
        })
      }
      vm.stopDragging = function(e){
        e.preventDefault();
        vm.dragobj.removeClass("dragging-obj");
        var mousePos = Util.getEventPosition(e);
        vm.wnd.unbind("mousemove touchmove", vm.dragging);
        vm.wnd.unbind("mouseup touchend", vm.stopDragging);

        //vm.dragobj = null;
        //vm.downpos = null;
        //vm.elIniPos = null;

        vm.checkDropPosition(mousePos);
      }


      vm.checkDropPosition = function(){
        var minDist = 10000;
        var dropindex = -1;
        for (var i = 0; i < vm.config.dropables.length; i++) {
          //$log.debug(vm.config.dropables[i].x, vm.config.dropables[i].y, vm.config.dragables[vm.dragindex].x, vm.config.dragables[vm.dragindex].y);
          var dist = Util.distance(vm.config.dropables[i].left, vm.config.dropables[i].top, vm.config.dragables[vm.dragindex].x, vm.config.dragables[vm.dragindex].y);
          //$log.debug(dist);
          if(dist < minDist){
            minDist = dist;
            dropindex = i;
          }
        }

        if(minDist < vm.config.width * $rootScope.rootScale){
          if(vm.config.data.dropped[dropindex] != undefined){
            var dragindex = vm.config.data.dropped[dropindex];
            $timeout(function(){
              vm.config.dragables[dragindex].x = vm.config.dragables[dragindex].inix;
              vm.config.dragables[dragindex].y = vm.config.dragables[dragindex].iniy;
            })

            delete vm.config.data.dragged[dragindex];
            delete vm.config.data.dropped[dropindex];
          }
          vm.config.data.dropped[dropindex] = vm.dragindex;
          console.log(vm.config.data.dropped[dropindex]);
          vm.config.data.dragged[vm.dragindex] = dropindex;
          $timeout(function(){
            vm.config.dragables[vm.dragindex].x = vm.config.dropables[dropindex].left;
            vm.config.dragables[vm.dragindex].y = vm.config.dropables[dropindex].top;
          })
        }else{
          $timeout(function(){
            vm.config.dragables[vm.dragindex].x = vm.config.dragables[vm.dragindex].inix;
            vm.config.dragables[vm.dragindex].y = vm.config.dragables[vm.dragindex].iniy;
          })
        }
        //$log.debug(vm.config.data.dropped.length);
      }

      vm.checkDragdrop = function(){
        var dropcount = 0;
        for (var i = 0; i < vm.config.data.dropped.length; i++) {
          if(vm.config.data.dropped[i] != undefined) dropcount++;
        }
        if(dropcount == vm.config.dropables.length){
          //todas os espaços preenchidos
          vm.dragables.unbind("mousedown touchstart", vm.startDragging);
          vm.dragables.css("cursor", "default");
          vm.config.data.answered = true;

          var correct = vm.eval();

          vm.config.data.score = correct/vm.config.data.dropped.length;
          vm.continue();
          //vm.feedbacktext = "Você acertou " + correct + " de " + vm.config.data.dropped.length;

          //$log.debug(correct);
        }else{
          //atividade incompleta
          //vm.feedbacktext = "Você precisa arrastar todos os elementos para terminar.";
        }
        //vm.showFeedback();

      }

      vm.eval = function(){
        var correct = 0;
        for (var i = 0; i < vm.config.data.dropped.length; i++) {
          var dropid = i;
          var dragid = vm.config.data.dropped[i];
          if(Array.isArray(vm.config.answers[dropid])){
            if(vm.config.answers[dropid].indexOf(dragid) >= 0){
              correct++;
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('correct');
            }else{
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('incorrect');
            }
          }else{
            if(vm.config.answers[dropid] == dragid){
              correct++;
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('correct');
            }else{
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('incorrect');
            }
          }
        }

        return correct;
      }

      vm.configCorrect = function(){
        var posicionados = [];
        var dragindex = 0;
        for (var i = 0; i < vm.config.answers.length; i++) {
          if(Array.isArray(vm.config.answers[i])){
            for (var j = 0; j < vm.config.answers[i].length; j++) {
              var ind = vm.config.answers[i][j];
              if(posicionados.indexOf(ind) < 0){
                dragindex = ind;
                vm.config.dragables[dragindex].x = vm.config.dropables[i].left;
                vm.config.dragables[dragindex].y = vm.config.dropables[i].top;
                posicionados.push(ind);
                break;
              }
            }

          }else{
            dragindex = vm.config.answers[i];
            vm.config.dragables[dragindex].x = vm.config.dropables[i].left;
            vm.config.dragables[dragindex].y = vm.config.dropables[i].top;
          }
        }

        for (i = 0; i < vm.config.answers.length; i++) {
          var dropid = i;
          var dragid = vm.config.data.dropped[i];

          angular.element("#drag-" + vm.config.dragables[dragid].key).removeClass('correct');
          angular.element("#drag-" + vm.config.dragables[dragid].key).removeClass('incorrect');

          angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('correct');
        }
      }

      vm.configAnswered = function(){
        for (var i = 0; i < vm.config.data.dropped.length; i++) {
          if(vm.config.data.dropped[i] != undefined){
            var dragindex = vm.config.data.dropped[i];
            vm.config.dragables[dragindex].x = vm.config.dropables[i].left;
            vm.config.dragables[dragindex].y = vm.config.dropables[i].top;
          }
        }

        for (i = 0; i < vm.config.answers.length; i++) {
          var dropid = i;
          var dragid = vm.config.data.dropped[i];

          angular.element("#drag-" + vm.config.dragables[dragid].key).removeClass('correct');
          angular.element("#drag-" + vm.config.dragables[dragid].key).removeClass('incorrect');

          if(Array.isArray(vm.config.answers[dropid])){
            if(vm.config.answers[dropid].indexOf(dragid) >= 0){
              //correct++;
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('correct');
            }else{
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('incorrect');
            }
          }else{
            if(vm.config.answers[dropid] == dragid){
              //correct++;
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('correct');
            }else{
              angular.element("#drag-" + vm.config.dragables[dragid].key).addClass('incorrect');
            }
          }
        }
      }

      vm.showFeedback = function(){
        vm.feedbackvisible = true;
        vm.configCorrect();
      }

      vm.closeFeedback = function(){
        vm.feedbackvisible = false;
        vm.configAnswered();
      }

      vm.continue = function(){
        //$log.debug(vm.config.callback);
        if(vm.config.callback) vm.config.callback();
      }

      vm.config.update = function(){
        //$log.debug(vm.config)
        if(vm.config.x != undefined) vm.dragdropstyle.left = vm.config.x + "px";
        if(vm.config.y != undefined) vm.dragdropstyle.top = vm.config.y + "px";
        if(vm.config.r != undefined) vm.dragdropstyle.right = vm.config.r + "px";
        if(vm.config.b != undefined) vm.dragdropstyle.bottom = vm.config.b + "px";
      }

      vm.config.update();


      $timeout(function() {

        if(vm.config.data.answered){
          vm.eval();
        }else{
          vm.dragables = angular.element(".dragable");
          vm.dragables.bind("mousedown touchstart", vm.startDragging);
          vm.dragables.css("cursor", "pointer");
          vm.dd = angular.element("#" + vm.id + " .dragdrop");
          vm.ddsize = {
            w: vm.dd.width()/$rootScope.rootScale,
            h: vm.dd.height()/$rootScope.rootScale
          }
        }
        //$log.debug(vm.dd.width());
      }, 1000);

      vm.random = function() {
        return 0.5 - Math.random();
      }

    }
  }
  dragdrop.$inject = ['$log', '$window', '$timeout', '$rootScope', 'Util'];
})();
