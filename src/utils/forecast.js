const request = require("request")

const forecast = (latitude, longitude, callback) => {
	
	
	const url = "https://api.darksky.net/forecast/b79c0bffba09b6cc1b233ef0d7cc0287/"+latitude + "," + longitude+"?units=si"
	
	request({url, json:true}, (error, {body}) => {
	
	if(error){
		callback("Unable to use weather service", undefined)
	}
	else if(body.error){
		callback("Unable to find location", undefined)
	}
	else{
		callback( undefined, body.daily.data[0].summary +" It is currently "+body.currently. temperature+ " degrees out. There is a "+body.currently.precipProbability*100+" % chance of rain. Max temperature is expected to be "+ body.daily.data[0].temperatureHigh + " degrees and min is expected to be "+ body.daily.data[0].temperatureLow +" degrees." )
	}
})
}


module.exports = forecast