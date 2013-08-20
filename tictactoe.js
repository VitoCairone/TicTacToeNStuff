// Vito Cairone and Gabrielle Bellamy, Aug 20 2013

function game(humanPlayers) {

	var realBoard = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
 	var isVsComputer = true;
	var readline = require('readline');
	var reader = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});


	function show() {
		console.log("");
		var count = 0;
		for(var j = 0; j< 3; j++) {
			var str = count++ + ":" + realBoard[j][0] + " |";
			str += count++ + ":" + realBoard[j][1] + " |";
			str += count++ + ":" + realBoard[j][2] + " ";

			console.log(str);
			if(j < 2) {
				console.log("--------------");
			}
		}
	}

	function placeMark(i, j, mark) {
		realBoard[j][i] = mark;
	}

	function get(i,j) {
		return realBoard[j][i];
	}

	function isFree(i,j) {
		return get(i,j) === " ";
	}

	function parseInput(str) {
		var num = parseInt(str);
		return [num % 3, Math.floor(num/3)];
	}

	function otherMark(mark) {
		return mark === "X" ? "O" : "X";
	}

	function arrEq(arr1, arr2) {
		if(arr1.length != arr2.length) {
			return false;
		}
		for(var i = 0; i < arr1.length; i++) {
			if(arr1[i] !== arr2[i]) {
				return false;
			}
		}
		return true;
	}

	function checkForTies() {
		return openSpaces().length === 0;
	}

	function checkForWin(board, mark) {
		var markRow = [mark, mark, mark];
		var cols = transpose(board);
		for(var i = 0; i < 3; i++) {
			if(arrEq(board[i], markRow)|| arrEq(cols[i], markRow)) {
				return mark;
			}
		}
		var diag1 = [board[0][0], board[1][1], board[2][2]];
		var diag2 = [board[0][2], board[1][1], board[2][0]];
		if(arrEq(diag1, markRow) || arrEq(diag2, markRow)) {
			return mark;
		}
		return " ";
	}

	function transpose(board) {
		var result = [[],[],[]];
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				result[i][j] = board[j][i];
			}
		}
		return result;
	}

	function openSpaces() {
		results = [];
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (isFree(i,j)) {
					results.push([i,j]);
				}
			}
		}
		return results;
	}

	function computerPlayer() {
		this.mark = "O";
	}

	//copies an array which is nested EXACTLY one level
	function arrayCopy(arr) {
		result = [];
		for (var i = 0; i < arr.length; i++) {
			result[i] = arr[i].slice(0);
		}
		return result;
	}

	function computerMakeWinMove(mark) {
		var testBoards = [];
		var open = openSpaces();
		for (var i = 0; i < open.length; i++) {
			testBoards.push(arrayCopy(realBoard));
			testBoards[i][open[i][1]][open[i][0]] = mark;
			if (checkForWin(testBoards[i], mark) === mark) {
				placeMark(open[i][0], open[i][1], mark);
				return true;
			}
		}
		return false;
	}

	function computerBlockWinMove(mark) {
		var enemyMark = otherMark(mark);
		var open = openSpaces();
		for (var i = 0; i < open.length; i++) {
			var testBoard = arrayCopy(realBoard);
			testBoard[open[i][1]][open[i][0]] = enemyMark;
			if (checkForWin(testBoard, enemyMark) === enemyMark) {
				placeMark(open[i][0], open[i][1], mark);
				return true;
			}
		}
		return false;
	}

	function computerRandomMove(mark) {
		var open = openSpaces();
		var choice = Math.floor(Math.random() * open.length);
		placeMark(open[choice][0], open[choice][1], mark);
		return true;
	}

	function playComputerRound(mark) {
		show();
		if (computerMakeWinMove(mark)) {
			show();
			console.log(mark + " wins!");
			reader.close();
		} else {
		  computerBlockWinMove(mark) || computerRandomMove(mark);
			if (checkForTies()) {
				show();
				console.log("A strange game - the only winning move is not to play.");
				reader.close();
			} else {
			  playRound(otherMark(mark));
		  }
		}
	}

	function playRound(mark) {
		show();
		var qstr = "Where should " + mark + " go?";
		reader.question(qstr, function(answer) {
			var pos = parseInput(answer);
			if(isFree(pos[0], pos[1])) {
				placeMark(pos[0], pos[1], mark);
				var winner = checkForWin(realBoard, mark);
				if (winner !== " ") {
					show();
					console.log(winner + " wins!");
					reader.close();
				}
				else if (checkForTies()) {
					show();
					console.log("A strange game - the only winning move is not to play.");
					reader.close();
				} else {
					if (humanPlayers == 2) {
						playRound(otherMark(mark));
					} else {
						playComputerRound(otherMark(mark));
					}
				}
			}
			else {
				console.log("That space is not free.");
				playRound(mark);
			}
		});
	}

	playRound("X");
}

game(1);