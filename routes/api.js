/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      // console.log(req.url);
      // console.log(req.query);
      // console.log(input);
      // US12 - My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format 
      // {initNum} {initial_Units} converts to {returnNum} {return_Units} with the result rounded to 5 decimals.
      // {initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}
      // res.json  
      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
      // res.send("In convert");
    });
    // US3 - I can GET /api/convert with a single parameter containing an accepted number and unit and have it converted.    
};
