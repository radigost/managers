Npc = require('../Class/npc.coffee')
Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./game.jade')
require('../Components/playerInfo/playerInfo.coffee')

class gameCtrl
  constructor:()->
    @gameName = "Основной экран"
    @npc = new Npc
    @player = new Player
    @company = new Company
    @gamestat = {
      money:500
    }

  $routerOnActivate:(next)=>
    @player.choosePlayer(next.params.playerAvatarId)

  $onInit:()=>

  goToTalk:(id)=>
    @$router.navigate(['Talk', {npcId: id}]);
  goToCompany:(id)=>
    @$router.navigate(['Company', {companyId: id}]);




angular.module('app').component('game',{
  template:tpl()
  controller:[gameCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

