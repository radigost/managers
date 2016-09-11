tpl = require('./menu.jade')
modalTpl = require('./modal.jade')
require './modal.coffee'
class menuCtrl
  constructor:(@uibModal)->
#    console.log 'menu',@
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
  controller:['$uibModal',menuCtrl]
  controllerAs:'ctrl'
})

