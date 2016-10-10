describe 'gameSpec', ->
  ctrl = undefined
  beforeEach(angular.mock.module('app'));
  element = undefined
  scope = undefined
  httpBackend = undefined

  beforeEach inject(($rootScope, $compile,$httpBackend) ->
    httpBackend = $httpBackend
    httpBackend.whenGET('/api/v1/my/').respond(1)
    httpBackend.whenGET('/api/v1/persons').respond({id:1,name:"Вася"})
    scope = $rootScope.$new()
    element = angular.element('<game></game>')
    element = $compile(element)(scope)
    ctrl = element.controller('game')
    scope.$apply()
    return
  )
  afterEach(->
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()
    return
  )
  describe 'Init', ->
      it 'Variables to be defined in talk component',->
        httpBackend.flush()
        expect(ctrl).toBeDefined()
        expect(ctrl.service).toBeDefined()
#        expect(ctrl.npc).toBeDefined()
#        expect(ctrl.gamestat).toBeDefined()
#        expect(ctrl.gamestat.money).toBeDefined()

      it 'Methods in component to be defined',->
        httpBackend.flush()
        expect(ctrl.$routerOnActivate).toBeDefined()


