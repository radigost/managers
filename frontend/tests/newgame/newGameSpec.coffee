describe 'NewGameSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined
  httpBackend  = undefined

  beforeEach inject(($rootScope,$compile,$httpBackend) ->
    scope = $rootScope.$new()
    element = angular.element('<newgame></newgame>')
    element = $compile(element)(scope)
    ctrl = element.controller('newgame')

    httpBackend = $httpBackend
    httpBackend.whenGET('/api/v1/persons').respond({id:1,name:"Васиа"})
    httpBackend.whenGET('uib/template/tooltip/tooltip-popup.html').respond({id:1,name:"Васиа"})
    httpBackend.whenGET('/api/v1/npc/').respond([{id:1,name:"Васиа"},{id:2,name:"Lenia"}])
    httpBackend.whenGET('/api/v1/nodes/player').respond([{id:3,is_first:true,text:"Привет",choice:[4]},{id:2,text:"Кагдила?",choice:[5]},{id:8,text:"Да ваще норм",choice:[5]}])
    httpBackend.whenGET('/api/v1/nodes/npc').respond([{id:4,is_first:true,text:"даров",choice:[2]},{id:5,text:"Да ничо так,как сам?",choice:[3]},{id:6,text:"Сам как?"}])
    scope.$apply()
    httpBackend.flush()
    return
  )
  afterEach(->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()
    return
  )






