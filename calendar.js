//Creates a new instance of today and tomorrow's date
let today = new Date();
today.setDate(today.getDate())
let tomorrow = new Date();
tomorrow.setDate(today.getDate()+1)

var dd = today.getDate();
var mm = today.getMonth()+1; //Adds 1 to the month because it is 0 based
var yyyy = today.getFullYear();

var ddTomorrow = tomorrow.getDate();
var mmNext = today.getMonth()+2; //Adds 1 to the month because it is 0 based
var yyyyNext = tomorrow.getFullYear()

var hh = today.getHours();
var min = today.getMinutes();
var currentTime = hh + ":" + min;

//Gets the element on the page being used to display the api data
const table = document.getElementById('tableDisplay')

const btnWeekly = document.getElementById('weekly')
const btnMonthly = document.getElementById('monthly')
const btnYearly = document.getElementById('yearly')

const btnNext = document.getElementById('next')
const btnReset = document.getElementById('reset')
const btnPrevious = document.getElementById('previous')

var data = []
var counter = mm
var year = yyyy

var datesToday = []
var prayerTimes = []
var newMonthPrayerTimes = []
var newMonthDates = []

var start
var weeks = new Array(7)
var length
var dailyDataCreated = false
var weekDataCreated = false

var index = 0
var monthsArray = []
var months = new Array(12)

var currentTable = 'weekly'

var navButtons = [btnPrevious,btnReset,btnNext]
var tableButtons = [btnWeekly,btnMonthly,btnYearly]

let FajrTimeToday = ''
let SunriseToday = ''
let DhuhrTimeToday = ''
let AsrTimeToday = ''
let MaghribTimeToday = ''
let IshaTimeToday = ''
			
//Variables for easier referencing
let api = 'https://api.aladhan.com/v1/calendar'
let latitude = '-45.87416'
let longitude = '170.50361'
let method = 2
let month = mm

function fetchData(api,latitude,longitude,method,month,yyyy) {

    //Fetch used to query the API for the prayer times
    fetch(`${api}?latitude=${latitude}&longitude=${longitude}&method=${method}&year=${yyyy}&annual=true`)
    .then(res => res.json())
    .then(d => {        
        //Checks if the request was successful and the page exists
        if (d.code === 200) {
            console.log(d)
            data = d
            displayData(data,month)
        }
         //Prints an error message to the console if the request was unsuccessful or the page doesn't exist
         else if (d.code === 404) {
            console.log("Error! The server returned a status of 404 page not found. Could not get this month's information")
        }
    })
}

