Npc = require('../Class/npc.coffee')
Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./game.jade')
require('../Components/playerInfo/playerInfo.coffee')

class gameCtrl
  constructor:(@Restangular,@PlayerEntity,@localStorage)->
    @gameName = "Основной экран"
    @npc = new Npc
#    @player = new Player
    @company = new Company
#    @gamestat = {
#      money:500
#    }

  $routerOnActivate:(next)=>
    @id = @localStorage.player.id
    @Restangular.one('api/v1/persons/',@id).get().then (res)=>
      console.log res
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

.factory('PlayerEntity',[
      -> (res)->
#        console.log "Factory",@,res
        @player =  new Player()
        @player.init(res)
        return @player
])

