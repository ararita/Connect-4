(function() {
    var currentPlayer = "player1";
    var diags = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ];

    $(".column").on("click", function(e) {
        // new Audio("pinDrop.mp3").play();
        // document.getElementById("sound").play();
        $("#sound")
            .get(0)
            .play();
        console.log($("#sound")[0]);
        // console.log("clicked");
        // console.log("e.target is: ", $(e.currentTarget));
        var slotsInCol = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            // console.log("slotsInCol.eq(i) is: ", slotsInCol.eq(i));
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                !slotsInCol.eq(i).addClass(currentPlayer);
                break;
            } //closes if block
        } //closes for loop
        verticalVictoryCheck(slotsInCol);
        horizontalVictoryCheck($(".row" + i));
        diagonalVictoryCheck();

        switchPlayer();

        function horizontalVictoryCheck(rows) {
            var counter = 0;
            for (var i = 0; i < rows.length; i++) {
                if (rows.eq(i).hasClass(currentPlayer)) {
                    counter++;
                    if (counter === 4) {
                        victory();

                        rows.eq(i).addClass("win");
                        rows.eq(i - 1).addClass("win");
                        rows.eq(i - 2).addClass("win");
                        rows.eq(i - 3).addClass("win");
                        victory();
                    }
                } else {
                    counter = 0;
                }
            }
        }
    }); //closes click event

    function verticalVictoryCheck(slots) {
        var counter = 0;

        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                counter++;
                if (counter === 4) {
                    victory();
                    slots.eq(i).addClass("win");
                    slots.eq(i - 1).addClass("win");
                    slots.eq(i - 2).addClass("win");
                    slots.eq(i - 3).addClass("win");
                    victory();
                }
            } else {
                counter = 0;
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function diagonalVictoryCheck() {
        var slots = $(".slot");

        for (var i = 0; i < diags.length; i++) {
            var counter = 0;

            for (var j = 0; j < diags[i].length; j++) {
                if (slots.eq(diags[i][j]).hasClass(currentPlayer)) {
                    counter++;
                }
                if (counter === 4) {
                    diags[i].forEach(function(index) {
                        slots.eq(index).addClass("win");
                        victory();
                    });

                    return;
                }
            }
        }
    }
    $("#button").click(function() {
        window.location.reload();
    });

    function victory() {
        var victory = $("#victory");
        setTimeout(function() {
            victory.addClass("win");
        }, 1000);
    }
})(); //closes iife
