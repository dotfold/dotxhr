
//
//  client.js
//

var rx = require('Rx')
var request = require('./request')


var DXC = function(){};

//
// @param request Request object
// @returns Observable
//


DXC.prototype.enqueueRequest = function(resource, method) {

    // TODO:
    var rq = request.create(resource, method)
    var xhr = new XMLHttpRequest()

    var errorObs = rx.Observable.fromEvent(xhr, 'error')
    var stateObs = rx.Observable.fromEvent(xhr, 'readystatechanged')

    var signal = rx.Observable.create(function(observer) {

      console.log('create obs')

      //
      // inner observables
      //
      errorObs.subscribeOnNext(function(err) {
        observer.onError(err);
      })

      stateObs.subscribeOnNext(function(x) {
        console.log('readystate', x)
      })

      function handleResponse() {
        observer.onNext(JSON.parse(xhr.responseText))
        observer.onCompleted()
      }

      xhr.onload = handleResponse.bind(this)
      xhr.overrideMimeType("application/json");
      xhr.open(method, resource, true)
      xhr.send()

    })

    return signal
}

module.exports.Client = DXC;

// enqueue a request for a resource
// module.exports.enqueueRequest = function(resource, method) {
  // return new DXC().enqueueRequest(resource, method)
// }
