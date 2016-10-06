Player = require('../../Class/player.coffee')
#Company = require('../Class/Company.coffee')
tpl = require('./playerInfo.jade')

class playerInfoCtrl
  constructor:(@Restangular)->
  $onInit:()=>
#    console.log @player

angular.module('app').component('playerInfo',{
  template:tpl()
  controller:['Restangular',playerInfoCtrl]
  controllerAs:'ctrl'
  bindings:
    player:'<'
})



