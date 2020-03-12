var express = require('express');
const assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use("/api/v1", "/");


//Sample data for Assignment 3

//maybe add HREF to link to a certaihn event
//The following is an example of an array of two events. 
// var events = [
//     { id: 0, name: "The Whistlers", description: "Romania, 2019, 97 minutes", location: "Bio Paradís, Salur 1", capacity: 40, startDate: new Date(Date.UTC(2020, 02, 03, 22, 0)), endDate: new Date(Date.UTC(2020, 02, 03, 23, 45)), bookings: [0,1,2] },
//     { id: 1, name: "HarpFusion: Bach to the Future", description: "Harp ensemble", location: "Harpa, Hörpuhorn", capacity: 100, startDate: new Date(Date.UTC(2020, 02, 12, 15, 0)), endDate: new Date(Date.UTC(2020, 02, 12, 16, 0)), bookings: [] }
// ];

//The following is an example of an array of three bookings.
// var bookings = [
//     { id: 0, firstName: "John", lastName: "Doe", tel: "+3541234567", email: "", spots: 3},
//     { id: 1, firstName: "Jane", lastName: "Doe", tel: "", email: "jane@doe.doe", spots: 1},
//     { id: 2, firstName: "Meðaljón", lastName: "Jónsson", tel: "+3541111111", email: "mj@test.is", spots: 5}
// ];

app.get('/api/v1', (req, res) =>{
    res.status(200).send("hello there!")
});

app.get('/allEvents', (req, res) =>{
    res.status(200).send(events)
})


app.listen(port , () => {
    console.log("listening on port " + port )
})

//1. Read all events

//2. Read an individual event

//3. Create a new event

//4. Update an event

//5. Delete an event

//6. Delete all events



//1. Read all bookings for an event


//2. Read an individual booking

//3. Create a new booking

//4. Delete a booking

//5. Delete all bookings for an event