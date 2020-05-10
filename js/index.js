var selectTag = document.getElementById("countrySelect");
var countryName = document.querySelector("#countryName");
var totalCases = document.querySelector("#totalCases");
var newCases = document.querySelector("#newCases");
var recoveredCases = document.querySelector("#recoveredCases");
var totalDeaths = document.querySelector("#totalDeaths");
var searchButton = document.querySelector("#searchButton");
var searchInput = document.querySelector("#searchh");
var searchInputHolder = document.querySelector("#searchholder");

var searchDIV = document.getElementsByClassName("div-search");
var toggleButton = document.querySelector("#toggleButton");
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

function toggleButtonEvent(event){
	
	if(event.textContent == "Search Country"){
		event.textContent = "Select Country";
		searchDIV.style.display = "block";
		countrySelect.style.display = "none";

	}
	else{
		searchDIV.style.display = "none";
		countrySelect.style.display = "block";
		event.textContent = "Search Country";

	}
}
function getIndexStartsWith(){
	return jsonFile.findIndex((country) =>{
		return country.country.startsWith(searchInput.value[0].toUpperCase()+searchInput.value.substring(1,));
	})
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
function isCountryExistInput(country){
	return country.country === searchInput.value;
}
function findCountryIndexInput(){
	return jsonFile.findIndex(isCountryExistInput);
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
function loadSearch(event){

	var countryIndex = findCountryIndexInput();

	if(countryIndex === -1 && event.value === "Global"){
		loadGlobalData();	
	}
	else if(countryIndex !== -1 && event.value !== "Global"){
		countryName.value = jsonFile[countryIndex].country;
		totalCases.value = jsonFile[countryIndex].cases;
		newCases.value = jsonFile[countryIndex].todayCases;
		recoveredCases.value = jsonFile[countryIndex].recovered;
		totalDeaths.value = jsonFile[countryIndex].deaths;
	}
	else{
		alert("Country not found or Country does not have COVID cases.");
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

toggleButton.addEventListener("click", function(event){
	
	if(this.textContent === "Search Country"){
		this.textContent = "Select Country";
		searchInput.value = "";
		clearData();
		searchDIV[0].style.display = "block";
		countrySelect.style.display = "none";


	}
	else if(this.textContent === "Select Country"){
		selectTag.options.selectedIndex = 0;
		loadGlobalData();
		searchholder.placeholder = "";
		searchDIV[0].style.display = "none";
		countrySelect.style.display = "block";
		this.textContent = "Search Country";

	}
});
function clearData(){
	countryName.value = "";
	totalCases.value = "";
	newCases.value = "";
	recoveredCases.value = "";
	totalDeaths.value = "";
}

searchButton.addEventListener("click", loadSearch)
searchInput.addEventListener("keyup", function(event){
	if(event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode === 8){
		try{
			if(searchInput.value === ""){
				searchholder.placeholder = "";
			}
			else{
				searchholder.placeholder = jsonFile[getIndexStartsWith()].country;
			}
		}catch(TypeError){
			searchholder.placeholder = "";
		}
	}
	if(event.keyCode === 13 && searchholder.placeholder != ""){
		searchInput.value = searchholder.placeholder;
		searchButton.click();
	}
	else{
		clearData();
	}
})
selectTag.addEventListener("change", loadSpecificCountry);
getJSON();
loadGlobalJSON();




