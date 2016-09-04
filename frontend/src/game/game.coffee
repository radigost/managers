Npc = require('../Class/npc.coffee')
Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./game.jade')

class gameCtrl
  constructor:()->
    @gameName = "Основной экран"
    @npc = new Npc
    @player = new Player
    @company = new Company
    @gamestat = {
      money:500
    }



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

