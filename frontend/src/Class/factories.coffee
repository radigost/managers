require '../Class/player.coffee'
Npc = require '../Class/npc.coffee'


angular.module('app')
.factory('Person',[
      -> (res)->
        if res.type == 'player'
          person =  Player()
        else if res.type == 'npc'
          person = new Npc()
        return person
])



.factory('NpcFactory',[
      'Restangular'
      '$q'
      -> (@Restangular,@q)->
        r = new Npc
        s = r.initNew(@Restangular,@q)
        return s
])
