describe 'Npc', ->
  beforeEach(angular.mock.module('app'));
  httpBackend = undefined
  npc = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend,Npc) ->
    httpBackend = $httpBackend
    httpBackend.whenGET('/api/v1/my/').respond(1)
    httpBackend.whenGET('/api/v1/persons/1').respond({id:1,name:"Вася"})
    httpBackend.whenGET('/api/v1/nodes/player').respond([{id:3,is_first:true,text:"Привет",choice:[4]},{id:2,text:"Кагдила?",choice:[5]},{id:8,text:"Да ваще норм",choice:[5]}])
    scope = $rootScope.$new()
    npc = Npc
#    httpBackend.flush()
    return
  )
  afterEach(->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()
    return
  )

  it 'should have variables', ->
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




