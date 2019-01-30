(function() {
    try {
        var languages = utui.data.privacy_management.preferences.languages,
            language_obj;
        items = [];
        for (var i in languages) {
            language_obj = languages[i].common_tokens;
            language_obj.language = i;
            items.push(language_obj);
        }

        if (!items.length) {
            tealiumTools.sendError('Error', 'Whoops! You do not have any language preferences defiend in TiQ.')
        }

        var headers = {
                "language": "Language",
                "title": "Title",
                "category": "Category",
                "confirmation_button": "Confirmation Button",
                "description": "Description",
                "message": "Message",
                "no": "No",
                "status": "Status",
                "yes": "Yes"
            },
            fileTitle = 'tealium_language_preferences',
            getDate = function() {
                var date = new Date();
                var dd = date.getDate();
                var mm = date.getMonth() + 1;
                var yyyy = date.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                date = mm + '-' + dd + '-' + yyyy;
                return date;
            },
            convertToCSV = function(headers, objArray) {
                debugger;
                var objArray = objArray,
                    str = '',
                    line = '',
                    i, j, line;
                for (i in headers) {
                    if (line != '') {
                        line += ',';
                    }
                    line += headers[i];
                }
                str += line + '\r\n';
                for (i in objArray) {
                    line = '';
                    for (j in Object.keys(headers)) {
                        if (line != '') {
                            line += ',';
                        }
                        line += objArray[i][Object.keys(headers)[j]];
                        // line += (objArray[i][Object.keys(headers)[j]] ? JSON.stringify(objArray[i][Object.keys(headers)[j]]) : '');
                    }
                    str += line + '\r\n';
                }
                return str;
            },
            exportCSVFile = function(headers, items, fileTitle) {
                var csv = convertToCSV(headers, items);
                var exportedFileName = fileTitle + '-' + getDate() + '.csv' || 'export.csv';
                var blob = new Blob([csv], {
                    type: 'text/csv;charset=utf-8;'
                });
                if (navigator.msSaveBlob) {
                    navigator.msSaveBlob(blob, exportedFileName);
                } else {
                    var link = document.createElement("a");
                    if (link.download !== undefined) {
                        var url = URL.createObjectURL(blob);
                        link.setAttribute("href", url);
                        link.setAttribute("download", exportedFileName);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                }
                tealiumTools.sendMessage('Success', 'Good news! Everything worked.');
            };
        exportCSVFile(headers, items, fileTitle);
    } catch (e) {
        tealiumTools.sendError('Error', 'An unexpected error occurred. Please report this issue to Tealium Support.');
    }
})()