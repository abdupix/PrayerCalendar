//Gets the element on the page being used to display the api data
const output = document.getElementById('test')

//Creates a new instance of today and tomorrow's date
let today = new Date();
today.setDate(today.getDate())
let tomorrow = new Date();
tomorrow.setDate(today.getDate()+1)

var dd = today.getDate();
var mm = today.getMonth()+1; //Adds 1 to the month because it is 0 based
var yyyy = today.getFullYear();

var ddTomorrow = tomorrow.getDate();
var mmTomorrow = tomorrow.getMonth()+1; //Adds 1 to the month because it is 0 based
var yyyyTomorrow = tomorrow.getFullYear();

var hh = today.getHours();
var min = today.getMinutes();
var currentTime = hh + ":" + min;

//Variables for easier referencing
let api = 'https://api.aladhan.com/v1/calendar'
let latitude = '-45.87416'
let longitude = '170.50361'
let method = 2

var displayData = function(
	FajrTimeToday,SunriseToday,DhuhrTimeToday,AsrTimeToday,MaghribTimeToday,IshaTimeToday,
	FajrTimeTomorrow,SunriseTomorrow,DhuhrTimeTomorrow,AsrTimeTomorrow,MaghribTimeTomorrow,IshaTimeTomorrow) {
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
};

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
		
		if (dd < d.data.length) {            
    
			let FajrTimeToday = prayerTimes[dd-1].Fajr
			let SunriseToday = prayerTimes[dd-1].Sunrise
			let DhuhrTimeToday = prayerTimes[dd-1].Dhuhr
			let AsrTimeToday = prayerTimes[dd-1].Asr
			let MaghribTimeToday = prayerTimes[dd-1].Maghrib
			let IshaTimeToday = prayerTimes[dd-1].Isha
			
			let FajrTimeTomorrow = prayerTimes[dd].Fajr
			let SunriseTomorrow = prayerTimes[dd].Sunrise
			let DhuhrTimeTomorrow = prayerTimes[dd].Dhuhr
			let AsrTimeTomorrow = prayerTimes[dd].Asr
			let MaghribTimeTomorrow = prayerTimes[dd].Maghrib
			let IshaTimeTomorrow = prayerTimes[dd].Isha        

			FajrTimeToday = `${FajrTimeToday.substr(0,5)} AM`
			console.log(${FajrTimeToday.substr(6,FajrTimeToday.length)});
			SunriseToday = `${SunriseToday.substr(0,5)} AM ${SunriseToday.substr(6,SunriseToday.length)}`
			DhuhrTimeToday = `${DhuhrTimeToday.substr(0,5)} PM ${DhuhrTimeToday.substr(6,DhuhrTimeToday.length)}`
			AsrTimeToday = `${AsrTimeToday.substr(0,5)} PM ${AsrTimeToday.substr(6,AsrTimeToday.length)}`
			MaghribTimeToday = `${MaghribTimeToday.substr(0,5)} PM ${MaghribTimeToday.substr(6,MaghribTimeToday.length)}`
			IshaTimeToday = `${IshaTimeToday.substr(0,5)} PM ${IshaTimeToday.substr(6,IshaTimeToday.length)}`
			
			FajrTimeTomorrow = `${FajrTimeTomorrow.substr(0,5)} AM ${FajrTimeTomorrow.substr(6,FajrTimeTomorrow.length)}`
			SunriseTomorrow = `${SunriseTomorrow.substr(0,5)} AM ${SunriseTomorrow.substr(6,SunriseTomorrow.length)}`
			DhuhrTimeTomorrow = `${DhuhrTimeTomorrow.substr(0,5)} PM ${DhuhrTimeTomorrow.substr(6,DhuhrTimeTomorrow.length)}`
			AsrTimeTomorrow = `${AsrTimeTomorrow.substr(0,5)} PM ${AsrTimeTomorrow.substr(6,AsrTimeTomorrow.length)}`
			MaghribTimeTomorrow = `${MaghribTimeTomorrow.substr(0,5)} PM ${MaghribTimeTomorrow.substr(6,MaghribTimeTomorrow.length)}`
			IshaTimeTomorrow = `${IshaTimeTomorrow.substr(0,5)} PM ${IshaTimeTomorrow.substr(6,IshaTimeTomorrow.length)}`

			displayData(
				FajrTimeToday,SunriseToday,DhuhrTimeToday,AsrTimeToday,MaghribTimeToday,IshaTimeToday,
				FajrTimeTomorrow,SunriseTomorrow,DhuhrTimeTomorrow,AsrTimeTomorrow,MaghribTimeTomorrow,IshaTimeTomorrow)
		}
		else {
			let FajrTimeToday = prayerTimes[dd-1].Fajr
			let SunriseToday = newMonthPrayerTimes[dd-1].Sunrise
			let DhuhrTimeToday = prayerTimes[dd-1].Dhuhr
			let AsrTimeToday = prayerTimes[dd-1].Asr
			let MaghribTimeToday = prayerTimes[dd-1].Maghrib
			let IshaTimeToday = prayerTimes[dd-1].Isha

			FajrTimeToday = `${FajrTimeToday.substr(0,5)} AM${FajrTimeToday.substr(6,FajrTimeToday.length)}`
			SunriseToday = `${SunriseToday.substr(0,5)} AM ${SunriseToday.substr(6,SunriseToday.length)}`
			DhuhrTimeToday = `${DhuhrTimeToday.substr(0,5)} PM ${DhuhrTimeToday.substr(6,DhuhrTimeToday.length)}`
			AsrTimeToday = `${AsrTimeToday.substr(0,5)} PM ${AsrTimeToday.substr(6,AsrTimeToday.length)}`
			MaghribTimeToday = `${MaghribTimeToday.substr(0,5)} PM ${MaghribTimeToday.substr(6,MaghribTimeToday.length)}`
			IshaTimeToday = `${IshaTimeToday.substr(0,5)} PM ${IshaTimeToday.substr(6,IshaTimeToday.length)}`
			
			//Fetch used to query the API for the prayer times
			fetch(`${api}?latitude=${latitude}&longitude=${longitude}&method=${method}&month=${mmTomorrow}&year=${yyyyTomorrow}`)
			.then(res => res.json())
			.then(d => {
				
				//Checks if the request was successful and the page exists
				if (d.code == 200) {
					//Prints the entire raw query to the console for easy debugging
					console.log(d)
			
					var newMonthPrayerTimes = []
					var newMonthDates = []
			
					for (let i = 0; i < d.data.length; i++) {
						newMonthPrayerTimes[i] = d.data[i].timings
						newMonthDates[i] = d.data[i].date.gregorian.date
					}

					let FajrTimeTomorrow = newMonthPrayerTimes[ddTomorrow-1].Fajr
					let SunriseTomorrow = newMonthPrayerTimes[ddTomorrow-1].Sunrise
					let DhuhrTimeTomorrow = newMonthPrayerTimes[ddTomorrow-1].Dhuhr
					let AsrTimeTomorrow = newMonthPrayerTimes[ddTomorrow-1].Asr
					let MaghribTimeTomorrow = newMonthPrayerTimes[ddTomorrow-1].Maghrib
					let IshaTimeTomorrow = newMonthPrayerTimes[ddTomorrow-1].Isha        

					FajrTimeTomorrow = `${FajrTimeTomorrow.substr(0,5)} AM${FajrTimeTomorrow.substr(6,FajrTimeTomorrow.length)}`
					SunriseTomorrow = `${SunriseTomorrow.substr(0,5)} AM ${SunriseTomorrow.substr(6,SunriseTomorrow.length)}`
					DhuhrTimeTomorrow = `${DhuhrTimeTomorrow.substr(0,5)} PM ${DhuhrTimeTomorrow.substr(6,DhuhrTimeTomorrow.length)}`
					AsrTimeTomorrow = `${AsrTimeTomorrow.substr(0,5)} PM ${AsrTimeTomorrow.substr(6,AsrTimeTomorrow.length)}`
					MaghribTimeTomorrow = `${MaghribTimeTomorrow.substr(0,5)} PM ${MaghribTimeTomorrow.substr(6,MaghribTimeTomorrow.length)}`
					IshaTimeTomorrow = `${IshaTimeTomorrow.substr(0,5)} PM ${IshaTimeTomorrow.substr(6,IshaTimeTomorrow.length)}`

					displayData(
						FajrTimeToday,SunriseToday,DhuhrTimeToday,AsrTimeToday,MaghribTimeToday,IshaTimeToday,
						FajrTimeTomorrow,SunriseTomorrow,DhuhrTimeTomorrow,AsrTimeTomorrow,MaghribTimeTomorrow,IshaTimeTomorrow)
				}
				//Prints an error message to the console if the request was unsuccessful or the page doesn't exist
				else if (d.code == 404) {
					console.log("Error! There is a problem with the API. Server returned a status of 404 page not found.")
				}
			}) 
		}
	}
	//Prints an error message to the console if the request was unsuccessful or the page doesn't exist
	else if (d.code == 404) {
		console.log("Error! There is a problem with the API. Server returned a status of 404 page not found. PLease reload the page")
	}
	
	if (dd < d.data.length) {
		var FajrTimeToday = prayerTimes[dd-1].Fajr
		var DhuhrTimeToday = prayerTimes[dd-1].Dhuhr
		var AsrTimeToday = prayerTimes[dd-1].Asr
		var MaghribTimeToday = prayerTimes[dd-1].Maghrib
		var IshaTimeToday = prayerTimes[dd-1].Isha
		
		var FajrTimeTomorrow = prayerTimes[dd].Fajr
	}
	else {
		var FajrTimeToday = prayerTimes[dd-1].Fajr
		var DhuhrTimeToday = prayerTimes[dd-1].Dhuhr
		var AsrTimeToday = prayerTimes[dd-1].Asr
		var MaghribTimeToday = prayerTimes[dd-1].Maghrib
		var IshaTimeToday = prayerTimes[dd-1].Isha
		
		var FajrTimeTomorrow = newMonthprayerTimes[ddTomorrow].Fajr
	}
		
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
})

//next prayer in:::
