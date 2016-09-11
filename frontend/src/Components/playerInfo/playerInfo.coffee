Player = require('../../Class/player.coffee')
#Company = require('../Class/Company.coffee')
tpl = require('./playerInfo.jade')

class playerInfoCtrl
  constructor:()->
#    @gameName = "Экран информации о компании"
#    @player = new Player
#    @company = new Company

  $onInit:()=>



angular.module('app').component('playerInfo',{
  template:tpl()
  controller:[playerInfoCtrl]
  controllerAs:'ctrl'
  bindings:
    player:'<'
#    $router:'<'
})

