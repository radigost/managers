/**
 * Created by user on 05.01.17.
 */
var companyDetailCtrl, tpl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

tpl = require('./companyDetail.jade');

require('../../Components/npcInfo/npcInfo.js');

require('../gameService.ts');

companyDetailCtrl = (function() {
  function companyDetailCtrl(service, company) {
    this.service = service;
    this.company = company;
    this.goToTalk = bind(this.goToTalk, this);
    this.$routerOnActivate = bind(this.$routerOnActivate, this);
    this.gameName = "Экран информации о компании";
  }

  companyDetailCtrl.prototype.$routerOnActivate = function(next) {
    return this.company.selectCurrent(next.params.companyId);
  };

  companyDetailCtrl.prototype.goToTalk = function(id) {
    return this.$router.navigate([
      'Talk', {
        npcId: id
      }
    ]);
  };

  return companyDetailCtrl;

})();

angular.module('app').component('companyDetail', {
  template: tpl(),
  controller: ['gameService', 'Company', companyDetailCtrl],
  controllerAs: 'ctrl',
  bindings: {
    $router: '<'
  },
  // $routeConfig:[]
}).value('$routerRootComponent', 'app');

