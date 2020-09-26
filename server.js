const express = require('express')
const app = express()
const config = require('./config')
const bodyParser = require('body-parser')

const client = require('twilio')(config.accountSid, config.authToken);


app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + "/register.html")
})

app.post('/register', (req ,res)=> {

    
        var mobile = req.body.mobilenumber;
        
    client.verify.services(config.serviceID)
             .verifications
             .create({
                 to: '+92'+ mobile , 
                 channel: 'sms'
                })
             .then(verification => console.log(verification.status));


    console.log(mobile)
    res.sendFile(__dirname + "/verify.html")
})
app.post('/verify', (req ,res)=> {

    const verifycode = req.body.verifycode
    
    client.verify.services(config.serviceID)
      .verificationChecks
      .create({to: '+66' + req.query.mobilenumber, code: verifycode})
      .then(verification_check => console.log(verification_check.status));

    console.log(req.body.verifycode)
    res.sendFile(__dirname + "/main.html")
})

app.listen(8080 , (req,res)=>{
    console.log(" This server run on port 8080")
});
