
$(function () {
    var squares = [],
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",
        wins = [7, 56, 448, 73, 146, 292, 273, 84];

    var startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) { square.html(EMPTY); });
        updateTurnMessage();
    };

    var win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    };

    var showWinScreen = function (player) {
        var message = player + " won!";
        var winScreen = $("<div class='win-screen'></div>");
        var winMessage = $("<div class='win-message'></div>");
        winMessage.html("<h2>" + message + "</h2>");
        winScreen.append(winMessage);
        $("body").append(winScreen);
        winScreen.addClass("active");

        setTimeout(function () {
            winScreen.removeClass("active");
            startNewGame();
            winScreen.remove();
        }, 3000);
    };

    var set = function () {
        if ($(this).html() !== EMPTY) return;
        $(this).html(turn);
        moves += 1;
        score[turn] += $(this)[0].indicator;
        if (win(score[turn])) {
            showWinScreen(turn);
        } else if (moves === SIZE * SIZE) {
            showWinScreen("Nobody");
        } else {
            turn = turn === "X" ? "O" : "X";
            updateTurnMessage();
        }
    };

    var updateTurnMessage = function () {
        $("#currentTurn strong").text(turn);
    };

    var play = function () {
        var board = $("<table border=1 cellspacing=0 class='table table-bordered'></table>"), indicator = 1;
        for (var i = 0; i < SIZE; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < SIZE; j += 1) {
                var cell = $("<td></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }
        $("#tictactoe").empty().append(board);
        startNewGame();
    };

    play();
});