Player = require('../Class/player.coffee')
Company = require('../Class/Company.coffee')
tpl = require('./company.jade')

class companyCtrl
  constructor:()->
    @gameName = "Экран информации о компании"
    @player = new Player
    @company = new Company


  $routerOnActivate:(next)=>
    @company.selectCurrent(next.params.companyId)


  goToTalk:(id)=>
    @$router.navigate(['Talk', {npcId: id}]);



angular.module('app').component('company',{
  template:tpl()
  controller:[companyCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

