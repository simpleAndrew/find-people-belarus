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
        alert( "Load was performed." );
    });
});

var fetchName = function (sheetId) {
    $.get(sheetUrl(sheetId), function (data, tS, jq) {
        $("#other").html(data);
    });
}

var sheetUrl = function (sheetId) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/Окрестино!A1:B2?key=' + key;
}
