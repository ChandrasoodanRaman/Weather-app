const apiKey="d3b93edac05d8e0efce574a91fb074fc"

const inputEle=document.getElementById("city-input")

const weatherData=document.getElementById("weather-data")

const formEle=document.querySelector("form")


formEle.addEventListener("submit",(event)=>
{
    event.preventDefault()      /*Clicking on a "Submit" button, prevent it from submitting a form.Clicking on a link, prevent the link from following the URL*/
    const cityValue=inputEle.value
    getWeatherData(cityValue)

})

async function getWeatherData(cityValue)
{
    try {
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if(!response.ok)
        {
            throw new Error("response is not ok")
        }
        const data=await response.json()
        
        const temperature=Math.round(data.main.temp)
        const description=data.weather[0].description
        const icon=data.weather[0].icon

        const details=[
            `feelsLike:${Math.round(data.main.feels_like)}`,
            `humidity:${data.main.humidity}%`,
            `windSpeed:${data.wind.speed}m/s`
        ]
        weatherData.querySelector(".weather-icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather-icon">`
        
        weatherData.querySelector(".temperature").textContent=`${temperature}°C`
        
        weatherData.querySelector(".description").textContent=`${description}`
        
        weatherData.querySelector(".details").innerHTML=details.map(
            (detail)=>`<div class="details">${detail}</div>`).join("")
    } catch (error) {
        weatherData.querySelector(".weather-icon").innerHTML=""
        
        weatherData.querySelector(".temperature").textContent=""
        
        weatherData.querySelector(".description").textContent="an error happened"
        
        weatherData.querySelector(".details").innerHTML=""
    }
}