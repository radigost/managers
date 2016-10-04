require './player.coffee'

class appService
  constructor:(@Restangular,@player,@localStorage)->
    @inited = false

  init:()=>
    if !@inited
      @player.init()

angular.module('app').service('appService', [
  'Restangular'
  'Player'
  '$localStorage'
  appService
])

