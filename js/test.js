
if (tealiumTools.input && tealiumTools.input.csv_upload) {
	debugger;
} else {
	alert('Please select a file from your machine.');
}

var languages = utui.data.privacy_management.preferences.languages,
	data = tealiumTools.input.csv_upload.split(/\s/), 
	chunk, 
	rows = [],
	i, j,
	DataObj = function(data){
	  var obj = {};
	  for(i in headers){obj[headers[i]] = data[i];}
	  return obj;
	}; 

// parse headers out
var headers = data.splice(0,9);

// push remaining data into separate row arrays
while(data.length > 0){
	chunk = data.splice(0,9);
	rows.push(chunk);
}

// convert rows to JSON data
json_data = rows.map(function(row){return DataObj(row);})


// overwrite language prefs with new data
for(j in json_data){
    languages[json_data[j].language].common_tokens = json_data[j];
}



