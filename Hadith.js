// hadith stuff    
            const date = new Date();
            var DayNumberOfWeek = date.getMilliseconds();
            console.log(DayNumberOfWeek);


            var hadithNumberForApi = "hadithNumber="+ DayNumberOfWeek;
            console.log(hadithNumberForApi);


        const apiUrl = 'https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$zhgih4yx55xV2qkr2oVESel1V3aqStMNDmPPCzCz9MnFHlNqYnUPu&'+ hadithNumberForApi;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        const hadithContainer = document.getElementById("hadith-container");

        // Create a new paragraph element to display the hadith
            const hadithNarration = document.createElement("p");
            hadithNarration.classList.add("Hadith-narrator");
        const hadithElement = document.createElement("p");
        hadithElement.classList.add("Hadith-main");
        const hadithBook = document.createElement("p");
        hadithBook.classList.add("Hadith-book");


        // Set the text content of the paragraph element to the hadith property of the response object
        hadithNarration.textContent = data.hadiths.data["0"].englishNarrator;
        hadithElement.textContent = data.hadiths.data["0"].hadithEnglish;
        hadithBook.textContent = data.hadiths.data["0"].book.bookName;

        // Append the paragraph element to the hadith container element
            hadithContainer.appendChild(hadithNarration);
        hadithContainer.appendChild(hadithElement);
        hadithContainer.appendChild(hadithBook);

        
        console.log(data.hadiths.data["0"].hadithEnglish);
        })
        .catch(error => {
        console.error(error);
        });

// current date
convertMonth()
getArabicDate()

//convert number to month
function convertMonth(){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var todayEnglishDate = date.getDate();
    
    
    let todayEnglishMonth = month[date.getMonth()];
    console.log(todayEnglishDate, todayEnglishMonth)

    document.getElementById("englishDateNumber").innerHTML = todayEnglishDate;
    document.getElementById("englishDateMonth").innerHTML = todayEnglishMonth;
}


function getArabicDate(){
const arabicDateApiUrl = 'https://api.aladhan.com/v1/gToH/18-03-2023';
fetch(arabicDateApiUrl)
.then(response => response.json())
.then(dateApi => {
    console.log(dateApi);
    console.log(dateApi.data.hijri.day);
    console.log(dateApi.data.hijri.month.en);
    document.getElementById("arabicDateNumber").innerHTML = dateApi.data.hijri.day;
    document.getElementById("arabicDateMonth").innerHTML = dateApi.data.hijri.month.en;

})
.catch(error => {
console.error(error);
});
}
