describe 'Classes', ->

  player = new Player()
  npc = new Npc()
  describe 'Player', ->
    it 'should have variables', ->
      expect(player.name).toBeDefined()
      expect(player.company).toBeDefined()
      expect(player.position).toBeDefined()
      expect(player.nodes).toBeDefined()
      expect(player.nodes[0].id).toBeDefined()
      expect(player.tree).toBeDefined()
    it 'should have methods', ->
      expect(player.findCurrent).toBeDefined()
      expect(player.findNode).toBeDefined()



  describe 'Npc', ->
    it 'should have variables', ->
      expect(npc.name).toBeDefined()
      expect(npc.company).toBeDefined()
      expect(npc.position).toBeDefined()
      expect(npc.tree).toBeDefined()
      expect(npc.nodes).toBeDefined()
      expect(npc.nodes[0].id).toBeDefined()
    it 'should have methods', ->
      expect(npc.findCurrent).toBeDefined()
      expect(npc.findNode).toBeDefined()
      expect(npc.fail).toBeDefined()
    it 'fail changes current tu fail', ->
      npc.current = npc.nodes[5]
      test = npc.current.text
      expect(npc.current.text).toEqual(test)
      npc.fail()
      expect(npc.current.text).not.toEqual(test)
    it 'succeed changes current tu succeed', ->
      npc.current = npc.nodes[5]
      test = npc.current.text
      expect(npc.current.text).toEqual(test)
      npc.succeed()
      expect(npc.current.text).not.toEqual(test)





