//Creates a new instance of today and tomorrow's date
let today = new Date();
today.setDate(today.getDate())
let tomorrow = new Date();
tomorrow.setDate(today.getDate()+1)

var dateToday = today.toDateString().substr(8,2) + ' ' + today.toDateString().substr(4,3) + ' ' + today.toDateString().substr(11,4)

var dd = today.getDate();
var mm = today.getMonth()+1; //Adds 1 to the month because it is 0 based
var yyyy = today.getFullYear();

var ddTomorrow = tomorrow.getDate();
var mmNext = tomorrow.getMonth()+1 != today.getMonth()+1 ? tomorrow.getMonth()+1 : today.getMonth()+1 //Adds 1 to the month because it is 0 based
var yyyyNext = tomorrow.getFullYear()

var hh;
var min;

var dateDisplayed = false;

var currentTime = getCurrentTime(today);

var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function getCurrentTime(today) {

    hh = today.getHours();
    min = today.getMinutes();
    
    if (min < 10) {
        min = '0' + min
    }

    if (hh < 10) {
        currentTime = '0' + hh + ":" + min;
    }
    else {
        currentTime = hh + ":" + min;
    }

    if (hh < 12)
        currentTime += ' AM'
    else
        currentTime += ' PM'

    return currentTime;
}

//Gets the element on the page being used to display the api data
const table = $('#tableDisplay')

const btnWeekly = $('#weekly')
const btnMonthly = $('#monthly')
const btnHolidays = $('#holidays')

const btnNext = $('#next')
const btnReset = $('#reset')
const btnPrevious = $('#previous')

// English dates to look for to remove an islamic date if there is extra
var englishDatesToRemoveFor = ['']

// Arrays used to add any missing islamic dates if the english date matches
var englishDatesToInsertFor = ['']
var islamicDatesToInsert = ['']
var islamicDatesToRemove = ['']

var islamicHolidays = [
    { 
        'date': '10 Muḥarram',
        'name': 'Day of Ashura'
    },
    { 
        'date': '12 Rabīʿ al-awwal',
        'name': 'Mawlaad-un-Nabi'
    },
    { 
        'date': '27 Rajab',
        'name': 'Lailat-ul Mehraaj'
    },
    { 
        'date': '15 Shaʿbān',
        'name': "Lailat-ul Bara'at"
    },
    { 
        'date': '01 Ramaḍān',
        'name': '1st of Ramadaan'
    },
    { 
        'date': '21 Ramaḍān',
        'name': 'Lailat-ul Qadr'
    },
    { 
        'date': '23 Ramaḍān',
        'name': 'Lailat-ul Qadr'
    },
    { 
        'date': '25 Ramaḍān',
        'name': 'Lailat-ul Qadr'
    },
    { 
        'date': '27 Ramaḍān',
        'name': 'Lailat-ul Qadr'
    },
    { 
        'date': '29 Ramaḍān',
        'name': 'Lailat-ul Qadr'
    },
    { 
        'date': '01 Shawwāl',
        'name': 'Eid-ul Fitr'
    },
    { 
        'date': '08 Dhū al-Ḥijjah',
        'name': 'Hajj'
    },
    { 
        'date': '09 Dhū al-Ḥijjah',
        'name': 'Day of Arafah'
    },
    { 
        'date': '10 Dhū al-Ḥijjah',
        'name': 'Eid-ul Adha'
    },
    { 
        'date': '11 Dhū al-Ḥijjah',
        'name': 'Hajj'
    },
    { 
        'date': '12 Dhū al-Ḥijjah',
        'name': 'Hajj'
     }
]

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
var holidays = new Array(16)

var defaultTableHeadings = `
<th>Weekday</th>
<th>Date (English)</th>
<th>Date (Arabic)</th>
<th>Fajr</th>
<th>Sunrise</th>
<th>Zhuhr</th>
<th>Asr</th>
<th>Maghrib</th>
<th>Isha</th>`

var currentTable = 'weekly'

var navButtons = [btnPrevious,btnReset,btnNext]
var tableButtons = [btnWeekly,btnMonthly,btnHolidays]

let FajrTimeToday = ''
let SunriseToday = ''
let DhuhrTimeToday = ''
let AsrTimeToday = ''
let MaghribTimeToday = ''
let IshaTimeToday = ''

