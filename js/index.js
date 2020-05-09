var selectTag = document.getElementById("countrySelect");
var countryName = document.querySelector("#countryName");
var totalCases = document.querySelector("#totalCases");
var newCases = document.querySelector("#newCases");
var recoveredCases = document.querySelector("#recoveredCases");
var totalDeaths = document.querySelector("#totalDeaths");
var jsonFile;
var globalJSON;
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

function isCountryExist(country){
	return country.country === selectTag.value;
}
function findCountryIndex(){
	return jsonFile.findIndex(isCountryExist);

}
function specificCountryURLFormat(countryName){
	var format = "https://corona.lmao.ninja/v2/countries/"+countryName+"?yesterday=true&strict=true&query";
	return format;
}
function loadSpecificCountry(event){
		
	if(selectTag.value !== "Global"){
		var countryIndex = findCountryIndex();
		countryName.value = jsonFile[countryIndex].country;
		totalCases.value = jsonFile[countryIndex].cases;
		newCases.value = jsonFile[countryIndex].todayCases;
		recoveredCases.value = jsonFile[countryIndex].recovered;
		totalDeaths.value = jsonFile[countryIndex].deaths;
	}
	else{
		loadGlobalData();
	}
	
}
function loadGlobalJSON(){
	fetch("https://corona.lmao.ninja/v2/all?yesterday")
	.then((response) =>{
		return response.json();
	})
	.then((json) =>{
		globalJSON = json;
		loadGlobalData();
	})
	.catch((err)=>{
		alert(err);
	}) 
}
function loadGlobalData(){
	countryName.value = "Global";
	totalCases.value = globalJSON.cases;
	newCases.value = globalJSON.todayCases;
	recoveredCases.value = globalJSON.recovered;
	totalDeaths.value = globalJSON.deaths;
}


selectTag.addEventListener("change", loadSpecificCountry)
getJSON();
loadGlobalJSON();





