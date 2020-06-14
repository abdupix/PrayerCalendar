//Gets the element on the page being used to display the api data
const output = document.getElementById('test')

// Function used to get the curent system date
var currentDate = function(separator){

    //Creates a new instance of today's date
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Adds 1 to the month because it is 0 based
    var yyyy = today.getFullYear();

    
    
    //Appends a 0 to the front of the date or month variable if the value is less than 10
    if(dd < 10) 
        dd='0' + dd;

    if(mm < 10) 
        mm='0' + mm;

    return (dd + separator + mm + separator + yyyy);
};

//Variables for easier referencing
let api = 'http://api.aladhan.com/v1/timings/'
let date = currentDate('-')
let latitude = '-45.87416'
let longitude = '170.50361'
let method = 2

//Fetch used to query the API for the prayer times
fetch(`${api}${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`)
.then(res => res.json())
.then(d => {
    
    //Checks if the request was successful and the page exists
    if (d.code == 200) {
        //Prints the entire raw query to the console for easy debugging
        console.log(d)
        
        //Appends the fetched data to an element on the page
        document.getElementById("fajrTime").innerHTML = `${d.data.timings.Fajr}` + " AM"
        document.getElementById("dhuhrTime").innerHTML = `${d.data.timings.Dhuhr}` + " PM"
        document.getElementById("asrTime").innerHTML = `${d.data.timings.Asr}` + " PM"
        document.getElementById("maghribTime").innerHTML = `${d.data.timings.Maghrib}` + " PM"
        document.getElementById("ishaTime").innerHTML = `${d.data.timings.Isha}` + " PM"
        
    }
    //Prints an error message to the console if the request was unsuccessful or the page doesn't exist
    else if (d.code == 404) {
        console.log("Error! There is a problem with the API. Server returned a status of 404 page not found. PLease reload the page")
    }
    var hh = today.getHours();
    var min = today.getMinutes();
    var currentTime = hh+":"+min;
    var FajrTime = `${d.data.timings.Fajr}`;
    var DhuhrTime = `${d.data.timings.Dhuhr}`;
    var AsrTime = `${d.data.timings.Asr}`;
    var MaghribTime = `${d.data.timings.Maghrib}`;
    var IshaTime = `${d.data.timings.Isha}`;

    if (currentTime > FajrTime & currentTime < DhuhrTime){
        document.getElementById("AsrPrayer").classList.add("nextPrayer")
    }

    if (currentTime > DhuhrTime & currentTime < AsrTime){
        document.getElementById("AsrPrayer").classList.add("nextPrayer")
    }

    if (currentTime > AsrTime & currentTime < MaghribTime){
        document.getElementById("AsrPrayer").classList.add("nextPrayer")
    }

    if (currentTime > MaghribTime & currentTime < IshaTime){
        document.getElementById("AsrPrayer").classList.add("nextPrayer")
    }

    if (currentTime > IshaTime & currentTime < FajrTime){
        document.getElementById("AsrPrayer").classList.add("nextPrayer")
    }



    

})


    


