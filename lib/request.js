
var DXR = {}

DXR.prototype.createRequest = function(resource, method) {

  return {}

}

module.exports.create = function(resource, method) {
    return new DXR().createRequest(resource, method)
}
