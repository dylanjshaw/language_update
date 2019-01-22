
if (tealiumTools.input && tealiumTools.input.csv_upload) {
	(function(){
		// fetch current language prefs
		var languages = utui.data.privacy_management.preferences.languages,
			// fetch CSV data arr
			data = tealiumTools.input.csv_upload.split(/\s/), 
			// define expected header values --- change THESE if the headers in the UI change
			actual_headers = ['language','title','category','confirmation_button','description','message','no','status','yes'],
			chunk, 
			rows = [],
			i, j,
			// method to convert array data to JSON data
			toObj = function(data){
			  var obj = {};
			  for(i in input_headers){obj[input_headers[i]] = data[i];}
			  return obj;
			}, 
			// method to validate input headers
			validHeaders = function(input, actual){
				var actual = actual, i, sameElements = true;
				for(i in actual){
					if(!input.includes(actual[i])){
						sameElements = false; 
						break;
					}
				}
				return input.length == actual.length && sameElements;
			}; 

		// parse headers out of data arr
		var input_headers = data.splice(0,9);

		// check that headers are valid
		if(!validHeaders(input_headers, actual_headers)){
			alert('Please ensure that your first row contains all the expected header values.')
			return;
		}

		// push remaining data into separate row arrays
		while(data.length > 0){
			chunk = data.splice(0,9);
			rows.push(chunk);
		}

		// convert rows to JSON data
		json_data = rows.map(function(row){return toObj(row);})


		// overwrite language prefs with new data
		for(j in json_data){
		    languages[json_data[j].language].common_tokens = json_data[j];
		}

		alert('Good news! It worked.')
		
	})()
} else {
	alert('Please paste some CSV data into the textbox.');
}
