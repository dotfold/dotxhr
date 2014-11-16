
//
//  client.js
//

var rx = require('Rx')
var request = require('./request')
var http = require('http')


var DXC = function(){
  this.scheduler = rx.Scheduler.immediate;
};

DXC.prototype.initializeWithScheduler = function(scheduler /*IScheduler*/) {
  this.scheduler = scheduler
}

DXC.prototype.initializeWithBaseUrl = function(url) {
  this.baseUrl = url
}

//
// @param request Request object
// @returns Observable
//


DXC.prototype.enqueueRequest = function(resource, method) {

    method = method || 'GET'

    // TODO: request module
    // TODO: timeout handling
    // var rq = request.create(resource, method)

    var req = http.request({
      host: this.baseUrl,
      path: resource,
      responseType: 'application/json',
      withCredentials: false
    })

    var signal = rx.Observable.create(function(observer) {

      req.on('response', function(res) {

        if (res.statusCode !== 200) {
          observer.onError(res)
        }
        else {

          res.on('data', function(data) {

            var model = JSON.parse(data)
            observer.onNext(model)
            observer.onCompleted()

          })

        }
      })

      req.end()

    })

    return signal
}

module.exports.Client = DXC;
