var results = document.getElementById("search-results");
// var zipCodeEl;
// var animalZipCode;

var clientKey = "5dYu5nCemONh8dz1t3pshWYHA5Z5oQL2ZkjuAgijqEabt7NKMVSz0ZqjkpA3j54i";

// fetching the cats information
function fetchCats() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/vnd.api+json");
  myHeaders.append("Authorization", "94css0vo");

  var raw = JSON.stringify({
    data: {
      filters: [
        {
          fieldName: "statuses.name",
          operation: "notblank",
          criteria: "Available",
        }
      ],
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    limit: 10,
  };

  fetch(
    "https://api.rescuegroups.org/v5/public/animals/search/available/cats/haspic?include=locations,pictures&sort=random&limit=10",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      // calling the display function
      displayPet(data.data, data.included);
    });
}
// fetching the dogs information
function fetchDogs() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/vnd.api+json");
  myHeaders.append("Authorization", "94css0vo");

  var raw = JSON.stringify({
    data: {
      filters: [
        {
          fieldName: "statuses.name",
          operation: "notblank",
          criteria: "Available",
        }
      ],
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    limit: 10,
  };

  fetch(
    "https://api.rescuegroups.org/v5/public/animals/search/available/dogs/haspic?include=locations,pictures&sort=random&limit=10",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      // calling the display function
      displayPet(data.data, data.included);
    });
}

// add event listener to the search submit button
var submitBtn = document.getElementById("submitbtn");
submitBtn.onclick = function (event) {
  // calling the search function
  searchPet();
  event.preventDefault();
};
// search function depending on pet type
function searchPet() {
  const pet = document.querySelectorAll('input[name="answer"]');
  let selectedValue;
  for (const type of pet) {
    if (type.checked) {
      selectedValue = type.value;
      break;
    }
  }
  console.log(selectedValue);
  if (selectedValue === "dogs") {
    fetchDogs();
  } else if (selectedValue === "cats") {
    fetchCats();
    //debugger;
  }

 
 
}



// the display function
function displayPet(pets, location, distance) {
  for (var i = 0; i < pets.length; i++) {
    for (var i = 0; i < location.length; i++) {
      

      
    //creating a span to hold the pets information
    var petCard = document.createElement("span");
    petCard.className = "box has-background-success-light";
    petCard.setAttribute("style", "margin: 50px 50px; padding: 0 50px;");
    results.appendChild(petCard);

    // creating the picture of the pet
    var img = document.createElement("img");
    img.src = pets[i].attributes.pictureThumbnailUrl;
    img.alt = "Picture is not available";
    img.setAttribute("style", "width:200px; height:200px; padding: 20px;");
    petCard.appendChild(img);

    // creating the  name paragraph
    var nameEL = document.createElement("P");
    nameEL.textContent += "Pet Name: " + pets[i].attributes.name;
    petCard.appendChild(nameEL);

    //creating the age paragraph
    var ageGroup = document.createElement("p");
    ageGroup.textContent += "Age Group: " + pets[i].attributes.ageGroup;
    petCard.appendChild(ageGroup);


    //Creates Breed paragraph
    var breed = document.createElement("p");
    breed.textContent += "Breed: " + pets[i].attributes.breedString;
    petCard.appendChild(breed);



    // creating the location paragraph
    var locationCity = document.createElement("p");
    locationCity.textContent += "Location: " + location[i].attributes.citystate;
    petCard.appendChild(locationCity);

    var zipCode = document.createElement("p");
    zipCode.textContent += "Zip Code: " + location[i].attributes.postalcode;
    petCard.appendChild(zipCode);
    console.log(zipCode);
 
    //Get the value of the api zipcodes
    var animalZipCode = location[i].attributes.postalcode;
    console.log(animalZipCode);
    compareZipCode(animalZipCode);

    var contactEl = document.createElement("p");
    contactEl.textContent = "Contact No: " + location[i].attributes.phone;
    petCard.appendChild(contactEl);

    var farFrom = document.createElement("p");
    farFrom.textContent = "You are: " + distance + " miles away from this pet.";
    farFrom.setAttribute("style", "background-color:red; color: white;")
    petCard.appendChild(farFrom);
    console.log(farFrom);

    }   
  }
  };
 

// function for comparing two zip code 
function compareZipCode(zipCodeEl, animalZipCode){
  var zipCodeEl = document.getElementById("zipcode").value;
  console.log(zipCodeEl);


  var zipCodeApiUrl = "https://www.zipcodeapi.com/rest/" + clientKey + "/distance.json/" + zipCodeEl +"/"+ animalZipCode +"/mile"
  fetch (zipCodeApiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
  console.log(data);
  
  })
  }

