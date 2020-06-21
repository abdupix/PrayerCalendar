//Gets the element on the page being used to display the api data
const output = document.getElementById('test')

//Creates a new instance of today's date
today = new Date();

var dd = today.getDate();
var mm = today.getMonth()+1; //Adds 1 to the month because it is 0 based
var yyyy = today.getFullYear();

var hh = today.getHours();
var min = today.getMinutes();
var currentTime = hh + ":" + min;

//Appends a 0 to the front of the date or month variable if the value is less than 10
if(dd < 10) 
    dd='0' + dd;

if(mm < 10) 
    mm='0' + mm;

//Variables for easier referencing
let api = 'https://api.aladhan.com/v1/calendar'
let latitude = '-45.87416'
let longitude = '170.50361'
let method = 2

//Fetch used to query the API for the prayer times
fetch(`${api}?latitude=${latitude}&longitude=${longitude}&method=${method}&month=${mm}&year=${yyyy}`)
.then(res => res.json())
.then(d => {
	//Checks if the request was successful and the page exists
	if (d.code == 200) {
		//Prints the entire raw query to the console for easy debugging
		console.log(d)

		var prayerTimes = []
        var dates = []

        for (let i = 0; i < d.data.length; i++) {
            prayerTimes[i] = d.data[i].timings
            dates[i] = d.data[i].date.gregorian.date
        }

        let FajrTimeToday = prayerTimes[dd-1].Fajr
        let DhuhrTimeToday = prayerTimes[dd-1].Dhuhr
        let AsrTimeToday = prayerTimes[dd-1].Asr
        let MaghribTimeToday = prayerTimes[dd-1].Maghrib
        let IshaTimeToday = prayerTimes[dd-1].Isha
        
        let FajrTimeTomorrow = prayerTimes[dd].Fajr
        let DhuhrTimeTomorrow = prayerTimes[dd].Dhuhr
        let AsrTimeTomorrow = prayerTimes[dd].Asr
        let MaghribTimeTomorrow = prayerTimes[dd].Maghrib
		let IshaTimeTomorrow = prayerTimes[dd].Isha  
		
        FajrTimeToday = `${FajrTimeToday.substr(0,5)} AM ${FajrTimeToday.substr(6,FajrTimeToday.length)}`
        DhuhrTimeToday = `${DhuhrTimeToday.substr(0,5)} PM ${DhuhrTimeToday.substr(6,DhuhrTimeToday.length)}`
        AsrTimeToday = `${AsrTimeToday.substr(0,5)} PM ${AsrTimeToday.substr(6,AsrTimeToday.length)}`
        MaghribTimeToday = `${MaghribTimeToday.substr(0,5)} PM ${MaghribTimeToday.substr(6,MaghribTimeToday.length)}`
        IshaTimeToday = `${IshaTimeToday.substr(0,5)} PM ${IshaTimeToday.substr(6,IshaTimeToday.length)}`

        FajrTimeTomorrow = `${FajrTimeTomorrow.substr(0,5)} AM ${FajrTimeTomorrow.substr(6,FajrTimeTomorrow.length)}`
        DhuhrTimeTomorrow = `${DhuhrTimeTomorrow.substr(0,5)} PM ${DhuhrTimeTomorrow.substr(6,DhuhrTimeTomorrow.length)}`
        AsrTimeTomorrow = `${AsrTimeTomorrow.substr(0,5)} PM ${AsrTimeTomorrow.substr(6,AsrTimeTomorrow.length)}`
        MaghribTimeTomorrow = `${MaghribTimeTomorrow.substr(0,5)} PM ${MaghribTimeTomorrow.substr(6,MaghribTimeTomorrow.length)}`
        IshaTimeTomorrow = `${IshaTimeTomorrow.substr(0,5)} PM ${IshaTimeTomorrow.substr(6,IshaTimeTomorrow.length)}`

		//Appends the fetched data to an element on the page
		if (currentTime > IshaTimeToday && currentTime < '00:00') {
			document.getElementById("fajrTime").innerHTML = `${FajrTimeToday}`
			document.getElementById("dhuhrTime").innerHTML = `${DhuhrTimeToday}`
			document.getElementById("asrTime").innerHTML = `${AsrTimeToday}`
			document.getElementById("maghribTime").innerHTML = `${MaghribTimeToday}`
			document.getElementById("ishaTime").innerHTML = `${IshaTimeToday}`
		}
		else {
			document.getElementById("fajrTime").innerHTML = `${FajrTimeTomorrow}`
			document.getElementById("dhuhrTime").innerHTML = `${DhuhrTimeTomorrow}`
			document.getElementById("asrTime").innerHTML = `${AsrTimeTomorrow}`
			document.getElementById("maghribTime").innerHTML = `${MaghribTimeTomorrow}`
			document.getElementById("ishaTime").innerHTML = `${IshaTimeTomorrow}`
		}
	}
	//Prints an error message to the console if the request was unsuccessful or the page doesn't exist
	else if (d.code == 404) {
		console.log("Error! There is a problem with the API. Server returned a status of 404 page not found. PLease reload the page")
	}
	
	var FajrTimeToday = prayerTimes[dd-1].Fajr
	var DhuhrTimeToday = prayerTimes[dd-1].Dhuhr
	var AsrTimeToday = prayerTimes[dd-1].Asr
	var MaghribTimeToday = prayerTimes[dd-1].Maghrib
	var IshaTimeToday = prayerTimes[dd-1].Isha
	
	var FajrTimeTomorrow = prayerTimes[dd].Fajr
		
	if (currentTime > FajrTimeToday & currentTime < DhuhrTimeToday || currentTime == DhuhrTimeToday) {
		document.getElementById("DhuhrPrayer").classList.add("nextPrayer");
	}
	if (currentTime > DhuhrTimeToday & currentTime < AsrTimeToday || currentTime == AsrTimeToday) {
		document.getElementById("AsrPrayer").classList.add("nextPrayer");
		// var nekPrayer = Math.abs(parseInt(currentTime) - parseInt(AsrTime));
		// console.log(parseInt(currentTime));
		// console.log(AsrTime);
		// console.log(nekPrayer);
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
})

//next prayer in:::