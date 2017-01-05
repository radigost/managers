tpl = require('./menu.jade')
modalTpl = require('./modal.jade')
require './modal.coffee'
class menuCtrl
  constructor:(@uibModal,@Restangular,@localStorage,@cookies)->
    @canSeeEditor = false

  $onInit:()=>
    @Restangular.one('api/v1/my/').get().then (res)=>
      @localStorage.user = {id : res.user_id}
      @canSeeEditor = res.see_editor
    @Restangular.one('api/v1/persons').get().then (res)=>
      @players = res
      return

  goToGame:(playerId)=>
    @localStorage.player = {id : playerId}
    @$router.navigate(['Game'])
  deletePerson:(id)=>
    s =  @cookies.getAll()
    @Restangular.one('api/v1/persons/'+id).remove('',{'X-CSRFToken':s.csrftoken}).then (res)=>
      @$onInit()

  help:()=>
    @modal = @uibModal.open
      controller : 'modalCtrl'
      controllerAs:'$ctrl'
      template: modalTpl()

angular.module('app').component('menu',{
  template:tpl()
  controller:['$uibModal','Restangular','$localStorage','$cookies',menuCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})
.value('$routerRootComponent', 'app')


