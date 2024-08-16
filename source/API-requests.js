const locationElement = document.getElementById('location');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const img = document.getElementById('picture');

function fetchGeo(location) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`

    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = `${data[0]["name"]}, ${data[0]["country"]}`;
            fetchWeather(data[0]["lat"], data[0]["lon"]);
        })
        .catch(error => {
            console.log('Error fetching geo data:', error);
        });
}

function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    const info = data["weather"][0]["description"];
                    const firstLetter = info[0].toUpperCase();
                    const word = info.slice(1);
                    const result = firstLetter + word;
                    description.textContent = result;

                    const F = Math.round((data["main"]["temp"] - 273.15) * 1.8 + 32);
                    const C = Math.round((F - 32) * (5/9));
                    temperature.textContent = `${F}°F / ${C}°C`;

                    img.setAttribute('src', `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`);
                
                    const mS = data["wind"]["speed"];
                    const mph = data["wind"]["speed"] * 2.237;
                    wind.textContent = `Wind: ${mph.toFixed(1)}mph / ${mS.toFixed(1)}m/s`;
                    humidity.textContent = `Humidity: ${data["main"]["humidity"]}%`;
                })
                .catch(error => {
                    console.log('Error fetching geo data:', error);
                })
}

export {fetchGeo}