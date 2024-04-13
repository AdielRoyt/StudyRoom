const express = require("express");
const app = express();

// configure the server to serve static resources
app.use(express.static("public"))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const HTTP_PORT = process.env.PORT || 8080;

app.set("view engine", "ejs")

let STUDYROOMDB = 
[
    {
        room: "A101",
        bookings:["zpatel","",""]
    },
    {
        room: "B202",
        bookings:["","","jmarty"]
    },
    {
        room:"C303",
        bookings:["", "", "zpatel"]
    }
]
app.get("/", (req, res) => {
    res.render("homepage", {studyRooms:STUDYROOMDB})
});

app.get("/bookform/:room/:timeslot", (req, res) => {
    res.render("bookform", {room: req.params.room, timeslot: req.params.timeslot});
})

app.post("/book", (req, res) => {
    const studyRoom = req.body.room;
    const userID = req.body.userid;
    let timeslot;
    switch(req.body.timeslot)
    {
        case "morning":
            timeslot = 0;
            break;
        case "afternoon":
            timeslot = 1;
            break;
        case "evening":
            timeslot = 2;
            break;
    }

    //find the room requested
    for(let i = 0; i < STUDYROOMDB.length; i++)
    {
        if(STUDYROOMDB[i].room === studyRoom)
        {
            //Book the room
            STUDYROOMDB[i].bookings[timeslot] = userID
            break;
        }
    }

    res.redirect("/");
})

app.post("/cancel", (req, res) => {
    for(let i = 0; i < STUDYROOMDB.length; i++)
    {
        for(let j = 0; j < STUDYROOMDB[i].bookings.length; j++)
        {
            STUDYROOMDB[i].bookings[j] = ""; 
        }
    }
    res.redirect("/");
})
const onHttpStart = () => {
console.log("The web server has started...");
console.log(`Server is listening on port ${HTTP_PORT}`);
console.log("Press CTRL+C to stop the server.");
};


app.listen(HTTP_PORT, onHttpStart);