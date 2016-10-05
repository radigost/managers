require './player.coffee'

class appService
  constructor:(@Restangular,@player,@localStorage)->
    @inited = false

  init:()=>
    @player.init()

angular.module('app').service('appService', [
  'Restangular'
  'Player'
  '$localStorage'
  appService
])

