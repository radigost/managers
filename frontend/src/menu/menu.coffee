tpl = require('./menu.jade')
modalTpl = require('./modal.jade')
require './modal.coffee'
class menuCtrl
  constructor:(@uibModal,@Restangular,@localStorage)->
#    console.log 'menu',@
  $onInit:()=>

    @Restangular.one('api/v1/my/').get().then (res)=>
      console.log res
#      @player = @PlayerFactory(res)
      return
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
  controller:['$uibModal','Restangular','$localStorage',menuCtrl]
  controllerAs:'ctrl'
})

