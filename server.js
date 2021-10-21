// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Datos de reservacion (DATA)
// =============================================================
var tables = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

// Displays the waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
    if (tables.length < 5){
        var newtable = req.body;

        // Using a RegEx Pattern to remove spaces from newtable
        newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();
    
        console.log(newtable);
        tables.push(newtable);

        res.json(true);
    }
    else{
        var newOnWaitlist = req.body;

        // Using a RegEx Pattern to remove spaces from newOnWaitlist
        newOnWaitlist.routeName = newOnWaitlist.name.replace(/\s+/g, "").toLowerCase();
    
        console.log(newOnWaitlist);
        waitlist.push(newOnWaitlist);
    
        res.json(false);
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});