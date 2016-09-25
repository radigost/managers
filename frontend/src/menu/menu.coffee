tpl = require('./menu.jade')
modalTpl = require('./modal.jade')
require './modal.coffee'
class menuCtrl
  constructor:(@uibModal,@Restangular)->
#    console.log 'menu',@
  $onInit:()=>
    @Restangular.one('api/v1/persons').get().then (res)=>
      console.log res.results

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
  controller:['$uibModal','Restangular',menuCtrl]
  controllerAs:'ctrl'
})

