Npc = require('../Class/npc.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./game.jade')
require('../Components/playerInfo/playerInfo.coffee')

require '../Class/appService.coffee'

class gameCtrl
  constructor:(@service)->
    @gameName = "Основной экран"
    @npc = new Npc
    @company = new Company

  $routerOnActivate:(next)=>
    @service.init()

  goToTalk:(id)=>
    @$router.navigate(['Talk', {npcId: id}]);

  goToCompany:(id)=>
    @$router.navigate(['Company', {companyId: id}]);




angular.module('app').component('game',{
  template:tpl()
  controller:['appService',gameCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})


