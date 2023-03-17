const apiUrl = 'https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$zhgih4yx55xV2qkr2oVESel1V3aqStMNDmPPCzCz9MnFHlNqYnUPu&hadithNumber=1';
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