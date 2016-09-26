tpl = require('./menu.jade')
modalTpl = require('./modal.jade')
require './modal.coffee'
class menuCtrl
  constructor:(@uibModal,@Restangular,@clientId,@localStorage)->
#    console.log 'menu',@
  $onInit:()=>
    @localStorage.player = {id: @clientId}

  help:()=>
    @modal = @uibModal.open
      controller : 'modalCtrl'
      controllerAs:'$ctrl'
      template: modalTpl()
#      resolve:
#        reason:=>
#          return value

angular.module('app').component('menu',{
  template:tpl()
  controller:['$uibModal','Restangular','$clientId','$localStorage',menuCtrl]
  controllerAs:'ctrl'
})

