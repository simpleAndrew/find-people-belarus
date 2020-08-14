var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"
var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$(function () {
    $("#search_submit").click(function (e) {
        e.preventDefault();
        let filterName = document.getElementById('surname').value
        let tabs = tabNames()
        console.log(tabs)
        tabNames().forEach(tab => {
            let res = searchForPeople(sheetId, tab, filterName)
            $("#result").append("<div>" + res + "</div>");
        })

    });
});

function tabNames() {
    return [
        "Окрестино",
        "Советское РУВД",
        "Советское 2 РУВД",
        "Первомайское РУВД",
        "Московское РУВД",
        "Заводское РУВД",
        "Центральное РУВД",
        "Ленинское РУВД",
        "Октябрьское РУВД",
        "Неизвестное"
    ]
}

function searchForPeople(sheetId, tabName, filterWord) {
    $.get(sheetUrl(sheetId, tabName), function (data) {
        return data.values
            .map(jsonRec => convertIntoObj(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.includes(filterWord))
            .map(r => r.toHtml())
            .join("")
    });
}

function sheetUrl(sheetId, tabName) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + tabName + '!B2:E1000?key=' + key;
}

function convertIntoObj(json) {
    return new Record(json[0], json[1], json[2], json[3])
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