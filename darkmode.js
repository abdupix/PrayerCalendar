// variable ste
var checkbox = document.querySelector("input[name=theme]");
// if the switch is checkd the dark theme attritube will change to dark and display a warnig
checkbox.addEventListener("change", function() {
	if (this.checked) {
		trans()
		document.documentElement.setAttribute("data-theme", "dark")
	} else {
		trans()
		document.documentElement.setAttribute("data-theme", "light")
	}
})
// transition for switching to night mode
let trans = () => {
	document.documentElement.classList.add("transition");
	window.setTimeout(() => {
		document.documentElement.classList.remove("transition")
	}, 1000)
}