function displayData(d,month) {

    let d1 = d.data[mm]
    let d2 = d.data[mmNext]
    
    for (let i = 0; i < d1.length; i++) {
        prayerTimes[i] = d1[i].timings
        datesToday[i] = d1[i].date.gregorian.date
    }
    
    if (dd < d1.length) {            

        if (dailyDataCreated === false) {
            FajrTimeToday = formatText(prayerTimes[dd-1].Fajr)
            SunriseToday = formatText(prayerTimes[dd-1].Sunrise)
            DhuhrTimeToday = formatText(prayerTimes[dd-1].Dhuhr)
            AsrTimeToday = formatText(prayerTimes[dd-1].Asr)
            MaghribTimeToday = formatText(prayerTimes[dd-1].Maghrib)
            IshaTimeToday = formatText(prayerTimes[dd-1].Isha)
            
            let FajrTimeTomorrow = formatText(prayerTimes[dd].Fajr)
            let SunriseTomorrow = formatText(prayerTimes[dd].Sunrise)
            let DhuhrTimeTomorrow = formatText(prayerTimes[dd].Dhuhr)
            let AsrTimeTomorrow = formatText(prayerTimes[dd].Asr)
            let MaghribTimeTomorrow = formatText(prayerTimes[dd].Maghrib)
            let IshaTimeTomorrow = formatText(prayerTimes[dd].Isha) 

            console.log(`Today ${d1[dd-1].date.readable} [${dd-1}]:`)
            console.log(FajrTimeToday)
            console.log(SunriseToday)
            console.log(DhuhrTimeToday)
            console.log(AsrTimeToday)
            console.log(MaghribTimeToday)
            console.log(IshaTimeToday)

            console.log(`Tomorrow ${d1[dd].date.readable} [${dd}]:`)
            console.log(FajrTimeTomorrow)
            console.log(SunriseTomorrow)
            console.log(DhuhrTimeTomorrow)
            console.log(AsrTimeTomorrow)
            console.log(MaghribTimeTomorrow)
            console.log(IshaTimeTomorrow)

            dailyDataCreated = true
            
            displayIndividualData(
                FajrTimeToday,FajrTimeTomorrow,
                SunriseToday,SunriseTomorrow,
                DhuhrTimeToday,DhuhrTimeTomorrow,
                AsrTimeToday,AsrTimeTomorrow,
                MaghribTimeToday,MaghribTimeTomorrow,
                IshaTimeToday,IshaTimeTomorrow)
        }
    }
    else {
        if (dailyDataCreated === false) {
            FajrTimeToday = formatText(prayerTimes[dd-1].Fajr)
            SunriseToday = formatText(prayerTimes[dd-1].Sunrise)
            DhuhrTimeToday = formatText(prayerTimes[dd-1].Dhuhr)
            AsrTimeToday = formatText(prayerTimes[dd-1].Asr)
            MaghribTimeToday = formatText(prayerTimes[dd-1].Maghrib)
            IshaTimeToday = formatText(prayerTimes[dd-1].Isha)

            for (let i = 0; i < d2.length; i++) {
                newMonthPrayerTimes[i] = d2[i].timings
                newMonthDates[i] = d2[i].date.gregorian.date
            }

            let FajrTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Fajr)
            let SunriseTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Sunrise)
            let DhuhrTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Dhuhr)
            let AsrTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Asr)
            let MaghribTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Maghrib)
            let IshaTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Isha) 

            console.log(`Today ${d1[dd-1].date.readable} [${dd-1}]:`)
            console.log(FajrTimeToday)
            console.log(SunriseToday)
            console.log(DhuhrTimeToday)
            console.log(AsrTimeToday)
            console.log(MaghribTimeToday)
            console.log(IshaTimeToday)

            console.log(`Tomorrow ${d2[ddTomorrow-1].date.readable} [${ddTomorrow-1}]:`)
            console.log(FajrTimeTomorrow)
            console.log(SunriseTomorrow)
            console.log(DhuhrTimeTomorrow)
            console.log(AsrTimeTomorrow)
            console.log(MaghribTimeTomorrow)
            console.log(IshaTimeTomorrow)

            dailyDataCreated = true
            
            displayIndividualData(
                FajrTimeToday,FajrTimeTomorrow,
                SunriseToday,SunriseTomorrow,
                DhuhrTimeToday,DhuhrTimeTomorrow,
                AsrTimeToday,AsrTimeTomorrow,
                MaghribTimeToday,MaghribTimeTomorrow,
                IshaTimeToday,IshaTimeTomorrow)
        }
    }

    if (dd <= d1.length) {
        if (weekDataCreated === false) {
            let startOfWeek = findStartOfWeeks(d1)
            start = getStartValue(startOfWeek,d1.length)
            weeks = createWeeksData(d1,start)
            length = d1.length
            console.log(table)
            displayTableWeekly(weeks,length)
            
            weekDataCreated = true
        }
    }
    else {
        if (weekDataCreated === false) {
            let startOfWeek = findStartOfWeeks(d2)
            start = getStartValue(startOfWeek,d2.length)
            weeks = createWeeksData(d2,start)
            length = d2.length
            
            displayTableWeekly(weeks,length)

            weekDataCreated = true
        }
    }

    months = createMonthsData(d)

    monthsArray[index] = months

    index+=1
};

function displayIndividualData(
    FajrTimeToday,FajrTimeTomorrow,
    SunriseToday,SunriseTomorrow,
    DhuhrTimeToday,DhuhrTimeTomorrow,
    AsrTimeToday,AsrTimeTomorrow,
    MaghribTimeToday,MaghribTimeTomorrow,
    IshaTimeToday,IshaTimeTomorrow) {
    
    //Appends the fetched data to an element on the page
	if (currentTime > (IshaTimeToday.substr(0,5)) && currentTime < '23:59') {
		document.getElementById("fajrTime").innerHTML = `${FajrTimeTomorrow}`
		document.getElementById("sunriseTime").innerHTML = `${SunriseToday}`
		document.getElementById("dhuhrTime").innerHTML = `${DhuhrTimeTomorrow}`
		document.getElementById("asrTime").innerHTML = `${AsrTimeTomorrow}`
		document.getElementById("maghribTime").innerHTML = `${MaghribTimeTomorrow}`
		document.getElementById("ishaTime").innerHTML = `${IshaTimeTomorrow}`
	}
	else {
		document.getElementById("fajrTime").innerHTML = `${FajrTimeToday}`
		document.getElementById("sunriseTime").innerHTML = `${SunriseTomorrow}`
		document.getElementById("dhuhrTime").innerHTML = `${DhuhrTimeToday}`
		document.getElementById("asrTime").innerHTML = `${AsrTimeToday}`
		document.getElementById("maghribTime").innerHTML = `${MaghribTimeToday}`
		document.getElementById("ishaTime").innerHTML = `${IshaTimeToday}`
    }
}

