Player = require('../../Class/player.coffee')
#Company = require('../Class/Company.coffee')
tpl = require('./playerInfo.jade')

class playerInfoCtrl
  constructor:(@Restangular,@PlayerEntity)->

  $onInit:()=>
    console.log @player

#    @player = new @PlayerFactory({id:1})
#    console.log "player is ",@player,@playerS


angular.module('app').component('playerInfo',{
  template:tpl()
  controller:['Restangular','PlayerEntity',playerInfoCtrl]
  controllerAs:'ctrl'
  bindings:
    player:'<'
#    $router:'<'
})



