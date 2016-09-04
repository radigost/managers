#class ComponentTestUtil
#  @scope: null
#  @elem: null
#
#  @test: ->
#    console.log('ComponentTestUtil')
#
#  @module: (module)->
#    beforeEach(angular.mock.module(module))
#
#  @compile: (tpl)->
#    beforeEach(inject(($rootScope, $compile)=>
#      @scope = $rootScope.$new()
#      @elem = $compile(tpl)(@scope)
#      @scope.$digest();
#    ))
#
#  @ctrl: (name)->
#    s = @elem.find('*').first().scope()
#    return if name? then eval('s.' + name) else s.$ctrl
#
#module.exports=ComponentTestUtil