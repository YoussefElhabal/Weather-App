// Today
let todayDayName = document.getElementById('todayDayName');
let todayDayNumber = document.getElementById('todayDayNumber');
let todayMonth = document.getElementById('todayMonth');
let todayLocation = document.getElementById('todayLocation');
let todayTemperature = document.getElementById('todayTemperature');
let todayConditionImage = document.getElementById('todayConditionImage');
let todayCondition = document.getElementById('todayCondition');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('windSpeed');
let windDirection = document.getElementById('windDirection');

// Next Days
let nextDayName = document.getElementsByClassName('nextDayName');
let nextConditionImage = document.getElementsByClassName('nextConditionImage');
let nextMax = document.getElementsByClassName('nextMax');
let nextMin = document.getElementsByClassName('nextMin');
let nextConditionText = document.getElementsByClassName('nextConditionText');

// Search
let searchInput = document.querySelector('#search');

// Fetch API
async function getWeatherData(city) {
    let WeatherRequest = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c815513d847b4df28bb103947240207&q=${city}&days=3`);
    let weatherResponse = await WeatherRequest.json();
    return weatherResponse
};

// Display Today
function displayToday(weatherToday) {
    let todayDate = new Date();
    todayDayName.innerHTML = todayDate.toLocaleDateString("en-US", {weekday:"long"});
    todayDayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {month:"long"});
    todayLocation.innerHTML = weatherToday.location.name;
    todayTemperature.innerHTML = weatherToday.current.temp_c + ' C';
    todayConditionImage.setAttribute('src', weatherToday.current.condition.icon)
    todayCondition.innerHTML = weatherToday.current.condition.text;
    humidity.innerHTML = weatherToday.current.humidity + ' %';
    windSpeed.innerHTML = weatherToday.current.wind_kph + ' Km/h';
    windDirection.innerHTML = weatherToday.current.wind_dir;
}

// Display Next Days
function displayNextDays(weatherNext) {
    let forecastNext = weatherNext.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastNext[i+1].date);
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {weekday:"long"});
        nextConditionImage[i].setAttribute('src', forecastNext[i+1].day.condition.icon);
        nextMax[i].innerHTML = forecastNext[i + 1].day.maxtemp_c;
        nextMin[i].innerHTML = forecastNext[i + 1].day.mintemp_c;
        nextConditionText[i].innerHTML = forecastNext[i + 1].day.condition.text;
    }
}

// Weather App
async function weatherApp(city = 'paris') {
    let weatherData = await getWeatherData(city);
    if(!weatherData.error){
        displayToday(weatherData);
        displayNextDays(weatherData);
    }
}
weatherApp();

searchInput.addEventListener('input', function () {
    weatherApp(searchInput.value);
})