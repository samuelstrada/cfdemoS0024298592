const express = require("express");
// const app = express();
const passport = require("passport");
const xsenv= require("@sap/xsenv");

const httpClient = require('@sap-cloud-sdk/http-client');
const { retrieveJwt } = require('@sap-cloud-sdk/connectivity');

const JWTStrategy = require("@sap/xssec").JWTStrategy;
const services = xsenv.getServices({uaa:"cfdemo85592-xsuaa"}, { dest: { label: 'destination' } });

const app = express();
app.use(express.json());

passport.use(new JWTStrategy(services.uaa));
app.use(passport.initialize());
app.use(passport.authenticate("JWT",{session: false }));


app.get("/", function (req, res, next){
    res.send("Welcome to Basic NodeJs: " + req.user.id);
});

app.get("/user", function (req, res, next){
    res.send("I am " + req.user.id);
});
// /srv/destination?destinationX=cfdemo85592
// /srv/destinations?destinationX=sfdemo&path=cust_CompanyShirts_S0024298592
app.get('/destination', async function (req, res){
    try{
        let res1 = await httpClient.executeHttpRequest(
            {
                destinationName: req.query.destinationX || '',
                jwt: retrieveJwt(req)
            },
            {
                method: 'GET',
                url: req.query.path || '/'
            }
            
        );
        res.status(200).json(res1.data);
    } catch (err){
        res.status(500).send(err.message);
    }
});
app.delete('/destinationdelete', async function (req, res){
    try{
        let res1 = await httpClient.executeHttpRequest(
            {
                destinationName: req.query.destinationX || '',
                jwt: retrieveJwt(req)
            },
            {
                method: 'DELETE',
                url: req.query.path || '/'
            }
            
        );
        res.status(200).send();
    } catch (err){
        res.status(500).send(err.message);
    }
});
app.put('/destinationupdate', async function (req, res){
    try{
        const updatedData = req.body; 
        let res1 = await httpClient.executeHttpRequest(
            {
                destinationName: req.query.destinationX || '',
                jwt: retrieveJwt(req)
            },
            {
                method: 'PUT',
                url: req.query.path || '/',
                data: updatedData
            }
            
        );
        res.status(200).json(res1.data);
    } catch (err){
        res.status(500).send(err.message);
    }
});
app.post('/destinationadd', async function (req, res){
    try{
        const updatedData = req.body; 
        let res1 = await httpClient.executeHttpRequest(
            {
                destinationName: req.query.destinationX || '',
                jwt: retrieveJwt(req)
            },
            {
                method: 'POST',
                url: req.query.path || '/',
                data: updatedData
            }
            
        );
        res.status(200).json(res1.data);
    } catch (err){
        res.status(500).send(err.message);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log("Basic NoodeJs listening on port" + port);
});