const request = require('request')

const forecast = (x, y, callback)=>{
    const forecastURL = 'http://api.weatherstack.com/current?access_key=9e9f47b331b1b9b0dc423bb8921b2a07&query='+y+','+x+'&units=m'
    request({url:forecastURL,json:true},(error,response)=>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        } else if (response.body.error){
            callback('Unable to find location!',undefined)
        } else { 
            const temperature = response.body.current.temperature
            const feelslike = response.body.current.feelslike
            const descrption = response.body.current.weather_descriptions[0]
            callback(undefined,{
                temperature,feelslike,descrption
            })
        }
    })
}

module.exports = forecast