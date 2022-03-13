var results = document.getElementById('search-results');
var zipCodeEl = document.getElementById('zipcode').value;
API_KEY="Ox4J2CfddfAE81OU71NzdHbZ1L4w6BAqHlbql6TJD7Iz39vPR2uuIBVJ2Dwqs8No"
 


// fetching the cats information
  function fetchCats(){
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/vnd.api+json");
myHeaders.append("Authorization", "94css0vo");

var raw = JSON.stringify({
  "data": {
    "filterRadius": {
      "miles": 100,
      "coordinates": "34.1031,-118.416"
    }
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
  limit:5
};

   fetch("https://api.rescuegroups.org/v5/public/animals/search/available/cats/haspic?include=locations,pictures&sort=random&limit=10", requestOptions)
  .then(response => response.json())
  .then(function(data){
    console.log(data);
     // calling the display function 
    displayPet(data.data,data.included);

   } )
  
  }
// fetching the dogs information 
  function fetchDogs(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/vnd.api+json");
    myHeaders.append("Authorization", "94css0vo");
    
    var raw = JSON.stringify({
      "data": {
        "filterRadius": {
          "miles": 100,
          "coordinates": "34.1031,-118.416"
        }
      }
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      limit:5
    };
    
       fetch("https://api.rescuegroups.org/v5/public/animals/search/available/dogs/haspic?include=locations,pictures&sort=random&limit=10", requestOptions)
      .then(response => response.json())
      .then(function(data){ 
        console.log(data);
       // calling the display function
       displayPet(data.data,data.included);
       } ) 
      }
    
// add event listener to the search submit button
var submitBtn = document.getElementById('submitbtn');
submitBtn.onclick = function(event){
  // calling the search function
  searchPet();
  event.preventDefault();
}
// search function depending on pet type
function searchPet(){
  const pet = document.querySelectorAll('input[name="answer"]');
  let selectedValue;
  for (const type of pet){
    if (type.checked){
      selectedValue = type.value;
      break;
    }
  }
  console.log(selectedValue);
  if (selectedValue === "dogs"){
    fetchDogs();
  }
  else if (selectedValue === "cats"){
    fetchCats();
    //debugger;
  }
//console.log(zipCodeEl);
}
 // function for comparing two zip code 
function compareZipCode(user,animal){
var zipCodeApiUrl = "https://www.zipcodeapi.com/rest/js-"+ API_KEY +"/distance.json/" + user +"/"+ animal +"/mile"
fetch (zipCodeApiUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
console.log(data);
//var farFrom = document.createElement("p");
//farFrom.textContent = "You are:" + data + "miles away from this pet.";
//results.appendChild(farFrom);
//console.log(farFrom);
})
}
compareZipCode("06902","06905");

// the display function
function displayPet(pets,location){
  for (var i = 0; i < pets.length; i++) {
    for (var i = 0; i < location.length; i++){
      //creating a span to hold the cats information 
      var petCard = document.createElement("span");
      petCard.className= "box has-background-success-light";
      results.appendChild(petCard);
     
      // creating the picture of the pet 
     var img = document.createElement("img");
     img.src = pets[i].attributes.pictureThumbnailUrl;
     img.alt = "Picture is not available";
     img.setAttribute("style","width:200px; hight:200px; ");
     petCard.appendChild(img);
     
     // creating the  name paragraph
     var nameEL =document.createElement("P");
     nameEL.textContent += "Pet Name: "+ pets[i].attributes.name;
     petCard.appendChild(nameEL);
     
     //creating the age paragraph
     var ageGroup = document.createElement("p");
     ageGroup.textContent += "Age Group: "+ pets[i].attributes.ageGroup;
     petCard.appendChild(ageGroup);
     
     // creating the location paragraph
     var zipCode = document.createElement("p");
     zipCode.textContent += "Location: " + location[i].attributes.citystate +"  zip code: " + location[i].attributes.postalcode;
     
     // console.log(zipCode);
     petCard.appendChild(zipCode);
     var contactEl = document.createElement("p");
     contactEl.textContent= "Contact No: "+ location[i].attributes.phone;
     petCard.appendChild(contactEl);


     //trying to get only the pets that have available location 
     var locationType = document.createElement("p");
    locationType.textContent= "type:" +location[i].type;
    petCard.appendChild(locationType);
    console.log(locationType);
    }
  }
}
