const path = require('path')
const express = require('express')
const request = require('request')

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Define paths for express config 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebar engin and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // set view dir other than  'views' 
hbs.registerPartials(partialsPath)
//setup static dir to serve 
app.use(express.static(path.join(__dirname , '../public')))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Eihab'
    })
})

app.get('/products',(req,res)=>{

    if(! req.query.search){
       return res.send({
            error: 'you must provide a search engine'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Eihab'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Eihab',
        msg: 'This is the help message from the app router'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error: 'No Location Entered !'
        })
    }
    console.log(req.query.location)
    geocode(req.query.location, (error,{latitude,longitude,location} = {})=>{
        console.log(latitude+ " AND AND " + longitude)
        if(error){
            return res.send({error})
        }else{
            
            forecast (latitude,longitude,(error,forecast)=>{
                if (error){
                    return res.send({error})
                }else{
                    return res.send ({
                        Forecast: forecast,
                        Location: location,
                        Address: req.query.location
                    })
                }
            })
        }
    })
    /*
    const loc= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+req.query.location+".json?access_token=pk.eyJ1IjoiaWhhYnRhd2ZpZyIsImEiOiJjazdua2R3dmcwM2NwM2VydWFxdGxsd2FsIn0.k_bEGNoEy_hsePVx9bKyeg&limit=1"
    var lox = request({url: loc, json: true},(err,res)=>{
        const x=res.body.features[0]['center'][1]
        const y = res.body.features[0]['center'][0]
        var coor = x+","+y
        //console.log(coor)

        const url = "https://api.darksky.net/forecast/3f3e1b4678f35082fde518e8708b40c1/"+coor+"?units=si"
        
       
        
    })

    return request({url: url, json: true }, (error,res)=>{
           
            
        //console.log("In " +chalk.inverse.green(res.body.timezone) +" current temp is : "+ chalk.inverse.red(res.body.currently.temperature) + ", "+ res.body.hourly.summary);
        })
    console.log(lox)
    res.send({
        Location: req.query.location,
        Forecast: lox,
        address: lox.timezone
    }) */
   
})
///////////////End Weather //////////////
app.get('/help/*',(req,res)=>{
    res.render('404',{
        msg: 'There is no such Help Article',
        name: 'Eihab'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        msg: 'There is no such file',
        name: 'Eihab'
    })
})


app.listen(port, () => {
    console.log("Server Up")
})