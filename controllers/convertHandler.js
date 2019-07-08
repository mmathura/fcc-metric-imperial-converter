/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    // US4 - Hint: Split the input by looking for the index of the first character.
    var regex = /[aA-zZ]/g;
    var pos = input.search(regex);
    // console.log(input); 
    // console.log(pos); 
    if (pos == 0) return 1; // if units only, defaults to 1
    var tmp_str = input.substr(0, pos);
    // console.log(tmp_str);
    var tmp_arr = tmp_str.split('/');
    // console.log(tmp_arr);
    if (tmp_arr.length == 1)
      result = Number(tmp_str);
    else if (tmp_arr.length == 2)
      result = Number(tmp_arr[0]/tmp_arr[1]).toFixed(5);
    else
      result = 'invalid number';
    // console.log(result);
    // US9 - If my number is invalid, returned with will 'invalid number'.
    // US11 - I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), 
    // but if nothing is provided it will default to 1.
    return result; 
  };
  
  this.getUnit = function(input) {
    var result;
    var regex = /[aA-zZ]/g;
    var pos = input.search(regex);
    // console.log(input); 
    // console.log(pos); 
    var tmp_str = input.substr(pos, input.length);
    // console.log(tmp_str);
    var expect = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var count = 0;
    for (var i = 0; i < expect.length; i++){
      if (expect[i] == tmp_str) 
        count++;        
    }
    // US8 - If my unit of measurement is invalid, returned will be 'invalid unit'.
    // console.log(count); 
    if (count == 0) 
      return 'invalid unit';
    result = tmp_str;
    // console.log(result);
    return result;  
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    var units = {gal: 'l', l: 'gal', mi: 'km', km: 'mi', lbs: 'kg', kg: 'lbs'};
    result = units[initUnit.toLowerCase()];
    if (result === undefined)
      result = 'invalid unit';
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    var units = {gal: 'gallons', l: 'litres', mi: 'miles', km: 'kilometres', lbs: 'pounds', kg: 'kilograms'};
    result = units[unit.toLowerCase()];
    if (result === undefined)
      result = 'invalid unit';
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    // US5 - I can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)
    // US6 - I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)
    // US7 - I can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)
    // US10 - If both are invalid, return will be 'invalid number and unit'.
    if (initUnit == 'invalid unit' || initNum == 'invalid number') return 'invalid number';
    if (initUnit == 'invalid unit' && initNum == 'invalid number') return 'invalid number and unit';
    switch(initUnit.toLowerCase()) {
      case 'gal': result = initNum * galToL;  break;
      case 'l':   result = initNum / galToL;  break;
      case 'mi':  result = initNum * miToKm;  break;
      case 'km':  result = initNum / miToKm;  break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg':  result = initNum / lbsToKg; break;
    }
    // result rounded to 5 decimals
    // console.log(Math.floor(result)); // whole number part
    // console.log(result % 1); // decimal part
    // console.log((result % 1).toFixed(5)); // .00001
    result = Math.floor(result) + Number((result % 1).toFixed(5));
    // console.log(result);
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    // '3.1 miles converts to 5.00002 kilometers'
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
