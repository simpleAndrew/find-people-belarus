var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"
var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$(function(){
    // $("#submitBtn").click(function(e){
    //     e.preventDefault();
    //     fetchName(sheetId);
    // });
    // $("#submit").click(function(e){
    //     e.preventDefault();
    //     fetchName(sheetId);
    // });
    let filterName = "Але"
    $.get( sheetUrl(sheetId, "Окрестино"), function( data ) {
        let objs = data.values
            .map(jsonRec => convertIntoObj(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.includes(filterName))
            .map( r => r.toHtml())
            .join("")
        alert(objs)
        $("#result").html("<div>" + objs + "</div>");
    });
});

var sheetUrl = function (sheetId, tabName) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + tabName + '!B2:E1000?key=' + key;
}

var convertIntoObj = function(json) {
    return new Record(json[0],json[1],json[2],json[3])
}

class Record {
    constructor(fullName, year, location, date) {
        this.fullName = fullName
        this.year = year
        this.location = location
        this.date = date
    }
    toHtml() {
        return "<div>" + this.fullName + "</div>"
        + "<div>" + this.year + "</div>"
        + "<div>" + this.location + "</div>"
        + "<div>" + this.date + "</div>"
    }
}