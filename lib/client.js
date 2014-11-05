
//
//  client.js
//

var rx = require('Rx')
var request = require('request')


var DXC = {};

//
// @param request Request object
// @returns Observable
//


DXC.prototype.enqueueRequest = function(resource, method) {

    var rq = request.create(resource, method)
    var xhr = new XMLHttpRequest()

    var errorObs = rx.Observable.fromEvent(xhr, 'error')
    var completeObs = rx.Observable.fromEvent(xhr, 'load')
    var stateObs = rx.Observable.fromeEvent(xhr, 'readystatechanged')

    var signal = Rx.Observable.create(function(observer) {

      //
      // inner observables
      //
      errorObs.subscribeOnNext(function(err) {
        observer.onError(err);
      })

      completeObs.subscribeOnNext(function(data) {
        observer.onNext(data)
        observer.onCompleted()
      })

      xhr.open(method, resource, true)
      xhr.send()

    })

    return signal
}

// enqueue a request for a resource
module.exports.enqueueRequest = function(resource, method) {
  return new DXC().enqueueRequest(resource, method)
}
