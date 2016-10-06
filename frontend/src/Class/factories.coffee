require '../Class/player.coffee'
Npc = require '../Class/npc.coffee'


angular.module('app')
.factory('Person',[
      -> (res)->
        if res.type == 'player'
          person =  Player()
        else if res.type == 'npc'
          person = new Npc()
#        person.init(res)
        return person
])



.factory('NpcFactory',[
      'Restangular',
      -> (@Restangular)->
        r = new Npc
        s = r.initNew(@Restangular)
        return s
])
