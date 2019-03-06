const Papa = require('papaparse');
//const FILE = './data/Moving_Violations_Issued_in_January_2018.csv';
// const OUT_FILE = './data/Moving_Violations_Issued_in_January_2018_ordered.csv';


const FILE = './data/Moving_Violations_Issued_in_February_2018.csv';
const OUT_FILE = './data/Moving_Violations_Issued_in_February_2018_ordered.csv';


const fs = require('fs');
const async = require('async');
const _ = require('underscore');

var callback = (err, data) => {


};


fs.readFile(FILE, {encoding: 'utf8'}, (err, data)=>{
  if(err){
    return callback(err);
  }
  Papa.parse(data, {
    complete: function(results) {
      console.log(results.data[0]);


      var header = results.data.slice(0,1);
      var data = results.data.slice(1);

      var nn =0;
      var ordered = _.sortBy(data, (d) => {
        if(nn < 5){
          console.log(d[13]);
          nn++;
        }
        return Date.parse(d[13]);
      });
      console.log(header);
      var csv = Papa.unparse({data:header.concat(ordered)}, {delimeter:',', header: true, newline: "\r\n"});

      fs.writeFile(OUT_FILE, csv, (err)=>{
        if(err){
          return console.log(err);
        }
        console.log("file saved");
      });
     }
  });
});
