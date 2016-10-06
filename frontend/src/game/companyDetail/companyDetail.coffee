tpl = require('./companyDetail.jade')
require '../../Components/npcInfo/npcInfo.coffee'
require '../gameService.coffee'


class companyDetailCtrl
  constructor:(@service,@company)->
    @gameName = "Экран информации о компании"

  $routerOnActivate:(next)=>
    @company.selectCurrent(next.params.companyId)

  goToTalk:(id)=>
    @$router.navigate(['Talk', {npcId: id}]);



angular.module('app').component('companyDetail',{
  template:tpl()
  controller:['gameService','Company',companyDetailCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

