require './player.coffee'

class appService
  constructor:(@Restangular,@player,@localStorage)->
    @inited = false

  init:()=>
    @player.init()
    @Restangular.one('api/v1/companies/').get().then (res)=>
      @companies = res.results

angular.module('app').service('appService', [
  'Restangular'
  'Player'
  '$localStorage'
  appService
])

