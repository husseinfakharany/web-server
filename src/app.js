const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static direcory to serve
app.use(express.static(publicDirectoryPath))

const name = "Hussein Fakharany"

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help page',
        name
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(errorGEO,dataGEO)=>{
        if (errorGEO){
            return res.send({
                error: errorGEO
            })
        }
        forecast(dataGEO.longitude,dataGEO.latitude,(errorFORECAST,dataFORECAST)=>{
            if (errorFORECAST){
                return res.send({
                    error: errorFORECAST
                })
            }
            res.send([
                {
                "latitude": dataGEO.latitude,
                "longitude": dataGEO.longitude,
                "location": dataGEO.location
                },{
                "temperature": dataFORECAST.temperature,
                "forecast": dataFORECAST.description,
                "feelslike": dataFORECAST.feelslike
                }
            ])
        })  
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg: 'Help article not found.',
        title: '404',
        name
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg: 'Page not found.',
        title: '404',
        name
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000.")
})
