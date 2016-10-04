#Company = require('../Class/Company.coffee')
require '../Class/Company.coffee'
tpl = require('./company.jade')
require '../Class/appService.coffee'
require '../Components/npcInfo/npcInfo.coffee'


class companyCtrl
  constructor:(@service,@company)->
    @gameName = "Экран информации о компании"


  $routerOnActivate:(next)=>
    @company.selectCurrent(next.params.companyId)
    @service.init()
    console.log @company

  goToTalk:(id)=>
    @$router.navigate(['Talk', {npcId: id}]);



angular.module('app').component('company',{
  template:tpl()
  controller:['appService','Company',companyCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
})

