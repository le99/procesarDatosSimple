const Papa = require('papaparse');
const DATA_FOLDER = './data/';
const fs = require('fs');
const async = require('async');


var processFile = (file, callback)=>{

  fs.readFile(DATA_FOLDER + file, {encoding: 'utf8'}, (err, data)=>{
    if(err){
      return callback(err);
    }
    Papa.parse(data, {
      complete: function(results) {
        console.log("called");
        callback(null, {file: file, header: results.data[0]});
  	   }
    });
  });
};

// processFile('test.csv');


fs.readdir(DATA_FOLDER, (err, files) => {
  console.log("Files found: " + files.length);

  async.map(files, (file, callback)=>{
    processFile(file, callback);
  }, (err, results)=> {
    if(err){
      return console.log(err);
    }
    console.log(results);

    for(n = 0; n < results.length; n ++){
      console.log(results[n].header.join(', '))
      // for(m = 0; m < results.length; m ++){
      //   // if(results[n].header[0] !== results[n+1].header[0]){
      //   //   console.log("err: "+ results[n].file + ', ' + results[n+1].file);
      //   //   console.log(results[n].header[m] + ', ' +results[n+1].header[m]);
      //   // }
      //   console.log(results[n].header[m]);
      // }

    }

  })
})