let FajrTimeTomorrow = ''
let SunriseTomorrow = ''
let DhuhrTimeTomorrow = ''
let AsrTimeTomorrow = ''
let MaghribTimeTomorrow = ''
let IshaTimeTomorrow = ''

let maghribEnded = false

var locations = [
    "Auckland",
    "Christchurch",
    "Dunedin",
    "Gore",
    "Invercargill",
    "Oamaru",
    "Queenstown",
    "Timaru",
    "Wellington",
    "Hamilton"
]
var latitudes = [
    "-36.8485",
    "-43.5321",
    "-45.87416",
    "-46.0988",
    "-46.4132",
    "-45.0975",
    "-45.0312",
    "-44.3970",
    "-41.2769",
    "-37.87500"
]
var longitudes = [
    "174.7633",
    "172.6362",
    "170.50361",
    "168.9458",
    "168.3538",
    "170.9704",
    "168.6626",
    "171.2550",
    "174.7731",
    "175.29428"
]

//Variables for easier referencing
let api = 'https://api.aladhan.com/v1/calendar'
let latitude = '-45.87416';
let longitude = '170.50361';

let method = 2
let month = mm

function resetEverything() {

    console.clear()

    dailyDataCreated = false
    weekDataCreated = false

    changeLocation()

    fetchData(api,latitude,longitude,method,yyyy);
}

function changeLocation(){

    var location = $('#mySelect').val();

    localStorage.setItem("location", location)

    checkLocation(location)
}

function checkLocation(location) {

    for (i = 0; i < locations.length; i++) {
        if (location == locations[i]) {
            latitude = latitudes[i];
            longitude = longitudes[i];
        }
    }
}

function getLocation() {

    var location = localStorage.getItem("location")

    if (location != null) {
        checkLocation(location)
        $('#mySelect').val(location);
    }
    else {
        $('#mySelect').val("Dunedin");
    }
}

function popError() {
    $("#errorMessage").attr("style", "display: block;");
    $("#overlay").attr("style", "display: block;");

    var location = localStorage.getItem("location")
    $("#CurrentL").html("Your location has changed has been changed to: " + '<br><br>' + '<strong style="font-size:200%;">' + location +'</strong>');
}

function closePopup() {
    $("#overlay").attr("style", "display: none;");
    $("#errorMessage").attr("style", "display: none;");
}

function fetchData(api,latitude,longitude,method,yyyy) {
 
    //Fetch used to query the API for the prayer times
    fetch(`${api}?latitude=${latitude}&longitude=${longitude}&method=${method}&year=${yyyy}&annual=true`)
    .then(res => res.json())
    .then(d => {        
        //Checks if the request was successful and the page exists
        if (d.code === 200) {
            data = d
            displayData(data)
        }
         //Prints an error message to the console if the request was unsuccessful or the page doesn't exist
        else if (d.code === 404) {
            console.log("Error! The server returned a status of 404 page not found. Could not get this month's information")
        }
    })
}

function toggleBoxShadow(index) {
    let prayerCardNames = [
        $('#FajrPrayer'),
        $('#DhuhrPrayer'),
        $('#AsrPrayer'),
        $('#MaghribPrayer'),
        $('#IshaPrayer')
    ];

    prayerCardNames[index].toggleClass('nextPrayer');
}

