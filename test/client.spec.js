var expect = require('chai').expect
var rx = require('Rx')
var Cl = require('./../lib/client').Client
var sinon = require('sinon')

var TestScheduler = rx.TestScheduler
var xhr

before(function () {
    xhr = sinon.useFakeXMLHttpRequest()
    requests = []
    xhr.onCreate = function (req) { requests.push(req); }
});

after(function () {
    // Like before we must clean up when tampering with globals.
    xhr.restore()
});

describe('slient', function() {

  it ('should pass', function() {

    var s = new TestScheduler()
    var n = rx.ReactiveTest.onNext
    var c = rx.ReactiveTest.onCompleted

    var cl = new Cl()

    cl.initializeWithScheduler(s)


    var xsa = cl.enqueueRequest('foo')

    var xs = s.createColdObservable(


      n(200, 'this is the result'),
      c(250)
    )

    var res = s.startWithCreate(function() {
      return xsa
    })

    console.log(xs)
    console.log(res)

    expect(true).to.be.true

  })

})
