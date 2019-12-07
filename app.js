var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.json());

var leaderboard = [];

app.get('/', function(req, res) {
    res.sendFile('CS81SemesterProject.html', { root: __dirname });
});


app.get('/leaderboard', function(req, res) {
    res.send(leaderboard)
    res.status(200)
});

app.post('/leaderboard/addScore', function(req, res) {
    res.set('Content-Type', 'application/json')
    let duplicate = false;

    leaderboard.forEach(score => {
        if (score.playerName === req.body.playerName) {
            duplicate = true;
        }
    })

    if (!duplicate) {
        leaderboard = [
            ...leaderboard,
            { playerName: req.body.playerName, score: req.body.score }
        ]
        console.log("All tasks")
    }
})



app.listen(3000, function() {
    console.log("listening on port 3000");
});