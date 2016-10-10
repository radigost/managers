describe 'Player', ->
  beforeEach(angular.mock.module('app'));
  httpBackend = undefined
  player = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend,Player) ->
    httpBackend = $httpBackend
    httpBackend.whenGET('/api/v1/my/').respond(1)
    httpBackend.whenGET('/api/v1/persons/1/').respond({id:1,name:"Вася"})
    httpBackend.whenGET('/api/v1/nodes/player/').respond([{id:3,is_first:true,text:"Привет",choice:[4]},{id:2,text:"Кагдила?",choice:[5]},{id:8,text:"Да ваще норм",choice:[5]}])
    scope = $rootScope.$new()
    player = Player
    player.init()
    httpBackend.flush()
    return
  )
  afterEach(->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()
    return
  )


  it 'should have variables', ->

    expect(player.name).toBeDefined()
    expect(player.company).toBeDefined()
    expect(player.position).toBeDefined()

    expect(player.tree).toBeDefined()
  it 'should have methods', ->
    expect(player.findCurrent).toBeDefined()
    expect(player.findNode).toBeDefined()
  it 'loads nodes of player',->
    player.loadNodes()
    httpBackend.flush()
    expect(player.nodes).toBeDefined()
    expect(player.nodes[0].id).toBeDefined()





