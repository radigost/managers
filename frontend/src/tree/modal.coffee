modalTpl = require('./modal.jade')
class treeModalCtrl
  constructor:()->
    @node  = @resolve.node

  cancel:()=>
    @dismiss({$value: 'cancel'})
  save:()=>
    @close({$value: 'cancel'})


angular.module('app').component 'modalComponent',
  template: modalTpl()
  bindings:
    resolve: '<'
    close: '&'
    dismiss: '&'
  controller:[treeModalCtrl]

