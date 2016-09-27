Player = require '../Class/player.coffee'

angular.module('app')
.factory('PlayerEntity',[
      -> (res)->
        @player =  new Player()
        @player.init(res)
        return @player
])
