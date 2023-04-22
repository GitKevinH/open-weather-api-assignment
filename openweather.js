// Base Requirements
// You must create a website with the following items:

// - A page with a heading and sections separating your content

// - The page must be styled either using a CSS framework or your own custom CSS

// - You must make an API call to the service and get the weather data

// - You must accept input from the user asking for the zip code they would like the weather of

// - You must display the following data points on the page from the API:

//     Current Date, City from the zipcode, Current temperature in ferinheight, current conditions, Temp Hi/Lo

// - Host using GitHub Pages

async function getAPI(url){
    try {
        let response = await fetch(url);  // awaits for fetch to grab URL, then puts promise content into response (either resolve or reject) 
        return await response.json(); // awaits for response to be parsed
    
    } catch (error) {  // Catches errors
        console.log(error);
    }    
    
    };


async function getWeather(longitude,latitude){  // takes logitude and latitude as parameters to grab from API and display/return results.
    let weatherData = await getAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6267599adf2b02ebf4fb74ae8f890df1&units=imperial`);

    return weatherData;
}


async function getLocation(zipcode){
    let coordinates = await getAPI(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=6267599adf2b02ebf4fb74ae8f890df1`);

    return coordinates;
}


async function releaseKraken(zipcode){
    clearData();
    const date = new Date();
    dateString = date.toDateString();

    let geoAPIInfo = await getLocation(zipcode);
    let weatherData = await getWeather(geoAPIInfo.lon,geoAPIInfo.lat);
    addToHTML(`${dateString}<br>`);
    addToHTML(`City: ${geoAPIInfo.name}<br>`);
    addToHTML(`Current Conditions: ${weatherData.weather[0].description}<br>`);
    addToHTML(`Current Temps (°F): ${weatherData.main.temp}<br>`);
    addToHTML(`Expected Hi/Lo (°F): ${weatherData.main.temp_max}/${weatherData.main.temp_min}<br>`);
}

 //releaseKraken(48312);

 const form = document.querySelector('#zipform');
 const zipcodeInput = document.querySelector('#zipcode');
 
 if (form){
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const zipcode = zipcodeInput.value;
        releaseKraken(zipcode);
      });
 }


function addToHTML(data)
{       
    let emptyHTML = document.querySelector('#fromJScript');  
    emptyHTML.innerHTML += data + "<br>";
}



function clearData(){  // button used to clear data when submitting the zipcode.
    let emptyHTML = document.querySelector('#fromJScript');  
     emptyHTML.innerHTML = '';
}

