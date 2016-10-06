tpl = require('./game.jade')
require('../Components/playerInfo/playerInfo.coffee')

require './gameService.coffee'
require './companyList/companyList.coffee'
require './companyDetail/companyDetail.coffee'
require './profile/profile.coffee'

class gameCtrl
  constructor:(@service)->
    @gameName = "Основной экран"

  $routerOnActivate:(next)=>
    @service.init()





angular.module('app').component('game',{
  template: tpl()
  controller:['gameService',gameCtrl]
  controllerAs:'ctrl'
  bindings:
    $router:'<'
  $routeConfig: [
    {path: '/', name: 'CompanyList', component: 'companyList' , useAsDefault: true}
    {path: '/company-detail', name: 'CompanyDetail', component: 'companyDetail' }
    {path: '/profile', name: 'Profile', component: 'profile' }

  ]
})


