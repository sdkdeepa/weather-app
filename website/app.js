/* Global Variables */
const openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiBaseURL = "https://deepa-basic-weather-app.herokuapp.com/";
// Personal API Key for OpenWeatherMap API
const openWeatherMapAPIKey = "e2ee7e64869c75e3f36fbabefe6442ae&units=imperial";

// Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById("generate").addEventListener("click", () => getDataFromOpenWeatherAPI(openWeatherMapAPIKey));


/* Function to GET Web API Data*/
async function getDataFromOpenWeatherAPI(apiKey) {
    let zipCode = document.getElementById("zip").value;
    fetch(openWeatherURL + zipCode + ",us&appid=" + apiKey).then((response) => {
        return response.json();
    }).then((result) => {
        postProjectData(result.main.temp);
    });
}

/* Asynchronus function for GET API call to GET Project Data */
async function getProjectData() {
    fetch(apiBaseURL + 'projectData').then((response) => {
        return response.json();
    }).then((result) => {
        document.getElementById("date").innerHTML = result.date;
        document.getElementById("temp").innerHTML = JSON.stringify(result.temp) + "°C";
        document.getElementById("content").innerHTML = result.content;
        document.getElementById("zip").value = "";
        document.getElementById("feelings").value = "";
    });
}

/* Asynchronus function for POST API call to POST Project Data */
async function postProjectData(temp) {

    // Creating date instance using JS date function
    let d = new Date();
    let newDate = d.getMonth()+ 1 + '/' + d.getDate() + '/' + d.getFullYear();
    let content = document.getElementById("feelings").value;
    let data = {
        date: newDate,
        temp: temp,
        content: content,
    };
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    fetch(apiBaseURL + 'projectData', options).then((response) => {
        return response.json();
    }).then((result) => {
        getProjectData()
    });
}
