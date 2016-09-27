Npc = require('../Class/npc.coffee')
#Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./game.jade')
require('../Components/playerInfo/playerInfo.coffee')
require '../lib/factories.coffee'

class gameCtrl
  constructor:(@Restangular,@PlayerEntity,@localStorage)->
    @gameName = "Основной экран"
    @npc = new Npc
    @company = new Company

  $routerOnActivate:(next)=>
    @id = @localStorage.player.id
    @Restangular.one('api/v1/persons/',@id).get().then (res)=>
      @player = @PlayerEntity(res)
      return

  $onInit:()=>

  goToTalk:(id)=>
    @$router.navigate(['Talk', {npcId: id}]);
  goToCompany:(id)=>
    @$router.navigate(['Company', {companyId: id}]);




angular.module('app').component('game',{
  template:tpl()
  controller:['Restangular','PlayerEntity','$localStorage',gameCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})


