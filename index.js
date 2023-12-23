let temp

document.addEventListener('DOMContentLoaded', async function () {
    const position = await getPosition()
    temp = getTemp(position.coords.latitude, position.coords.longitude)
    document.getElementById("currentTemp").innerHTML = `${temp}&deg;F`
})

function calcAdjustedTotal(temp, numDrinks) {
    return Math.floor((1 - (70 - temp) / 100) * numDrinks)
}

function getPosition() {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, {}))
}

function getTemp(latitude, longitude) {
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`, false)
    xmlHttp.send()
    return Math.round(JSON.parse(xmlHttp.response).current.temperature_2m)
}