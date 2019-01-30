if (tealiumTools.input && tealiumTools.input.csv_upload) {
	debugger;
    (function() {
        try {
            // fetch current language prefs
        	var preferences = utui.data.privacy_management.preferences, languages; 
            if(preferences){
            	languages = preferences.languages;
            } else {
				tealiumTools.sendError('Error', 'The following languages were not updated because they were not previously defined in TiQ: ' + undefined_languages.toString());
            }
                // define expected header values --- change THESE if the headers in the UI change,
                actual_header_map = {
                    'language': 'Language',
                    'title': 'Title',
                    'category': 'Category',
                    'confirmation_button': 'Confirmation Button',
                    'description': 'Description',
                    'message': 'Message',
                    'no': 'No',
                    'status': 'Status',
                    'yes': 'Yes'
                },
                chunk,
                rows = [],
                i, j,
                // method to convert array data to JSON data
                toObj = function(data) {
                    var obj = {};
                    for (i in Object.keys(actual_header_map)) {
                        obj[Object.keys(actual_header_map)[i]] = data[i];
                    }
                    return obj;
                },
                // method to validate input headers
                validHeaders = function(input, actual) {
                    var actual = actual,
                        i, sameElements = true;
                    for (i in actual) {
                        if (!input.includes(actual[i])) {
                            sameElements = false;
                            break;
                        }
                    }
                    return input.length == Object.keys(actual).length && sameElements;
                },
                removeWhiteSpaces = function(arr) {
                    return arr.filter(function(str) {
                        return str.replace(/\s/g, '')
                    })
                },
                undefined_languages = [];



            debugger;

            // fetch CSV data arr
            data = removeWhiteSpaces(tealiumTools.input.csv_upload.split(/\s/))

            // parse headers out of data arr
            var input_headers = data.splice(0, 10)


            // process confirmation button header
            var confirmation_index = input_headers.indexOf('Confirmation');
            if (confirmation_index > -1) {
                if (input_headers[confirmation_index + 1] === "Button") {
                    input_headers.splice(confirmation_index, 2);
                    input_headers.push('Confirmation Button')
                }
            }

            // check that headers are valid
            if (!validHeaders(input_headers, actual_header_map)) {
                tealiumTools.sendError('Error', 'Please ensure that your first row contains all the expected header values.')
                return;
            }

            // push remaining data into separate row arrays
            while (data.length > 0) {
                chunk = data.splice(0, 9);
                rows.push(chunk);
            }

            // convert rows to JSON data
            json_data = rows.map(function(row) {
                return toObj(row);
            })

            // overwrite language prefs with new data
            for (j in json_data) {
                if (languages[json_data[j].language]) {
                    languages[json_data[j].language].common_tokens = json_data[j];
                } else {
                    undefined_languages.push(json_data[j].language);
                }
            }

            if (!undefined_languages.length) {
                tealiumTools.sendMessage('Success', 'Good news! Everything worked.');
            } else {
                tealiumTools.sendError('Error', 'The following languages were not updated because they were not previously defined in TiQ: ' + undefined_languages.toString());
            }
        } catch (e) {
            tealiumTools.sendError('Error', 'An unexpected error occurred. Please report this issue to Tealium Support.')
        }
    })()
} else {
    tealiumTools.sendError('Error', 'Please paste some CSV data into the textbox.');
}