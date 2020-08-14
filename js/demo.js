var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"
var sheetId = "1NhNyoNQRHrg0Ce-NrZle6NeWCIxGa1L07WBMgOisnIM"

$(function () {
    $("#search_submit").click(function (e) {
        e.preventDefault();
        let filterName = document.getElementById('surname').value
        let tabs = tabNames()
        console.log(tabs)
        $("#result").html(header())
        tabNames().forEach(tab => searchForPeople(sheetId, tab, filterName))
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
        let res = data.values
            .map(jsonRec => convertIntoObj(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.includes(filterWord))
            .map(r => r.toHtml())
            .join("")
        $("#result").append("<div>" + res + "</div>");
    });
}

function sheetUrl(sheetId, tabName) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + tabName + '!B2:E1000?key=' + key;
}

function convertIntoObj(json) {
    return new Record(json[0], json[1], json[2], json[3])
}

function header() {
    return "<div class='record'> ФИО </div>"
        + "<div class='record'> Год Рождения </div>"
        + "<div class='record'> Место содержания</div>"
        + "<div class='record'> Дата задержания</div>"

}

class Record {
    constructor(fullName, year, location, date) {
        this.fullName = fullName
        this.year = year
        this.location = location
        this.date = date
    }

    toHtml() {
        return "<div class='record'>" + this.fullName + "</div>"
            + "<div class='record'>" + this.year + "</div>"
            + "<div class='record'>" + this.location + "</div>"
            + "<div class='record'>" + this.date + "</div>"
    }
}