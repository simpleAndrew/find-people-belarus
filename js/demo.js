var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"
var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$(function(){
    $("#submitBtn").click(function(e){
        e.preventDefault();
        fetchName(sheetId);
    });
    $("#submit").click(function(e){
        e.preventDefault();
        fetchName(sheetId);
    });
    $.get( "ajax/test.html", function( data ) {
        $( ".result" ).html( data );
        alert( "Load was performed." );
    });
});
//
// $("#target").submit(
//     function (event) {
//         alert("Handler for .submit() called.");
//         fetchName(sheetId)
//         event.preventDefault();
//     }
// );



var fetchName = function (sheetId) {
    $.get(sheetUrl(sheetId), function (data, tS, jq) {
        $("#other").html(data);
    });
}

var sheetUrl = function (sheetId) {
    'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/Окрестино!A1:B2?key=' + key;
}
