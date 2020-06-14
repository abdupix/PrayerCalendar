// variable ste
var checkbox = document.querySelector("input[name=theme]");
localStorage.setItem("data-theme", "light");
// if the switch is checkd the dark theme attritube will change to dark and display a warnig
checkbox.addEventListener("change", function() {
	if (this.checked) {
		trans()
		document.documentElement.setAttribute("data-theme", "dark")
		if (typeof(Storage) !== "undefined") {
			// Store
			localStorage.setItem("data-theme", "dark");
			// Retrieve
			console.log(localStorage.getItem("data-theme") + " retrieve");
		  }
	} else {
		trans()
		document.documentElement.setAttribute("data-theme", "light")
		if (typeof(Storage) !== "undefined") {
			// Store
			localStorage.setItem("data-theme", "light");
			// Retrieve
			console.log(localStorage.getItem("data-theme") + " retrive");
		  }
	}
})
// transition for switching to night mode
let trans = () => {
	document.documentElement.classList.add("transition");
	window.setTimeout(() => {
		document.documentElement.classList.remove("transition")
	}, 1000)
}

if(localStorage.getItem("data-theme") == "light"){
	document.documentElement.setAttribute("data-theme", "light");
	console.log("light mode scum");
}
if(localStorage.getItem("data-theme") == "dark"){
	document.documentElement.setAttribute("data-theme", "dark");
	console.log("night mode hero");
}

