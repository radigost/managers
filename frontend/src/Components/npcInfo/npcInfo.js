/**
 * Created by user on 05.01.17.
 */
var npcInfoCtrl, tpl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

require('../../Class/factories.js');

tpl = require('./npcInfo.jade');

npcInfoCtrl = (function() {
  function npcInfoCtrl(Restangular, NpcFactory) {
    this.Restangular = Restangular;
    this.NpcFactory = NpcFactory;
    this.$onInit = bind(this.$onInit, this);
  }

  npcInfoCtrl.prototype.$onInit = function() {
    this.npc = this.NpcFactory(this.Restangular);
    return this.npc.selectCurrent(this.id);
  };
  // npcInfoCtrl.prototype.goToTalk = function() {
  //   this.$router.navigate(['Takl',{npcId:this.npc.id}]);
  // }

  // ng-link="['Talk', {npcId: ctrl.npc.id}]"
  return npcInfoCtrl;

})();

angular.module('app').component('npcInfo', {
  template: tpl(),
  controller: ['Restangular', 'NpcFactory', npcInfoCtrl],
  controllerAs: 'ctrl',
  bindings: {
    $router:'<',
    id: '<'
  }
});

// ---
// generated by coffee-script 1.9.2