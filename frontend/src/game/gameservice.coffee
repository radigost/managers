require '../lib/factories.coffee'

class gameService
  constructor:(@Restangular,@PlayerFactory,@localStorage)->
    @player = {}
    @gameName = "Основной экран"

  init:()=>
    @id = @localStorage.player.id
    @Restangular.one('api/v1/persons/',@id).get().then (res)=>
      @player = @PlayerFactory(res)
      return
angular.module('app').service('gameService', [
  'Restangular'
  'PlayerFactory'
  '$localStorage'
  gameService
])