function findNextPrayer(FajrTimeToday, DhuhrTimeToday, AsrTimeToday, MaghribTimeToday, IshaTimeToday, FajrTimeTomorrow) {
    if (currentTime.substr(0,5) < FajrTimeToday.substr(0,5) || currentTime.substr(0,5) == FajrTimeToday.substr(0,5)) {
        toggleBoxShadow(0);
    }
    else if (currentTime.substr(0,5) > FajrTimeToday.substr(0,5) & currentTime.substr(0,5) < DhuhrTimeToday.substr(0,5) || currentTime.substr(0,5) == DhuhrTimeToday.substr(0,5)) {
        toggleBoxShadow(1);
    }
    else if (currentTime.substr(0,5) > DhuhrTimeToday.substr(0,5) & currentTime.substr(0,5) < AsrTimeToday.substr(0,5) || currentTime.substr(0,5) == AsrTimeToday.substr(0,5)) {
        toggleBoxShadow(2);
    }
    else if (currentTime.substr(0,5) > AsrTimeToday.substr(0,5) & currentTime.substr(0,5) < MaghribTimeToday.substr(0,5) || currentTime.substr(0,5) == MaghribTimeToday.substr(0,5)) {
        toggleBoxShadow(3);
    }
    else if (currentTime.substr(0,5) > MaghribTimeToday.substr(0,5) & currentTime.substr(0,5) < IshaTimeToday.substr(0,5) || currentTime.substr(0,5) == IshaTimeToday.substr(0,5)) {
        toggleBoxShadow(4);
        maghribEnded = true;
    }
    else if (currentTime.substr(0,5) > IshaTimeToday.substr(0,5) || currentTime.substr(0,5) < FajrTimeTomorrow.substr(0,5) || currentTime.substr(0,5) == FajrTimeTomorrow.substr(0,5)) {
        toggleBoxShadow(0);
        maghribEnded = true;
    }
}

