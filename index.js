const choices = ["rock", "paper", "scissors"];
let playerWins = 0;
let compWins = 0;
let displayText = "";
let playerName = "";

function render() {
    $("#playerWins").text("Player Wins: " + playerWins);
    $("#compWins").text("Computer Wins: " + compWins);
    $("#display").text(displayText);
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/leaderboard",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },

    }

    $.ajax(settings).done((res) => {
        console.log(res)
        let leaderboardScores = res;
        let leaderboard = $("#leaderboard");

        leaderboard.empty();
        leaderboard.append($('<li class="collection-header"><h4>Leaderboard</h4></li>'));

        leaderboardScores.forEach(score => {
            leaderboard.append($('<li class="collection-header">' + score.playerName + ': ' + score.score + '</li>'));
        })
    })
}


$(document).ready(function() {
    render();
    $(".choice").click(function() {
        let playerChoice = $(this).attr("id");
        let compChoice = choices[Math.floor(Math.random() * choices.length)];
        let matchStatus;

        if (
            (playerChoice === "rock" && compChoice === "scissors") ||
            (playerChoice === "paper" && compChoice === "rock") ||
            (playerChoice === "scissors" && compChoice === "paper")
        ) {
            matchStatus = "Player wins";
            playerWins++;
        } else if (playerChoice === compChoice) {
            matchStatus = "Tie";
        } else {
            matchStatus = "Computer wins";
            compWins++;
        }

        displayText = "Player chose: " + playerChoice + ", Computer chose: " + compChoice + ". " + matchStatus;
        render();

        $("#submit").click(function() {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:3000/leaderboard/addScore",
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                },
                "data": JSON.stringify({
                    playerName: $("#playerName").val(),
                    score: playerWins
                })
            }

            $.ajax(settings).done(function(res) {
                console.log(res);
                renderTodos();
            });
        });
    });
})