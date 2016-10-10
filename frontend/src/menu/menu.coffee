tpl = require('./menu.jade')
modalTpl = require('./modal.jade')
require './modal.coffee'
class menuCtrl
  constructor:(@uibModal,@Restangular,@localStorage)->
#    console.log 'menu',@
  $onInit:()=>
    @Restangular.one('api/v1/my/').get().then (res)=>
      @localStorage.user = {id : res.user_id}
    @Restangular.one('api/v1/persons').get().then (res)=>
      @players = res
      return

  goToGame:(playerId)=>
#    console.log playerId

    @localStorage.player = {id : playerId}
    @$router.navigate(['Game'])


  help:()=>
    @modal = @uibModal.open
      controller : 'modalCtrl'
      controllerAs:'$ctrl'
      template: modalTpl()

angular.module('app').component('menu',{
  template:tpl()
  controller:['$uibModal','Restangular','$localStorage',menuCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

