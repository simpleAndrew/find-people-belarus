var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"

var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$().ready(function() {
    $("#text").html(fetchName(sheetId));
});

var fetchName = function(sheetId){
    var url = 'https://spreadsheets.google.com/feeds/list/'+sheetId+'/values/Окрестино!A1:B2?key='+key;

    $.get( url, function( data ) {
        //Parse and Do Your Stuff Here
    });
}