function findStartOfWeeks(data) {

    let count = 0
    let startOfWeek = []

    for (let i = 0; i < data.length; i++) {
        
        let weekday = data[i].date.gregorian.weekday.en.substr(0,1)

        if (weekday.match("M")) {
            startOfWeek[count] = data[i].date.gregorian.day
            count++
        }
    }

    return startOfWeek
};

function getStartValue(startOfWeek,dataLength) {
    
    let start = 1

    for (let i = 0; i < startOfWeek.length - 1; i++) {
        if (dd >= startOfWeek[i] && dd < startOfWeek[i+1]) {
            start = startOfWeek[i]
        }
        else if (dd >= startOfWeek[i] && dd <= dataLength) {
            start = startOfWeek[startOfWeek.length-1]
        }
    }

    return start
};

function createWeeksData(data,start) {
    
    let count = 0

    for (let i = start - 1; (count < 7 && (i <= data.length)); i++) {
              
        weeks[count] = []

        if (i < data.length) {
            
            weeks[count][0] = data[i].date.gregorian.weekday.en
            weeks[count][1] = data[i].date.readable
            weeks[count][2] = data[i].date.hijri.day + ' ' + data[i].date.hijri.month.en + ' ' + data[i].date.hijri.year
            weeks[count][3] = formatText(data[i].timings.Fajr)
            weeks[count][4] = formatText(data[i].timings.Sunrise)
            weeks[count][5] = formatText(data[i].timings.Dhuhr)
            weeks[count][6] = formatText(data[i].timings.Asr)
            weeks[count][7] = formatText(data[i].timings.Maghrib)
            weeks[count][8] = formatText(data[i].timings.Isha)

            count++
        }
    }

    return weeks
};

function displayTableWeekly(weeks,length) {

    deleteTable()

    let rows = []
    let count = 0
    
    for (let i = 0; i < 7; i++) {
        if (Array.isArray(weeks[i]) && weeks[i].length) {
            if (weeks[i][1].substr(0,2) <= length) {
                let items = [
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td'),
                    document.createElement('td')
                ]

                items[0].append(weeks[i][0])
                items[1].append(weeks[i][1])
                items[2].append(weeks[i][2])
                items[3].append(weeks[i][3])
                items[4].append(weeks[i][4])
                items[5].append(weeks[i][5])
                items[6].append(weeks[i][6])
                items[7].append(weeks[i][7])
                items[8].append(weeks[i][8])

                if (items[0].innerText !== '') {
                    
                    rows[count] = document.createElement('tr')
                    
                    if (items[1].innerText.substr(0,2) == (dd-1))
                    // rows[count].className = 'tableContainer'
                    rows[count].className = 'today'
                }

                items.forEach(item => {     
                    if (item.innerText !== '')
                        rows[count].append(item)
                })

                count++
            }
        }
    }

    rows.forEach(row => {
        table.append(row)
    })
};

function formatText(value) {

    if (value.substr(0,2) < 12) {
        value = `${value.substr(0,5)} AM`
    }
    else {
        value = `${value.substr(0,5)} PM`
    }
    
    return value
};

function createMonthsData(d) {
    
    let count = 0

    for (let h = 1; h < 13; h++) {

        months[h-1] = new Array(d.data[h].length)

        for (let i = 0; i < d.data[h].length; i++) {

            months[h-1][i] = new Array(9);
            
            months[h-1][i][0] = d.data[h][i].date.gregorian.weekday.en
            months[h-1][i][1] = d.data[h][i].date.readable
            months[h-1][i][2] = d.data[h][i].date.hijri.day + ' ' + d.data[h][i].date.hijri.month.en + ' ' + d.data[h][i].date.hijri.year
            months[h-1][i][3] = formatText(d.data[h][i].timings.Fajr)
            months[h-1][i][4] = formatText(d.data[h][i].timings.Sunrise)
            months[h-1][i][5] = formatText(d.data[h][i].timings.Dhuhr)
            months[h-1][i][6] = formatText(d.data[h][i].timings.Asr)
            months[h-1][i][7] = formatText(d.data[h][i].timings.Maghrib)
            months[h-1][i][8] = formatText(d.data[h][i].timings.Isha)
        }
        count++
    }

    return months
};

function displayTableMonthly(months,mm) {

    deleteTable()

    let rows = []
    let count = 0
    
    for (let i = 0; i < months[mm-1].length; i++) {
            
        let items = [
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td'),
            document.createElement('td')
        ]
        
        items[0].append(months[mm-1][i][0])
        items[1].append(months[mm-1][i][1])
        items[2].append(months[mm-1][i][2])
        items[3].append(months[mm-1][i][3])
        items[4].append(months[mm-1][i][4])
        items[5].append(months[mm-1][i][5])
        items[6].append(months[mm-1][i][6])
        items[7].append(months[mm-1][i][7])
        items[8].append(months[mm-1][i][8])

        if (items[0].innerText !== '') {
            
            rows[count] = document.createElement('tr')
            
            if (items[1].innerText.substr(0,2) == dd-1)
                rows[count].className = 'today'
        }

        items.forEach(item => {     
            if (item.innerText !== '')
                rows[count].append(item)
        })

        count++
    }

    rows.forEach(row => {
        table.append(row)
    })
};

