var selectTag = document.getElementById("countrySelect");
var countryName = document.querySelector("#countryName");
var totalCases = document.querySelector("#totalCases");
var newCases = document.querySelector("#newCases");
var recoveredCases = document.querySelector("#recoveredCases");
var totalDeaths = document.querySelector("#totalDeaths");
var jsonFile;
var opt;
function getJSON(){
	fetch("https://corona.lmao.ninja/v2/countries?yesterday&sort")
	.then((response) =>{
		return response.json();
	})
	.then((json) =>{
		jsonFile = json;
		initSelect();
	})
	.catch((err) =>{
		alert("Unable to get data.")
	})
}
function addOptionToSelect(countryName){
	opt = document.createElement("option");
	opt.value = countryName;
	opt.textContent = countryName;
	selectTag.add(opt)

}
function addCountryToSelect(country){
	if(country.cases !== 0){
		addOptionToSelect(country.country);
	}
}
function initSelect(){
	jsonFile.forEach(addCountryToSelect);
}
getJSON();



