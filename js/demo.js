var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"

var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$().ready(function() {
    fetchName(sheetId)
});

var fetchName = function(sheetId){
    var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+sheetId+'/values/Окрестино!A1:B2?key='+key;
    $.get( url, function( data , tS, jq) {
        $("#text").html(data);
    });
}