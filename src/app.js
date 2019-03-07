const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define paths for extress config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Set up handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
		res.render("index", {
			title: "Weather app",
			name:"Ignacio Alegre"
		})
})

app.get("/about", (req, res) => {
		res.render("about", {
			title: "About Me",
			name:"Ignacio Alegre"
		})
})

app.get("/help", (req, res) => {
		res.render("Help", {
			title: "Help page",
			name: "Ignacio Alegre",
			message:"This is a help message!"
		})
})

app.get("/weather", (req, res) => {
	if(!req.query.adress){
		return res.send({
			error:"You must provide an adress term"
		})
	}
	
	geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
		if(error){
			return res.send({ error })
		}
		
		forecast(latitude, longitude, (error, forecastData) => {
			if(error){
				return res.send({ error })
			}
			res.send({
				forecast: forecastData, 
				location: location, 
				adress: req.query.adress
			})
		})
	})
	
	
})

app.get("/products", (req, res) => {
		if(!req.query.search){
			return res.send({
				error:"You must provide a search term"
			})
		}
		console.log(req.query.search)
		res.send({
		products: []
	})
})

app.get("/help/*", (req, res) => {
		res.render("404", {
			title: "404",
			name: "Ignacio Alegre", 
			errorMessage:"Help article not found"
		})
})

app.get("*", (req, res) => {
		res.render("404", {
			title: "404",
			name: "Ignacio Alegre", 
			errorMessage:"Page not found"
		})
})

app.listen(3000, () => {
	console.log("server is running succesfully on port 3000")
})