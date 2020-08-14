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
    $.get( sheetUrl(sheetId), function( data ) {
        var replyStr = JSON.stringify(data)
        alert(replyStr)
        $("#result").html(replyStr);
        var objs = data.values.map(jsonRec => convertIntoObj(jsonRec))
        alert( "Load was performed." + objs );
    });
});

var fetchName = function (sheetId) {
    $.get(sheetUrl(sheetId), function (data, tS, jq) {
        $("#other").html(data);
    });
}

var sheetUrl = function (sheetId) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/Окрестино!B2:D1000?key=' + key;
}

var convertIntoObj = function(json) {
    return new Record(json[1],json[2],json[3],json[4])
}

class Record {
    constructor(fullName, year, location, date) {
        this.fullName = fullName
        this.year = year
        this.location = location
        this.date = date
    }
}