function displayData(d) {

    let d1 = d.data[mm]
    let d2 = d.data[mmNext]

    if (mmNext < mm) {
        console.log('Next Year')

    }
    
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
            
            FajrTimeTomorrow = formatText(prayerTimes[dd].Fajr)
            SunriseTomorrow = formatText(prayerTimes[dd].Sunrise)
            DhuhrTimeTomorrow = formatText(prayerTimes[dd].Dhuhr)
            AsrTimeTomorrow = formatText(prayerTimes[dd].Asr)
            MaghribTimeTomorrow = formatText(prayerTimes[dd].Maghrib)
            IshaTimeTomorrow = formatText(prayerTimes[dd].Isha) 

            findNextPrayer(
                FajrTimeToday,
                DhuhrTimeToday,
                AsrTimeToday,
                MaghribTimeToday,
                IshaTimeToday,
                FajrTimeTomorrow
            );

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

            FajrTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Fajr)
            SunriseTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Sunrise)
            DhuhrTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Dhuhr)
            AsrTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Asr)
            MaghribTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Maghrib)
            IshaTimeTomorrow = formatText(newMonthPrayerTimes[ddTomorrow-1].Isha) 

            findNextPrayer(
                FajrTimeToday,
                DhuhrTimeToday,
                AsrTimeToday,
                MaghribTimeToday,
                IshaTimeToday,
                FajrTimeTomorrow
            );

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

    months = createMonthsData(d)

    monthsArray[index] = months

    index+=1

    if (dd <= d1.length) {
        if (weekDataCreated === false) {
            let startOfWeek = findStartOfWeeks(d1)
            start = getStartValue(startOfWeek,d1.length)
            weeks = createWeeksData(months[mm-1], start)
            length = d1.length
            displayTableWeekly(weeks,length)
            
            weekDataCreated = true
        }
    }
    else {
        if (weekDataCreated === false) {
            let startOfWeek = findStartOfWeeks(d2)
            start = getStartValue(startOfWeek,d2.length)
            weeks = createWeeksData(months[mmNext-1], start)
            length = d2.length
            
            displayTableWeekly(weeks,length)

            weekDataCreated = true
        }
    }
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
		$("#fajrTime").html(`${FajrTimeTomorrow}`)
		$("#sunriseTime").html(`${SunriseTomorrow}`)
		$("#dhuhrTime").html(`${DhuhrTimeTomorrow}`)
		$("#asrTime").html(`${AsrTimeTomorrow}`)
		$("#maghribTime").html(`${MaghribTimeTomorrow}`)
		$("#ishaTime").html(`${IshaTimeTomorrow}`)
	}
	else {
		$("#fajrTime").html(`${FajrTimeToday}`)
		$("#sunriseTime").html(`${SunriseToday}`)
		$("#dhuhrTime").html(`${DhuhrTimeToday}`)
		$("#asrTime").html(`${AsrTimeToday}`)
		$("#maghribTime").html(`${MaghribTimeToday}`)
		$("#ishaTime").html(`${IshaTimeToday}`)
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

function createWeeksData(data, start) {
    let count = 0
    
    for (let i = start - 1; (count < 7 && (i <= data.length)); i++) {
              
        weeks[count] = []

        if (i < data.length) {
            
            weeks[count][0] = data[i][0]
            weeks[count][1] = data[i][1]
            weeks[count][2] = data[i][2]
            weeks[count][3] = formatText(data[i][3])
            weeks[count][4] = formatText(data[i][4])
            weeks[count][5] = formatText(data[i][5])
            weeks[count][6] = formatText(data[i][6])
            weeks[count][7] = formatText(data[i][7])
            weeks[count][8] = formatText(data[i][8])
            weeks[count][9] = data[i][9]

            count++
        }
    }

    return weeks
};

function displayTableWeekly(weeks,length) {

    deleteTable()

    let rows = []
    let count = 0
    
    $('#table-row-headings').html(defaultTableHeadings)
    
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
                    
                    if (items[1].innerText == dateToday)
                        rows[count].className = 'today'

                    if (!weekdays.includes(weeks[i][9])) {
                        rows[count].classList.add('islamicHoliday')
                        rows[count].toggleAttribute('tooltip')
                        rows[count].title = weeks[i][9]
                    }
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

function insertIslamicDate(islamicDates, newIslamicDate, index, d, insertNewDate) {
    
    if (insertNewDate) {
        console.log('Inserting New Islamic Date: ' + newIslamicDate)
        islamicDates.splice(index, 0, newIslamicDate)
    }

    let count = 0

    for (let h = 1; h < 13; h++) {
        for (let i = 0; i < d.data[h].length; i++) {
            months[h-1][i][2] = islamicDates[count]            
            count++
        }
    }
}

function removeIslamicDate(islamicDates, index, d, insertNewDate) {
    
    if (insertNewDate) {
        console.log('Removing Islamic Date: ' + islamicDates[index])
        islamicDates.splice(index, 1)
    }

    let count = 0

    for (let h = 1; h < 13; h++) {
        for (let i = 0; i < d.data[h].length; i++) {
            months[h-1][i][2] = islamicDates[count]            
            count++
        }
    }
}

function adjustIslamicDates(islamicDates, d) {
    
    let index = 0

    englishDatesToInsertFor.forEach((englishDate) => {
        months.forEach((month) => {
            let month_index = months.indexOf(month);

            month.forEach((day) => {
                let day_index = month.indexOf(day);
                let hijriDate = islamicDates[index].substr(0, islamicDates[index].length - 5)

                if (day[1] == englishDate) {
                    let islamicDateIndex = englishDatesToInsertFor.indexOf(englishDate)
                    insertIslamicDate(islamicDates, islamicDatesToInsert[islamicDateIndex], index, d, true)
                }

                months[month_index][day_index][9] = isIslamicHoliday(hijriDate, months[month_index][day_index][0])

                index++
            })
        })
    })

    islamicDatesToRemove.forEach((islamicDateToRemove) => {
        islamicDates.forEach((islamicDate) => {
            if (islamicDateToRemove == islamicDate) {
                let index = islamicDates.indexOf(islamicDate)
                removeIslamicDate(islamicDates, index, d, true)
            }
        })
    })

    index = 0;

    months.forEach((month) => {
        let month_index = months.indexOf(month);

        month.forEach((day) => {
            let day_index = month.indexOf(day);
            let hijriDate = islamicDates[index].substr(0, islamicDates[index].length - 5)
            months[month_index][day_index][2] = islamicDates[index]
            months[month_index][day_index][9] = isIslamicHoliday(hijriDate, months[month_index][day_index][0])

            index++
        })
    })
}

function isIslamicHoliday(hijriDate, dayOfWeek) {
    found = ''

    islamicHolidays.forEach((islamicHoliday) => {
        if (islamicHoliday['date'] == hijriDate) {  
            found = islamicHoliday['name'];
        }
    })

    if (found === '') {
        return dayOfWeek;
    }
    else {
        return found;
    }
}

function createMonthsData(d) {
    
    let count = 0
    var islamicDates = []
    let holidaysCounter = 0

    for (let h = 1; h < 13; h++) {

        months[h-1] = new Array(d.data[h].length)

        for (let i = 0; i < d.data[h].length; i++) {

            months[h-1][i] = new Array(10);
            holidays[holidaysCounter] = new Array(10);
            
            hijriDay = d.data[h][i].date.hijri.day
            hijriMonth = d.data[h][i].date.hijri.month.en
            hijriYear = d.data[h][i].date.hijri.year

            // islamicDates[count] = d.data[h][i].date.hijri.day + ' ' + d.data[h][i].date.hijri.month.en + ' ' + d.data[h][i].date.hijri.year
            islamicDates[count] = hijriDay + ' ' + hijriMonth + ' ' + hijriYear
            
            months[h-1][i][0] = d.data[h][i].date.gregorian.weekday.en
            months[h-1][i][1] = d.data[h][i].date.readable
            months[h-1][i][2] = islamicDates[count]
            // months[h-1][i][2] = d.data[h][i].date.hijri.day + ' ' + d.data[h][i].date.hijri.month.en + ' ' + d.data[h][i].date.hijri.year
            months[h-1][i][3] = formatText(d.data[h][i].timings.Fajr)
            months[h-1][i][4] = formatText(d.data[h][i].timings.Sunrise)
            months[h-1][i][5] = formatText(d.data[h][i].timings.Dhuhr)
            months[h-1][i][6] = formatText(d.data[h][i].timings.Asr)
            months[h-1][i][7] = formatText(d.data[h][i].timings.Maghrib)
            months[h-1][i][8] = formatText(d.data[h][i].timings.Isha)
            months[h-1][i][9] = isIslamicHoliday(hijriDay + ' ' + hijriMonth, months[h-1][i][0])

            if (!weekdays.includes(months[h-1][i][9])) {
                holidays[holidaysCounter][0] = months[h-1][i][0]
                holidays[holidaysCounter][1] = months[h-1][i][1]
                holidays[holidaysCounter][2] = months[h-1][i][2]
                holidays[holidaysCounter][3] = months[h-1][i][3]
                holidays[holidaysCounter][4] = months[h-1][i][4]
                holidays[holidaysCounter][5] = months[h-1][i][5]
                holidays[holidaysCounter][6] = months[h-1][i][6]
                holidays[holidaysCounter][7] = months[h-1][i][7]
                holidays[holidaysCounter][8] = months[h-1][i][8]
                holidays[holidaysCounter][9] = months[h-1][i][9]

                holidaysCounter++
            }

            count++
        }
    }
    
    adjustIslamicDates(islamicDates, d)
    
    if (!dateDisplayed)
    {
        if (dd < months[mm-1].length) {
            
            displayDate(
                months[mm-1][dd-1][1],
                months[mm-1][dd-1][2],
                months[mm-1][dd][2],
                months[mm-1][dd-1][9]
            )
                
            dateDisplayed = true;
        }
        else {

            displayDate(
                months[mm-1][dd-1][1],
                months[mm-1][dd-1][2],
                months[mm][ddTomorrow-1][2],
                months[mm-1][dd-1][9]
            )
                
            dateDisplayed = true;
        }       
    }

    return months
};

function displayTableMonthly(months,mm) {

    deleteTable()

    let rows = []
    let count = 0
    
    $('#table-row-headings').html(defaultTableHeadings)

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
            
            if (items[1].innerText == dateToday)
                rows[count].className = 'today'

		    rows[count].setAttribute("id", "todayScroll")
        
            if (!weekdays.includes(months[mm-1][i][9])) {
                rows[count].classList.add('islamicHoliday')
                rows[count].toggleAttribute('tooltip')
                rows[count].title = months[mm-1][i][9]
            }
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


function displayTableHolidays() {

    deleteTable()

    let rows = []
    let count = 0

    for (let i = 0; i < islamicHolidays.length; i++) {
        $('#table-row-headings').html(`
        <th>Holiday</th>
        <th>Weekday</th>
        <th>Date (English)</th>
        <th>Date (Arabic)</th>
        <th>Fajr</th>
        <th>Sunrise</th>
        <th>Zhuhr</th>
        <th>Asr</th>
        <th>Maghrib</th>
        <th>Isha</th>`)
        
        let items = [
            document.createElement('td'),
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

        items[0].append(holidays[i][9])
        items[1].append(holidays[i][0])
        items[2].append(holidays[i][1])
        items[3].append(holidays[i][2])
        items[4].append(holidays[i][3])
        items[5].append(holidays[i][4])
        items[6].append(holidays[i][5])
        items[7].append(holidays[i][6])
        items[8].append(holidays[i][7])
        items[9].append(holidays[i][8])

        if (items[0].innerText !== '') {

            rows[count] = document.createElement('tr')
            
            if (items[1].innerText == dateToday)
                rows[count].className = 'today'

		    rows[count].setAttribute("id", "todayScroll")
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


function displayDate(englishDate, islamicDateToday, islamicDateTomorrow, islamicHolidayName) {
    let heading1 = document.createElement('h3');
    let heading2 = document.createElement('h3');
    let heading3 = document.createElement('h3');

    heading1.innerHTML = englishDate;

    if (maghribEnded) {
        heading3.innerHTML = islamicDateTomorrow;
    }
    else {
        heading3.innerHTML = islamicDateToday;
    }

    heading2.innerHTML = islamicHolidayName;

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');

    div1.id = 'englishDate'
    div2.id = 'islamicHoliday'
    div2.classList.add('islamicHoliday')
    div3.id = 'islamicDate'

    div1.append(heading1);
    div2.append(heading2);
    div3.append(heading3);
    
    let dateDiv = $('#date');
    
    dateDiv.append(div1);
    dateDiv.append(div2);
    dateDiv.append(div3);
}

function deleteTable() {

    const tbody = $('#tableDisplay > tbody')

    if (tbody.children().length > 0) {
        while (tbody.children().length > 0) {
            tbody[0].childNodes.forEach(row => {
                row.remove()
            })
        }
    }
};

function nextMonth() {
    
    if (currentTable === 'monthly')
        counter++
    
    if (counter == 13) {
        yyyy+=1
        counter = 1
        fetchData(api,latitude,longitude,method,yyyy)
    }

    if (counter == 1) {

        setTimeout(() => {
            if (currentTable == 'weekly') {
                displayTableWeekly(weeks,length)
            }
            else if (currentTable == 'monthly') {
                displayTableMonthly(months,counter)
            }
        }, 2500)
    }
    else {
        if (currentTable == 'weekly') {
            displayTableWeekly(weeks,length)
        }
        else if (currentTable == 'monthly') {
            displayTableMonthly(months,counter)
        }
    }
};

function previousMonth() {
    
    if (currentTable === 'monthly')
    counter--

    if (counter == 0) {
        yyyy-=1
        counter = 12
        fetchData(api,latitude,longitude,method,yyyy)
    }
    
    if (counter == 12) {

        setTimeout(() => {
            if (currentTable == 'weekly') {
                displayTableWeekly(weeks,length)
            }
            else if (currentTable == 'monthly') {
                displayTableMonthly(months,counter)
            }
        }, 2500)
    }
    else {
        if (currentTable == 'weekly') {
            displayTableWeekly(weeks,length)
        }
        else if (currentTable == 'monthly') {
            displayTableMonthly(months,counter)
        }
    }
};

function resetMonth() {
    
    counter = mm
    yyyy = today.getFullYear()
    currentTable = 'weekly'

    fetchData(api,latitude,longitude,method,yyyy)

    disableNavButtons()

    tableButtons[0].attr('disabled', true)
    tableButtons[1].attr('disabled', false)
    tableButtons[2].attr('disabled', false)

    displayTableWeekly(weeks,length)
};

function weekly() {
    
    btnWeekly.attr('disabled', true)
    btnMonthly.attr('disabled', false)
    btnHolidays.attr('disabled', false)

    disableNavButtons()

    currentTable = 'weekly'
    displayTableWeekly(weeks,length)
};


function monthly() {
    
    btnWeekly.attr('disabled', false)
    btnMonthly.attr('disabled', true)
    btnHolidays.attr('disabled', false)

    enableNavButtons()

    currentTable = 'monthly'
    displayTableMonthly(months,counter)
};


function showHolidays() {

    btnWeekly.attr('disabled', false)
    btnMonthly.attr('disabled', false)
    btnHolidays.attr('disabled', true)

    disableNavButtons()
    currentTable = 'holidays'

    // btnHolidays.attr('disabled', true);
    // Need to code up the yearly view
    displayTableHolidays(year)
};

function disableNavButtons() {

    btnPrevious.attr('disabled', true)
    btnReset.attr('disabled', true)
    btnNext.attr('disabled', true)
};

function enableNavButtons() {

    btnPrevious.attr('disabled', false)
    btnReset.attr('disabled', false)
    btnNext.attr('disabled', false)
};

getLocation()
fetchData(api,latitude,longitude,method,yyyy)

btnWeekly.on("click", weekly)
btnMonthly.on("click", monthly)
btnHolidays.on("click", showHolidays)

btnPrevious.on("click", previousMonth)
btnReset.on("click", resetMonth)
btnNext.on("click", nextMonth)

disableNavButtons()

btnWeekly.attr('disabled', true)

console.log('Current Time = ' + currentTime)

setTimeout(() => {
    playAzaan();
}, 2500)

function playAzaan () {
    var audio = $("#azaan_audio");

    let salaahTimes = [FajrTimeToday, DhuhrTimeToday, AsrTimeToday, MaghribTimeToday, IshaTimeToday];

    let endAzaanTimes = [];

    for (let i = 0; i < salaahTimes.length; i++) {

        let endAzaanTime = calcEndAzaanTime(salaahTimes[i]);
        endAzaanTimes[i] = getCurrentTime(endAzaanTime);
    }

    let check = false;

    today = new Date();

    currentTime = getCurrentTime(today)
    
    if (currentTime.substr(0,5) == FajrTimeToday.substr(0,5)) {
        console.log('Playing Fajr Azaan...')
        sendNotification('Fajr', FajrTimeToday);
        audio.attr('style', 'display: block');
        audio[0].play();
    }
    else if (currentTime.substr(0,5) == DhuhrTimeToday.substr(0,5)) {
        console.log('Playing Dhuhr Azaan...')
        sendNotification('Dhur', DhuhrTimeToday);
        audio.attr('style', 'display: block');
        audio[0].play();
    }
    else if (currentTime.substr(0,5) == AsrTimeToday.substr(0,5)) {
        console.log('Playing Asr Azaan...')
        sendNotification('Asr', AsrTimeToday);
        audio.attr('style', 'display: block');
        audio[0].play();
    }
    else if (currentTime.substr(0,5) == MaghribTimeToday.substr(0,5)) {
        console.log('Playing Maghrib Azaan...')
        sendNotification('Maghrib', MaghribTimeToday);
        audio.attr('style', 'display: block');
        audio[0].play();
    }
    else if (currentTime.substr(0,5) == IshaTimeToday.substr(0,5)) {
        console.log('Playing Isha Azaan...')
        sendNotification('Isha', IshaTimeToday);
        audio.attr('style', 'display: block');
        audio[0].play();
    }
    else {
        for (let i = 0; i < endAzaanTimes.length; i++) {
            if (currentTime.substr(0,5) >= salaahTimes[i].substr(0,5) && currentTime.substr(0,5) <= endAzaanTimes[i].substr(0,5)) {
                check = true;
            }            
        }

        if (!check) {
            audio.stop();
            audio.attr('style', 'display: none');
        }
        else {
            audio.attr('style', 'display: block');
        }
    }
}

function calcEndAzaanTime(salaahTime) {
    return new Date(new Date(today.getFullYear(), today.getMonth()+1, today.getDate(), salaahTime.substr(0,2), salaahTime.substr(3,2)).getTime() + 180000);
}

async function sendNotification(salaah, time) {    
    let message = salaah + ' Salaah Time: ' + time;
    
    Push.create(message);
    
    // const workbox = new Workbox('/serviceWorker.js'); 
    // workbox.register(); 

    // const swVersion = await workbox.messageSW({type: 'GET_VERSION', salaah: salaah, message: message}); 
    // console.log('Service Worker version:', swVersion);
}

setInterval(function () { playAzaan(); }, 60000)

if (!Push.Permission.has()) {
    if (Push.Permission.get() === 'default') {
        alert('If you wish to receive salaah time notifications, please select "Allow" (in the following popup) to enable notifications.');
        // alert('Please note, if you wish to receive salaah time notifications, please select "Allow" (in the following popup) to enable notifications otherwise select "Block" to disable notifications. You will not be able to change it or re-enable it unless you reset the site permissions.');
 
    }
    
    Push.Permission.request(Push.Permission.onGranted, Push.Permission.onDenied);
}

console.log('Notification Permission: ' + Push.Permission.get())
