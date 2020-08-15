var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"
var sheetId = "1ehags_Lm_PQ0D3ZhZbTDoJ8B1ielrKulCOl_D0Fv4V4"

$(function () {
    $("#search_submit").click(function (e) {
        e.preventDefault();
        let filterName = document.getElementById('surname').value
        let year = document.getElementById('year').value

        $("#result").html(header())
        tabNames().forEach(tab => {
            $("#result").append("<tr><td>" + tab + "</td></tr>")
            searchForPeople(sheetId, tab, filterName, year)
        })

        $("#hospital_result").html(hospitalHeaders())
        hospitalTabs().forEach(tab => {
            $("#hospital_result").append("<tr><td>" + tab + "</td></tr>")
            searchForPeopleInHospitals(sheetId, tab, filterName)
        })
    });
});

function tabNames() {
    return [
        "Слуцк",
        "Окрестина",
        "Жодина"
    ]
}

function hospitalTabs() { return ["Больницы"]}

function searchForPeopleInHospitals(sheetId, tabName, filterWord) {
    $.get(sheetUrl(sheetId, tabName), function (data) {
        let res = data.values
            .map(jsonRec => convertIntoHospitalRecord(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.includes(filterWord))
            .map(r => r.toHtml())
            .join("")
        $("#result").append(res);
    });
}

function searchForPeople(sheetId, tabName, filterWord, year) {
    $.get(sheetUrl(sheetId, tabName), function (data) {
        let res = data.values
            .map(jsonRec => convertIntoObj(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.includes(filterWord))
            .filter(r => year == null || r.age == null || r.age.includes(year))
            .map(r => r.toHtml())
            .join("")
        $("#result").append(res);
    });
}

function sheetUrl(sheetId, tabName) {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/' + tabName + '!A3:F3003?key=' + key;
}

function convertIntoObj(json) {
    return new Record(json[1], json[2], json[3], json[4], json[0])
}

function convertIntoHospitalRecord(json) {
    return new HospitalRecord(json[1], json[2], json[3], json[4], json[5], json[0])
}

function header() {
    let cells = ["ФИО", "Дата Рождения", "Статус"]
        .map(str => "<td>" + str +"</td>")
        .join()
    return "<tr>" + cells + "</tr>"
}

function hospitalHeaders() {
    let cells = ["ФИО", "Год Рождения", "Больница", "Откуда прибыл"]
        .map(str => "<td>" + str +"</td>")
        .join()
    return "<tr>" + cells + "</tr>"
}

class Record {
    constructor(fullName, birthDate, status, other, updatedAt) {
        this.fullName = fullName
        this.birthDate = birthDate
        this.status = status
        this.updatedAt = updatedAt
    }

    toHtml() {
        let cells = [this.fullName, this.birthDate, this.status]
            .map(str => "<td>" + str + "</td>")
            .join("")
        return "<tr>" + cells + "</tr>"
    }
}

class HospitalRecord {
    constructor(fullName, age, hospital, fromWhere, other, updatedAt) {
        this.fullName = fullName
        this.age = age
        this.hospital = hospital
        this.fromWhere = fromWhere
        this.other = other
        this.updatedAt = updatedAt
    }

    toHtml() {
        let cells = [this.fullName, 2020 - this.age, this.hospital, this.fromWhere]
            .map(str => "<td>" + str + "</td>")
            .join("")
        return "<tr>" + cells + "</tr>"
    }
}