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
            //Status code is 200
            chai.expect(res).to.have.status(200);
            //console.log(JSON.stringify(res.header))
            var header = JSON.parse(JSON.stringify(res.header))
            var contentType = header["content-type"]
            chai.expect(contentType).to.include('application/json')
            
            //The response body is in json format -> teacher's misspelled it, should be that the format is json, not  particularly the body
            chai.expect(res).to.be.json
            
            // The return type is an array
            chai.expect(res.body).to.be.a('array')
            
            // The array contains the right amount of elements
            chai.expect(Object.keys(res.body).length).to.be.eql(1);
            done();
        });
    });

    it("GET /events/:eventId", function (done) {
        //console.log('http://localhost:'+ port + apiPath + version)
        chai.request('http://localhost:'+ port + apiPath + version).get('/events/' + eventId).end( (err, res) => {
            // The status code shall be as expected (e.g., 200 for endpoint 1)
            chai.expect(res).to.have.status(200);

            var header = JSON.parse(JSON.stringify(res.header))
            var contentType = header["content-type"]
            chai.expect(contentType).to.include('application/json')
            //chai.expect(res).to.have.header('Content-type', 'application/json; charset=utf-8');

            // The response body is in json format
            chai.expect(res).to.be.json

            //No additional attributes are in the body
            chai.expect(Object.keys(res.body).length).to.be.eql(8);
        
            //No additional attributes are in the body
            chai.expect(Object.keys(res.body)[0]).to.be.eql('description');
            chai.expect(Object.keys(res.body)[1]).to.be.eql('location');
            chai.expect(Object.keys(res.body)[2]).to.be.eql('_id');
            chai.expect(Object.keys(res.body)[3]).to.be.eql('name');
            chai.expect(Object.keys(res.body)[4]).to.be.eql('capacity');
            chai.expect(Object.keys(res.body)[5]).to.be.eql('startDate');
            chai.expect(Object.keys(res.body)[6]).to.be.eql('endDate');
            chai.expect(Object.keys(res.body)[7]).to.be.eql('bookings');

            //Here asserting that there is no extra element/property
            chai.expect(Object.keys(res.body)[8]).to.be.eql(undefined);

            //The attributes have the expected values (you may exclude checking the dates for events)
            chai.expect(res.body).to.have.property('description').eql('');
            chai.expect(res.body).to.have.property('location').eql('');
            chai.expect(res.body).to.have.property('_id').eql(eventId.toString());
            chai.expect(res.body).to.have.property('name').eql("Test Event");
            chai.expect(res.body).to.have.property('capacity').eql(10);
            chai.expect(res.body).to.have.property('bookings').eql([bookingId.toString()]);
            console.log(Object.keys(res.body)[1])
            done();
        });
    });

    it("GET /events/:eventId/bookings", function (done) {
        //console.log('http://localhost:'+ port + apiPath + version)
        chai.request('http://localhost:'+ port + apiPath + version).get('/events/' + eventId + '/bookings').end( (err, res) => {
            //Status code is 200
            chai.expect(res).to.have.status(200);

            var header = JSON.parse(JSON.stringify(res.header))
            var contentType = header["content-type"]
            chai.expect(contentType).to.include('application/json')
            //chai.expect(res).to.have.header('Content-type', 'application/json; charset=utf-8');
            
            //The response body is in json format -> teacher's misspelled it, should be that the format is json, not  particularly the body
            chai.expect(res).to.be.json
            
            // The return type is an array
            chai.expect(res.body).to.be.a('array')
            
            // The array contains the right amount of elements
            chai.expect(Object.keys(res.body).length).to.be.eql(1);
            done();
        });
    });

    it("GET /events/:eventId/bookings/bookingId", function (done) {
        //console.log('http://localhost:'+ port + apiPath + version)
        chai.request('http://localhost:'+ port + apiPath + version).get('/events/' + eventId + '/bookings/' + bookingId).end( (err, res) => {
            // The status code shall be as expected (e.g., 200 for endpoint 1)
            chai.expect(res).to.have.status(200);
            var header = JSON.parse(JSON.stringify(res.header))
            var contentType = header["content-type"]
            chai.expect(contentType).to.include('application/json')
            //chai.expect(res).to.have.header('Content-type', 'application/json; charset=utf-8');

            // The response body is in json format
            chai.expect(res).to.be.json

            //No additional attributes are in the body
            chai.expect(Object.keys(res.body).length).to.be.eql(6);
        
            //No additional attributes are in the body
            chai.expect(Object.keys(res.body)[0]).to.be.eql('tel');
            chai.expect(Object.keys(res.body)[1]).to.be.eql('email');
            chai.expect(Object.keys(res.body)[2]).to.be.eql('_id');
            chai.expect(Object.keys(res.body)[3]).to.be.eql('firstName');
            chai.expect(Object.keys(res.body)[4]).to.be.eql('lastName');
            chai.expect(Object.keys(res.body)[5]).to.be.eql('spots');
            
            //Here asserting that there is no extra element/property
            chai.expect(Object.keys(res.body)[6]).to.be.eql(undefined);

            //The attributes have the expected values (you may exclude checking the dates for events)
            chai.expect(res.body).to.have.property('tel').eql('');
            chai.expect(res.body).to.have.property('email').eql("jane@doe.com");
            chai.expect(res.body).to.have.property('_id').eql(bookingId.toString());
            chai.expect(res.body).to.have.property('firstName').eql("Jane");
            chai.expect(res.body).to.have.property('lastName').eql("Doe");
            chai.expect(res.body).to.have.property('spots').eql(2);
            console.log(Object.keys(res.body)[1])
            done();
        });
    });

    it("POST/events", function (done) {
        chai.request('http://localhost:' + port + apiPath + version)
            .post('/events/')
            .set('Content-type', 'application/json')
            .send({
                "name": "Test event",
                "capacity": 10,
                "startDate": "2020-05-30T12:00:00.000Z",
                "endDate": "2020-05-30T16:00:00.000Z",
            })
            .end((err, res) => {

                // The status code shall be as expected (e.g., 201 for endpoint 1)
                chai.expect(res).to.have.status(201);
                chai.expect(res).to.have.header('Content-type', 'application/json; charset=utf-8');

                // The response is in json format
                chai.expect(res).to.be.json;

                chai.expect(res.body).to.be.a('object')

                //No additional attributes are in the body
                chai.expect(Object.keys(res.body).length).to.be.eql(7);

                //The right attributes are in the body
                chai.expect(Object.keys(res.body)[0]).to.be.eql('name');
                chai.expect(Object.keys(res.body)[1]).to.be.eql('description');
                chai.expect(Object.keys(res.body)[2]).to.be.eql('location');
                chai.expect(Object.keys(res.body)[3]).to.be.eql('capacity');
                chai.expect(Object.keys(res.body)[4]).to.be.eql('startDate');
                chai.expect(Object.keys(res.body)[5]).to.be.eql('endDate');
                chai.expect(Object.keys(res.body)[6]).to.be.eql('_id');

                //Here asserting that there is no extra element/property
                chai.expect(Object.keys(res.body)[7]).to.be.eql(undefined);

                // The attributes have the expected values (you may exclude checking the dates for events)
                chai.expect(res.body).to.have.property('name').eql('Test event');
                chai.expect(res.body).to.have.property('description').eql("");
                chai.expect(res.body).to.have.property('location').eql("");
                chai.expect(res.body).to.have.property('capacity').eql(10);


                done()

            });
    });

    it("POST/events/:eventId/bookings", function (done) {
        chai.request('http://localhost:' + port + apiPath + version)
            .post('/events/' + eventId + '/bookings')
            .set('Content-type', 'application/json')
            .send({
                "firstName": "Jane",
                "lastName": "Doe",
                "tel": "",
                "email": "jane@doe.com",
                "spots": 2,
                "eventId": eventId
            })
            .end((err, res) => {


                // The status code shall be as expected (e.g., 201 for endpoint 1)
                chai.expect(res).to.have.status(201);

                chai.expect(res).to.have.header('Content-type', 'application/json; charset=utf-8');

                // The response  is in json format
                chai.expect(res).to.be.json;

                chai.expect(res.body).to.be.a('object');

                //No additional attributes are in the body
                chai.expect(Object.keys(res.body).length).to.be.eql(6);

                //The right attributes are in the body
                chai.expect(Object.keys(res.body)[0]).to.be.eql('firstName');
                chai.expect(Object.keys(res.body)[1]).to.be.eql('lastName');
                chai.expect(Object.keys(res.body)[2]).to.be.eql('tel');
                chai.expect(Object.keys(res.body)[3]).to.be.eql('email');
                chai.expect(Object.keys(res.body)[4]).to.be.eql('spots');
                chai.expect(Object.keys(res.body)[5]).to.be.eql('_id');

                //Here asserting that there is no extra element/property
                chai.expect(Object.keys(res.body)[6]).to.be.eql(undefined);


                //The attributes have the expected values
                chai.expect(res.body).to.have.property('firstName').eql('Jane');
                chai.expect(res.body).to.have.property('lastName').eql('Doe');
                chai.expect(res.body).to.have.property('tel').eql('');
                chai.expect(res.body).to.have.property('email').eql('jane@doe.com');
                chai.expect(res.body).to.have.property('spots').eql(2);
                chai.expect(res.body).to.have.property('_id');
                done()
            });

    })
});