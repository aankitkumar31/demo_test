var util = require('util');
var duplicate = function(){
    this.message = "duplicateEntry"
}
util.inherits(duplicate,Error);
module.exports = duplicate;