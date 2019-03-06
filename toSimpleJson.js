
const IN_DIR = './data/jsonin';
const OUT_DIR = './data/jsonout';

const FILE_1 = 'Moving_Violations_Issued_in_April_2018';
const FILE_2 = 'Moving_Violations_Issued_in_February_2018';
const FILE_3 = 'Moving_Violations_Issued_in_January_2018';
const FILE_4 = 'Moving_Violations_Issued_in_March_2018';

const fs = require('fs');
const _ = require('underscore');

function processFile(file_name){
  fs.readFile(IN_DIR + "/" + file_name + ".geojson", {encoding: 'utf8'}, (err, data)=>{
    if(err){
      return callback(err);
    }

    var content = JSON.parse(data);

    var toWrite = _.map(content.features, (f) => {
      return f.properties;
    })

    fs.writeFile(OUT_DIR + "/" + file_name + ".json", JSON.stringify(toWrite, null, '\t'), (err)=>{
      if(err){
        return console.log(err);
      }
      console.log("file saved: " + file_name);
    });
  });
}


processFile(FILE_1);
processFile(FILE_2);
processFile(FILE_3);
processFile(FILE_4);
