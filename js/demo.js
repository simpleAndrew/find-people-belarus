var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"

var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$().ready(function() {
    fetchName(sheetId)
});

$("#target").submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
});

var fetchName = function(sheetId){
    $.get(sheetUrl(sheetId), function( data , tS, jq) {
        $("#text").html(data);
    });
}

var sheetUrl= function(sheetId) {
    'https://sheets.googleapis.com/v4/spreadsheets/'+sheetId+'/values/Окрестино!A1:B2?key='+key;
}