function deleteTable() {

    if (table.rows.length > 0) {
        while (table.rows.length > 0) {
            table.childNodes.forEach(row => {
                row.remove()
            })
        }
    }
};

function nextMonth() {
    
    if (currentTable === 'monthly')
        counter++
    
    if (counter == 13) {
        year+=1
        counter = 1
        fetchData(api,latitude,longitude,method,mm,year)
    }

    if (counter == 1) {

        setTimeout(() => {
            if (currentTable == 'weekly') {
                displayTableWeekly(weeks,length)
            }
            else if (currentTable == 'monthly') {
                displayTableMonthly(months,counter)
            }
            else {
                displayTableYearly(year)
            }
        }, 2000)
    }
    else {
        if (currentTable == 'weekly') {
            displayTableWeekly(weeks,length)
        }
        else if (currentTable == 'monthly') {
            displayTableMonthly(months,counter)
        }
        else {
            displayTableYearly(year)
        }
    }
};

function previousMonth() {
    
    if (currentTable === 'monthly')
    counter--

    if (counter == 0) {
        year-=1
        counter = 12
        fetchData(api,latitude,longitude,method,mm,year)
    }
    
    if (counter == 12) {

        setTimeout(() => {
            if (currentTable == 'weekly') {
                displayTableWeekly(weeks,length)
            }
            else if (currentTable == 'monthly') {
                console.log(counter)
                displayTableMonthly(months,counter)
            }
            else {
                displayTableYearly(year)
            }
        }, 2000)
    }
    else {
        if (currentTable == 'weekly') {
            displayTableWeekly(weeks,length)
        }
        else if (currentTable == 'monthly') {
            console.log(counter)
            displayTableMonthly(months,counter)
        }
        else {
            displayTableYearly(year)
        }
    }
};

function resetMonth() {
    
    counter = mm
    currentTable = 'weekly'

    disableNavButtons()

    tableButtons[0].disabled = true
    tableButtons[1].disabled = false
    tableButtons[2].disabled = true

    displayTableWeekly(weeks,length)
};

function weekly() {
    
    btnWeekly.disabled = true
    btnMonthly.disabled = false

    disableNavButtons()

    currentTable = 'weekly'
    displayTableWeekly(weeks,length)
};


function monthly() {
    
    btnWeekly.disabled = false
    btnMonthly.disabled = true

    enableNavButtons()

    currentTable = 'monthly'
    displayTableMonthly(months,counter)
};


function yearly() {

    disableNavButtons()
    currentTable = 'yearly'
    displayTableYearly(year)
};

function disableNavButtons() {

    btnPrevious.disabled = true
    btnReset.disabled = true
    btnNext.disabled = true
};

function enableNavButtons() {

    btnPrevious.disabled = false
    btnReset.disabled = false
    btnNext.disabled = false
};

fetchData(api,latitude,longitude,method,mm,yyyy)

btnWeekly.addEventListener("click",weekly)
btnMonthly.addEventListener("click",monthly)
btnYearly.addEventListener("click",yearly)

btnPrevious.addEventListener("click",previousMonth)
btnReset.addEventListener("click",resetMonth)
btnNext.addEventListener("click",nextMonth)

disableNavButtons()

btnWeekly.disabled = true
btnYearly.disabled = true
		
if (currentTime > FajrTimeToday & currentTime < DhuhrTimeToday || currentTime == DhuhrTimeToday) {
	document.getElementById("DhuhrPrayer").classList.add("nextPrayer");
}
if (currentTime > DhuhrTimeToday & currentTime < AsrTimeToday || currentTime == AsrTimeToday) {
	document.getElementById("AsrPrayer").classList.add("nextPrayer");
}
if (currentTime > AsrTimeToday & currentTime < MaghribTimeToday || currentTime == MaghribTimeToday) {
	document.getElementById("MaghribPrayer").classList.add("nextPrayer");
}
if (currentTime > MaghribTimeToday & currentTime < IshaTimeToday || currentTime == IshaTimeToday) {
	document.getElementById("IshaPrayer").classList.add("nextPrayer");
}
if (currentTime > IshaTimeToday || currentTime < FajrTimeTomorrow || currentTime == FajrTimeTomorrow) {
	document.getElementById("FajrPrayer").classList.add("nextPrayer");
}


//next prayer in:::
