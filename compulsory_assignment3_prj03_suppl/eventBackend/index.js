var express = require('express');
const assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var PORT = process.env.PORT || 3000
const prefix = "/api/v1/"

var eventCounter = 2;
var bookingCounter = 3;
app.use(bodyParser.json());
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
    //{bookId: eventId}
//var bookingRelationToEvent = [{0: 0}, {1: 0}, {2: 0}] 


app.get(prefix, (req, res) =>{
    res.status(200).send("THis works")
});

//1. Read all events
app.get(prefix + 'events', (req, res) =>{
    var retArray = [];

    for (let i = 0; i < events.length;i++){
        var singleEvent = events[i];
        retJson = {"name": singleEvent.name, "id": singleEvent.id, "capacity": singleEvent.capacity, "startDate": singleEvent.startDate, "endDate": singleEvent.endDate}
        retArray.push(retJson);
    }
    res.status(200).send(retArray)
})

//2. Read an individual event
app.get(prefix + 'events/:eventId', (req, res) => {
    event = getEvent(req.params.eventId);
 
    if(typeof event != "string"){
        res.status(200).send(event);
        return;
    }
    res.status(404).json({"message": event})
    return;
})

//3. Create a new event
app.post(prefix + 'events/', (req, res) => {
    var validation = validateEventRequest(req);
    if (validation == ""){
        newEvent = _createEvent(req, eventCounter);
        events.push(newEvent);
        eventCounter += 1;
        res.status(201).send(newEvent);
        return;
    }
    res.status(400).send(validation);
    return;
})

function _createEvent(req, id){
    var description = req.body.description;
        var location = req.body.location;
        if (description == undefined) {
            description = "";
        }

        if(location == undefined){
            location = "";
        }
        startDate = toDateTime(req.body.startDate);
        endDate = toDateTime(req.body.endDate);
        let newEvent = {"id": id, "name": req.body.name, "description": description, "location": location, "capacity": req.body.capacity, "startDate": startDate, "endDate": endDate, "bookings": []}
        return newEvent;
}

function validateEventRequest(req){
    let name = req.body.name;
    console.log(typeof name == "string");
    if(name == undefined || !(typeof name == "string") || name == "" || name == " "){
        return "error name not valid"
    }
    let capacity = req.body.capacity;
    if(capacity == undefined || !(typeof capacity == "number") || capacity < 0){
        return "error capacity not valid"
    }
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let today = Math.floor(Date.now() / 1000);
    //let today = 0;
    console.log(today > startDate);
    if(startDate == undefined || !(typeof startDate == "number") || startDate <= 0 || startDate >= endDate || startDate < today ){
        return "error invalid startDate"
    }
    if(endDate == undefined || !(typeof endDate == "number" || endDate <= 0 || endDate < today ) ){
        return "error invalid endDate"
    }
    return "";
};
    
function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

//4. Update an event
app.put(prefix + 'events/:eventId', (req, res) => {
    console.log(req.params.eventId)
    // get index of the requested event, or return error that says it doesnt exist
    var index = getEvent(req.params.eventId, index= true);
    if (typeof index != "string"){
        // //getting the object out of a list
        // event = event[0];
        let currentEvent = events[index];
        if(currentEvent.bookings.length == 0){
            var validation = validateEventRequest(req);
            if (validation == ""){
                var newEvent = _createEvent(req, req.params.eventId);
                //replace event
                events[index] = newEvent;
                res.status(200).send(newEvent);
                return
            }
            res.status(400).json({"message": validation})
            return;
        }
        res.status(400).json({"message": "event contains bookings"})
        return;
    }
    res.status(404).json({"message": index})
    return;
})

function getEvent(eventId, index = false ){
    if(eventId == undefined){
        return "error: no eventId in request"
    }

    for (let i= 0; i < events.length; i++){
        if(events[i].id == eventId){
            if(index == true){
                return i;
            }
            // return events.slice(i,1);
            return events[i];
        }
    }
    return "error: eventId not found"
}


//5. Delete an event
app.delete(prefix + 'events/:eventId', (req, res) => {
    var index = getEvent(req.params.eventId, index=true);
    if (typeof index != "string"){
        event = events[index];
        if(event.bookings.length == 0){
            events.splice(index, 1);
            res.status(200).send(event);
            return;
        }
        res.status(400).json({"message": "error: event contains bookings and cannot be deleted"})
        return;

    }
    res.status(404).json({"message": index})
    return;
})


//6. Delete all events
app.delete(prefix + 'events/', (req, res) => {
    var retEvents = [];
    var retBookings = [];
    for (let i = 0; i < events.length; i++){
        var event = events[i];
        //event = JSON.stringify(event);
        var currentBookings = events[i].bookings;
        for (let y = 0; y < currentBookings.length; y++){
            var booking = getBooking(currentBookings[y]);
            var key = currentBookings[y];
            key = key.toString();
            retBookings.push([key, booking]);
            //booking = JSON.stringify(booking);
        }
        events[i].bookings = retBookings;
        retBookings = [];
        retEvents.push(event)
        
    }

    
    events = [];
    bookings = [];
    res.status(200).send(retEvents);
    return
})


