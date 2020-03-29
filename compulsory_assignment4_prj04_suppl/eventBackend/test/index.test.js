//Importing the application to test
let server = require('../index');
let mongoose = require("mongoose");
let Event = require('../models/event');
let Booking = require('../models/booking');
const apiPath = '/api/';
const version = 'v1';
// var mongoURI = 'mongodb://localhost:27017/eventbackend';
var port = process.env.PORT || 3000;

//These are the actual modules we use
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Endpoint tests', () => {
    //###########################
    //These variables contain the ids of the existing event/booking
    //That way, you can use them in your tests (e.g., to get all bookings for an event)
    //###########################
    let eventId = '';
    let bookingId = '';

    //###########################
    //The beforeEach function makes sure that before each test, 
    //there is exactly one event and one booking (for the existing event).
    //The ids of both are stored in eventId and bookingId
    //###########################
    beforeEach((done) => {
        let event = new Event({ name: "Test Event", capacity: 10, startDate: 1590840000000, endDate: 1590854400000});

        Event.deleteMany({}, (err) => {
            Booking.deleteMany({}, (err) => {
                event.save((err, ev) => {
                    let booking = new Booking({ eventId: ev._id, firstName: "Jane", lastName: "Doe", email: "jane@doe.com", spots: 2 });
                    booking.save((err, book) => {
                        eventId = ev._id;
                        bookingId = book._id;
                        done();
                    });
                });
            });
        });
    });

    //###########################
    //Write your tests below here
    //###########################

    it("should always pass", function() {
        console.log("Our event has id " + eventId);
        console.log("Our booking has id " + bookingId);
        chai.expect(1).to.equal(1);
    });

        
    it("GET /events", function (done) {
        //console.log('http://localhost:'+ port + apiPath + version)
        chai.request('http://localhost:'+ port + apiPath + version).get('/events').end( (err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res).to.have.header('Content-type', 'application/json; charset=utf-8');
            chai.expect(res).to.be.json
            chai.expect(res.body).to.be.a('Array')
            chai.expect(Object.keys(res.body).length).to.be.eql(1);
            done();
        });
    });
});