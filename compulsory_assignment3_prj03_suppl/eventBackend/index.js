var express = require('express');
const assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var PORT = process.env.PORT || 3000
app.use(bodyParser.json());
const prefix = "/api/v1/"

//Sample data for Assignment 3

//maybe add HREF to link to a certaihn event
//The following is an example of an array of two events. 
var events = [
    { id: 0, name: "The Whistlers", description: "Romania, 2019, 97 minutes", location: "Bio Paradís, Salur 1", capacity: 40, startDate: new Date(Date.UTC(2020, 02, 03, 22, 0)), endDate: new Date(Date.UTC(2020, 02, 03, 23, 45)), bookings: [0,1,2] },
    { id: 1, name: "HarpFusion: Bach to the Future", description: "Harp ensemble", location: "Harpa, Hörpuhorn", capacity: 100, startDate: new Date(Date.UTC(2020, 02, 12, 15, 0)), endDate: new Date(Date.UTC(2020, 02, 12, 16, 0)), bookings: [] }
];

//bookings resource
var bookings = [
    { id: 0, firstName: "John", lastName: "Doe", tel: "+3541234567", email: "", spots: 3},
    { id: 1, firstName: "Jane", lastName: "Doe", tel: "", email: "jane@doe.doe", spots: 1},
    { id: 2, firstName: "Meðaljón", lastName: "Jónsson", tel: "+3541111111", email: "mj@test.is", spots: 5}
];

//bookings/event relation table
var bookings_events_relations = [{0: 0}, {0: 1},{0: 2}];

//function to validate data coming to the application
//function __ (){}

app.get(prefix, (req, res) =>{
    res.status(200).send("THis works")
});

//1. Read all events
app.get(prefix + 'events', (req, res) =>{
    res.status(200).send(events)
})

//2. Read an individual event
app.get(prefix + 'events/:eventId', (req, res) => {
    for (let i= 0; i < events.length; i++){
        if(events[i].id == req.params.eventId){
            res.status(200).json(events.splice(i,1));
            return;
        }
    }
    res.status(404).json({"message": "id not found"})
    // var theEvent = events[eventId]
    // res.status(200).send(events)
})


app.listen(PORT , () => {
    console.log("listening on port " + PORT )
})


//3. Create a new event
app.post(prefix + 'events/newevent', (req,res) => {
    let event = {id: nextid, name: '', description: '', location: '', capacity: '', startDate: '', endDate:'', bookings:''};
    nextid +=1;
    events.push(event);
    res.status(201).json(event)
    
})


//4. Update an event

//5. Delete an event
app.delete(prefix + 'events/:eventId', (req, res) => {
    for (let i= 0; i < events.length; i++){
        if(events[i].id == req.params.eventId){
            res.status(200).json(events.splice(i,1));
            return;
        }
    }
    res.status(404).json({"message": "id not found"})
    // var theEvent = events[eventId]
    // res.status(200).send(events)
})


//6. Delete all events



//1. Read all bookings for an event
//might have to change this soon
app.get(prefix + 'events/:eventId/books', (req, res) => {
    //(res.status(200).json({"message": "u did it"})
    for (let i= 0; i < events.length; i++){
        if(events[i].id == req.params.eventId){
            var retArray = [];
            var currentBookings = events[i].bookings;

            for (let y = 0; y< bookings.length; y++){
                if(currentBookings.includes(bookings[y].id)){
                    retArray.push(bookings[y]) 
                }
            };

            if(retArray.length > 0) {
                res.status(200).json(retArray);
                return;
            }
        };
    }
    res.status(404).json({"message": "event has no bookings"})
})


//2. Read an individual booking
app.get(prefix + 'events/:eventId/books/:bookId', (req, res) => {
    //(res.status(200).json({"message": "u did it"})
    for (let i= 0; i < events.length; i++){
        if(events[i].id == req.params.eventId){
            var currentBookings = events[i].bookings;
            var bookingId;
            if (currentBookings.includes(parseInt(req.params.bookId))){
                bookingId = req.params.bookId;
            
                for (let y = 0; y< bookings.length; y++){
                    if(bookings[y].id == (req.params.bookId)){
                        retValue = bookings[y]
                    }
                    }
                if(retValue != null) {
                    res.status(200).json(retValue);
                    return;
                }
            }
        };
        };
        res.status(404).json({"message": "event " + req.params.eventId +" has no bookings with id " + req.params.bookId})
    })

//3. Create a new booking

//4. Delete a booking

//5. Delete all bookings for an event