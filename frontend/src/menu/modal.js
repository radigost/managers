/**
 * Created by user on 05.01.17.
 */
var modalCtrl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

modalCtrl = (function() {
  function modalCtrl(uibModalInstance) {
    this.uibModalInstance = uibModalInstance;
    this.cancel = bind(this.cancel, this);
  }

  modalCtrl.prototype.cancel = function() {
    return this.uibModalInstance.close();
  };

  return modalCtrl;

})();

angular.module('app').controller('modalCtrl', ['$uibModalInstance', modalCtrl]);

// ---
// generated by coffee-script 1.9.2