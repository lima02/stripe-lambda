
var getToken = require("../lib/token")
var fs = require("fs");
require('dotenv').load();

module.exports = function(grunt) {
  grunt.registerTask('build_event', 'package the app', function() {

    var done = this.async();

    getToken({
      "number": "4242424242424242",
      "exp_month": 12,
      "exp_year": 2017,
      "cvc": "123"
    },function(err, token){
      console.log(JSON.stringify(token));
      fs.writeFile("event.json", JSON.stringify({"body": {
          "source" : token,
          "amount" : 50,
          "currency" : "aud",
          "description" : "test description"
        }
      }, null, 4) , 'utf8', function(err){
        done();
      });
    })


  });
};
