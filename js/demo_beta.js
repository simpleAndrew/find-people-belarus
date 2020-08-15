var key = "AIzaSyCsPypkGNitFV5SVrbMt3ET3cMg51h-uHw"
var sheetId = "1ehags_Lm_PQ0D3ZhZbTDoJ8B1ielrKulCOl_D0Fv4V4"

$(function () {
    $("#search_submit").click(function (e) {
        e.preventDefault();
        let filterName = document.getElementById('surname').value
        let year = document.getElementById('year').value

        $("#result").html(header())
        tabNames().forEach(tab => {
            searchForPeople(sheetId, tab, filterName, year)
        })

        $("#hospital_result").html(hospitalHeaders())
        hospitalTabs().forEach(tab => {
            searchForPeopleInHospitals(sheetId, tab, filterName)
        })

        $("#other_result").html(otherHeaders())
        otherTabs().forEach(tab => {
            searchForPeopleInOthers(sheetId, tab, filterName)
        })
    });
});

function tabNames() {
    return [
        "Слуцк",
        "Окрестина",
        "Жодино"
    ]
}

function hospitalTabs() {
    return ["Больницы"]
}

function otherTabs() {
    return ["Другие места"]
}

function searchForPeopleInOthers(sheetId, tabName, filterWord) {
    $.get(sheetUrl(sheetId, tabName), function (data) {
        let res = data.values
            .map(jsonRec => convertIntoOtherRecord(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.toLowerCase().includes(filterWord.toLowerCase()))
            .sort(function (a, b) {
                return compareObjs(a, b)
            })
            .map(r => r.toHtml())

        if (res.length !== 0) {
            $("#other_result").append(res.join(""));
        }
    });
}

function searchForPeopleInHospitals(sheetId, tabName, filterWord) {
    $.get(sheetUrl(sheetId, tabName), function (data) {
        let res = data.values
            .map(jsonRec => convertIntoHospitalRecord(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.toLowerCase().includes(filterWord.toLowerCase()))
            .sort(function (a, b) {
                return compareObjs(a, b)
            })
            .map(r => r.toHtml())

        if (res.length !== 0) {
            $("#hospital_result").append(res.join(""));
        }
    });
}

function searchForPeople(sheetId, tabName, filterWord, year) {
    $.get(sheetUrl(sheetId, tabName), function (data) {
        let res = data.values
            .map(jsonRec => convertIntoObj(jsonRec))
            .filter(r => r.fullName != null)
            .filter(r => r.fullName.toLowerCase().includes(filterWord.toLowerCase()))
            .filter(r => year == null || r.age == null || r.age.includes(year))
            .sort(function (a, b) {
                return compareObjs(a, b)
            })
            .map(r => r.toHtml())

        if (res.length !== 0) {
            let resBlock = $("#result")
            resBlock.append("<tr><td colspan='5' style='text-align: center'>" + tabName + "</td></tr>")
            resBlock.append(res.join(""));
        }

    });
}

function compareObjs(a, b) {
    if (a.fullName < b.fullName) {
        return -1;
    } else if (a.fullName < b.fullName) {
        return 1;
    } else {
        if (a.updatedAt === undefined) {
            return -1;
        } else if (b.updatedAt === undefined) {
            return 1;
        } else {
            return parseDate(a.updatedAt) - parseDate(b.updatedAt)
        }
    }
}

function parseDate(stringDate) {
    let date = stringDate.substring(0, 10).split("-")
    let time = stringDate.substring(11, 18).split(":")
    return new Date(date[0], date[1], date[2], time[0], time[1])
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

function convertIntoOtherRecord(json) {
    return new OtherRecord(json[1], json[2], json[3], json[4], json[5], json[0])
}

function header() {
    return headers(["ФИО", "Дата Рождения", "Статус", "Другое", "Обновлялось"])
}

function hospitalHeaders() {
    return headers(["ФИО", "Год Рождения", "Больница", "Откуда прибыл", "Другое", "Обновлялось"])
}

function otherHeaders() {
    return headers(["ФИО", "Дата Рождения", "Статус", "Где", "Другое", "Обновлялось"])
}

function headers(headerStrArr) {
    let cells = headerStrArr.map(str => "<td>" + str + "</td>")
        .join()
    return "<tr>" + cells + "</tr>"
}

class Record {
    constructor(fullName, birthDate, status, other, updatedAt) {
        this.fullName = fullName
        this.birthDate = birthDate
        this.status = status
        this.other = other
        this.updatedAt = updatedAt
    }

    toHtml() {
        let cells = [this.fullName, this.birthDate, this.status, this.other, this.updatedAt]
            .map(s => s || "")
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
        let cells = [this.fullName, this.age === undefined ? undefined : 2020 - this.age, this.hospital, this.fromWhere, this.other, this.updatedAt]
            .map(s => s || "")
            .map(str => "<td>" + str + "</td>")
            .join("")
        return "<tr>" + cells + "</tr>"
    }
}

class OtherRecord {
    constructor(fullName, birthDate, status, location, other, updatedAt) {
        this.fullName = fullName
        this.birthDate = birthDate
        this.status = status
        this.location = location
        this.other = other
        this.updatedAt = updatedAt
    }

    toHtml() {
        let cells = [this.fullName, this.birthDate, this.status, this.location, this.other, this.updatedAt]
            .map(s => s || "")
            .map(str => "<td>" + str + "</td>")
            .join("")
        return "<tr>" + cells + "</tr>"
    }
}