//1. Read all bookings for an event
//might have to change this soon
app.get(prefix + 'events/:eventId/bookings', (req, res) => {
    var event = getEvent(req.params.eventId);
    if (typeof event != "string"){
        retArray = [];
        for(let i=0; i < event.bookings.length; i++){
            currentBooking = getBooking(event.bookings[i]);
            retArray.push(currentBooking);
        }
        res.status(200).send(retArray);
        return;
    }
    res.status(404).json({"message": event})
    return;
})

function getBooking(bookingId, index=false){
    for (let i= 0 ; i < bookings.length; i++){
        currBooking = bookings[i];
        if (currBooking.id == bookingId){
            if(index == true){
                return i;
            }
            return currBooking;
        }
    }
    return "error: Id of the booking was not found"
}

//2. Read an individual booking
app.get(prefix + 'events/:eventId/bookings/:bookId', (req, res) => {
    event = getEvent(req.params.eventId);
    if (typeof event != "string"){
        booking = getBooking(req.params.bookId);

        if(typeof booking != "string"){
            res.status(200).send(booking);
            return;
        }
        res.status(404).json({"message": booking});
        return;
    }
    res.status(404).json({"message": event});
    return;
});

//3. Create a new booking
app.post(prefix + 'events/:eventId/bookings/', (req, res) => {
    var index = getEvent(req.params.eventId, index=true);
    if (typeof index != "string"){
        event = events[index];
        var bookedSpots = getBookedSpots(event.bookings);
        var validation = validateBookingReq(req, bookedSpots, event.capacity);
        if(validation == ""){
            newBooking = _createBooking(req, bookingCounter);
            bookings.push(newBooking);
            events[index].bookings.push(newBooking.id);
            newRelation = {bookingCounter: event.id}
            //bookingRelationToEvent.push(newRelation);
            bookingCounter +=1;
            res.status(201).send(newBooking);
            return;
        }
        res.status(400).json({"message": validation})
        return;
    }
    //res.status(201).send("got it")
    res.status(400).json({"message": index})
    return;
})

function _createBooking(req, id){
    var tel = req.body.tel;
    var email = req.body.email;

    if(tel == undefined){
        tel = "";
    }
    else{
        tel = tel.toString();
    }
    if(email == undefined){
        email = "";
    }

    newBooking = {"id": id, "firstName": req.body.firstName, "lastName": req.body.lastName, "tel": tel, "email": email, "spots": req.body.spots}
    return newBooking;
}

function getBookedSpots(bookingsList){
    var count = 0;

    for (let i =0; i < bookingsList.length; i++){
        booking = getBooking(i);
        if(typeof booking != "string"){
            count += booking.spots;
        }
    }
    return count;
}

function validateBookingReq(req, bookedSpots, capacity){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let spots = req.body.spots;
    let tel = req.body.tel;
    let email = req.body.email;
    if(email == undefined && tel== undefined){
        return "error: you need email or/and tel in body"
    }
    if(typeof firstName != "string" || firstName == "" || firstName== " "){
        return "error: invalid firstName"
    }
    if(typeof lastName != "string" || lastName == "" || lastName== " "){
        return "error: invalid lastName"
    }
    if(typeof spots != "number" || spots <=0){
        return "error: invalid spots"
    }
    if(spots + bookedSpots > capacity){
        return "error: to many spots, goes beyond the event's capacity"
    }
    if(tel != undefined){
        if (typeof tel == "number" && tel.toString().length < 5 ){
            return "error: invalid tel"
        }
        if(typeof tel == "string"){
            try {
                parseInt(tel)
            } catch (error) {
                return "error: tel not a phonenumber"
            }
        }
    }
    if(email != undefined){
        if(typeof email != "string" || !email.includes("@") || !email.includes(".")){
            return "error: invalid email"
        }
    }
    return "";

}
//4. Delete a booking
app.delete(prefix + 'events/:eventId/bookings/:bookingId', (req, res) => {
    var index = getEvent(req.params.eventId, index=true);
    if(typeof index != "string"){
        var bookingIndex = getBooking(req.params.bookingId, true);
        if(typeof bookingIndex != "string"){
            var booking = bookings[bookingIndex];
            bookings.splice(bookingIndex, 1);
            var currentBookings = events[index].bookings;
            for (let i = 0; i < currentBookings.length; i++){
                if(currentBookings[i] == bookingIndex){
                    events[index].bookings.splice(i,1);
                }
            }
            
            res.status(200).send(booking)
        }
        res.status(404).json({"message": bookingIndex});
        return;
    }
    res.status(404).json({"message": index});
    return
})


//5. Delete all bookings for an event
app.delete(prefix + 'events/:eventId/bookings/', (req, res) => {
    var index = getEvent(req.params.eventId, true);
    if (typeof index != "string"){
        var retArray = [];
        for (let i = 0; i < events[index].bookings.length;i++){
            bookingIndex = getBooking(events[index].bookings[i], true);
            retArray.push(bookings[bookingIndex]);
            bookings.splice(bookingIndex, 1);
        }
        events[index].bookings = [];
        res.status(200).send(retArray);
        return;
    }
    res.status(404).json({"message": index})
    return;
})


app.use('*', (req, res) => {
    res.status(405).send('Operation not supported.');
});

app.listen(PORT , () => {
    console.log("listening on port " + PORT )
})
