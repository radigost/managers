/**
 * Created by user on 05.01.17.
 */
var profileCtrl, tpl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

tpl = require('./profile.jade');

require('../gameService.ts');

profileCtrl = (function() {
  function profileCtrl(service, Restangular) {
    this.service = service;
    this.Restangular = Restangular;
    this.$onInit = bind(this.$onInit, this);
  }

  profileCtrl.prototype.$onInit = function() {};

  return profileCtrl;

})();

angular.module('app').component('profile', {
  template: tpl(),
  controller: ['gameService', 'Restangular', profileCtrl],
  controllerAs: 'ctrl',
  bindings: {
    $router: '<'
  }
});

// ---
// generated by coffee-script 1.9.2